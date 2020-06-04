import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../util/db.ts";
import Product from "../interfaces/Product.ts";

const Products = db.collection("products");

export const getProducts = async (ctx: RouterContext) => {
  const products = await Products.find();
  ctx.response.body = products;
};

export const getProduct = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const product = await Products.findOne({ _id: { $oid: id } });
  if (product) {
    ctx.response.status = 200;
    ctx.response.body = product;
    return;
  } else {
    ctx.response.status = 404;
    ctx.response.body = {
      message: "Not Found",
    };
    return;
  }
};

export const createProduct = async (ctx: RouterContext) => {
  const {
    value: { name, price },
  } = await ctx.request.body();
  console.log(ctx.request.body());

  const product: Product = {
    name,
    price,
  };

  const id = await Products.insertOne(product);
  product._id = id;
  ctx.response.status = 201;
  ctx.response.body = product;
};

export const updateProduct = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const {
    value: { name, price },
  } = await ctx.request.body();

  const { modifiedCount } = await Products.updateOne(
    { _id: { $oid: id } },
    {
      $set: {
        name,
        price,
      },
    }
  );

  if (!modifiedCount) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product does not exist" };
    return;
  }
  ctx.response.body = await Products.findOne({ _id: { $oid: id } });
};

export const deleteProduct = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const count = await Products.deleteOne({ _id: { $oid: id } });
  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { message: "Product does not exist" };
    return;
  }

  ctx.response.status = 204;
};
