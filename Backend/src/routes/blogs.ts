import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { Hono } from "hono";
import { createBlog, updateBlog } from "@rajan154/medium-common";

export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoutes.use("/*", async (c, next) => {
  const jwt = c.req.header("authorization") || "";

  const user = await verify(jwt, c.env.JWT_SECRET);

  if (user) {
    // @ts-ignore
    c.set("userId", user.id);
    await next();
  } else {
    c.status(401);
    return c.json({
      message: "Unauthorization",
    });
  }
});

blogRoutes.post("/create-blog", async (c) => {
  const authorId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!authorId) {
    c.status(401);
    return c.json({
      message: "User is not login",
    });
  }

  const body = await c.req.json();
  const { success } = createBlog.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "All fields are required",
    });
  }

  if (body.title === "" || body.content === "") {
    c.status(400);
    return c.json({
      messgae: "All fields are required",
    });
  }

  const response = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published || false,
      authorId,
    },
  });

  return c.json({
    response,
    message: "Blog is created",
  });
});

blogRoutes.put("/update-blog", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlog.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "All fields are required",
    });
  }

  const response = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
      published: body.published || false,
    },
  });

  return c.json({
    response,
    message: "Blog is updated",
  });
});

blogRoutes.get("/blogs/:id", async (c) => {
  const blogId = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.post.findMany({
    where: { id: blogId },
    select: {
      author: true,
      title: true,
      id: true,
      content: true,
      published: true,
    },
  });

  return c.json({
    response,
  });
});

blogRoutes.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.post.findMany({
    where: { published: true },
  });

  return c.json({
    response,
  });
});

blogRoutes.get("/user-blog", async (c) => {
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const response = await prisma.post.findMany({
    where: { authorId },
  });

  return c.json({
    response,
  });
});

blogRoutes.delete("/delete", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    if (body.blogId === "") {
      c.status(404);
      return c.json({
        message: "Blog id is empty",
      });
    }

    const useResponse = await prisma.post.findUnique({
      where: {
        authorId: userId,
        id: body.blogId,
      },
    });

    if (!useResponse) {
      c.status(406);
      return c.json({
        message: "It is not your blog",
      });
    }

    const response = await prisma.post.delete({
      where: {
        authorId: userId,
        id: body.blogId,
      },
    });

    if (!response) {
      c.status(404);
      return c.json({
        message: "It's not your blog",
      });
    }

    c.status(200);
    return c.json({
      message: "Blog Deleted Successfully!",
    });
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Something went wrong while delete blog",
    });
  }
});
