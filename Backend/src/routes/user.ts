import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { loginInput, signupInput } from "@rajan154/medium-common";

export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoutes.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  console.log(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "All fields required",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (user) {
    c.status(403);

    return c.json({
      message: "You have Already Account",
    });
  }

  try {
    await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });

    return c.json({
      message: "Account Created!",
    });
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Something went wrong while Signup",
    });
  }
});

userRoutes.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = loginInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "All fields required",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);

    return c.json({
      message: "You have to Sign up",
    });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ jwt });
});
