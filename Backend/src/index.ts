import { Hono } from "hono";
import { userRoutes } from "./routes/user";
import { blogRoutes } from "./routes/blogs";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/api/*", cors());
app.use(
  "/api/*",
  cors({
    origin: "*",
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/api/v1/users", userRoutes);
app.route("/api/v1/blog", blogRoutes);

export default app;
