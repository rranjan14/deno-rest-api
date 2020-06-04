import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import db from "../util/db.ts";
import Order from "../interfaces/Order.ts";

const Orders = db.collection("orders");

export const getOrders = async (ctx: RouterContext) => {
  const orders = await Orders.find();
  ctx.response.body = orders;
};

export const getOrder = async (ctx: RouterContext) => {
  const id = ctx.params.id;
  const order = await Orders.findOne({ _id: { $oid: id } });
  if (order) {
    ctx.response.status = 200;
    ctx.response.body = order;
    return;
  } else {
    ctx.response.status = 404;
    ctx.response.body = {
      message: "Not Found",
    };
    return;
  }
};

export const createOrder = async (ctx: RouterContext) => {
  console.log(ctx.request.body());

//   const order: Order = {
//     name,
//     price,
  };

// //   const id = await Orders.insertOne(product);
// //   product._id = id;
// //   ctx.response.status = 201;
// //   ctx.response.body = product;
// };

// export const updateProduct = async (ctx: RouterContext) => {
//   const id = ctx.params.id;
//   const {
//     value: { name, price },
//   } = await ctx.request.body();

//   const { modifiedCount } = await Orders.updateOne(
//     { _id: { $oid: id } },
//     {
//       $set: {
//         name,
//         price,
//       },
//     }
//   );

//   if (!modifiedCount) {
//     ctx.response.status = 404;
//     ctx.response.body = { message: "Product does not exist" };
//     return;
//   }
//   ctx.response.body = await Orders.findOne({ _id: { $oid: id } });
// };

// export const deleteProduct = async (ctx: RouterContext) => {
//   const id = ctx.params.id;
//   const count = await Orders.deleteOne({ _id: { $oid: id } });
//   if (!count) {
//     ctx.response.status = 404;
//     ctx.response.body = { message: "Product does not exist" };
//     return;
//   }

//   ctx.response.status = 204;
// };
