import { RouterContext } from "https://deno.land/x/oak/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
import db from "../util/db.ts";
import User from "../interfaces/User.ts";
import key from "../util/key.ts";

const Users = db.collection("users");

const header: Jose = {
  alg: "HS256",
  type: "JWT",
};

export const userSignup = async (ctx: RouterContext) => {
  const {
    value: { name, email, password },
  } = await ctx.request.body();

  const hashedPassword = await bcrypt.hash(password);
  const searchedUser = await Users.findOne({ email: email });

  if (searchedUser) {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "User with given email already exist!",
    };
    return;
  }

  const user: User = {
    name,
    email,
    password: hashedPassword,
  };

  const id = await Users.insertOne(user);
  user._id = id;
  ctx.response.status = 201;
  ctx.response.body = user;
};

export const userLogin = async (ctx: RouterContext) => {
  const {
    value: { email, password },
  } = await ctx.request.body();

  const searchedUser = await Users.findOne({ email: email });

  if (searchedUser) {
    const result = await bcrypt.compare(password, searchedUser.password);
    if (result) {
      const payload: Payload = {
        iss: searchedUser.email,
        exp: setExpiration(new Date().getTime() + 60000),
      };
      const jwt = makeJwt({ key, header, payload });
      if (jwt) {
        ctx.response.status = 200;
        ctx.response.body = {
          id: searchedUser._id,
          email: searchedUser.email,
          jwt,
        };
        return;
      } else {
        ctx.response.status = 500;
        ctx.response.body = {
          message: "Internal Server Error",
        };
        return;
      }
    } else {
      ctx.response.status = 401;
      ctx.response.body = {
        message: "Invalid email or password",
      };
      return;
    }
  } else {
    ctx.response.status = 400;
    ctx.response.body = {
      message: "User with given email not found.Please Register first!",
    };
    return;
  }
};

export const deleteUser = async (ctx:RouterContext) => {
  const id = ctx.params.id;
  const count = await Users.deleteOne({ _id: { $oid: id } });
  if (!count) {
    ctx.response.status = 404;
    ctx.response.body = { message: "User does not exist" };
    return;
  }

  ctx.response.status = 204;
  ctx.response.body = {
      message:"User delete Successful"
  };
  return;
};
