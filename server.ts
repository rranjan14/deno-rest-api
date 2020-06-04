import { userSignup, userLogin, deleteUser } from "./routes/user_routes.ts";
import authMiddleware from "./auth/authMiddleware.ts";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./routes/product_routes.ts";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
const app = new Application();

router
  .get("/products", getProducts)
  .get("/products/:id", getProduct)
  .post("/products", createProduct)
  .put("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct)
  //   user routes
  .post("/register", userSignup)
  .post("/login", userLogin)
  .delete("/users/:id", authMiddleware, deleteUser);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 3000 });
console.log("Server is up and running.");
