import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const MONGO_URL = `mongodb+srv://rranjan18:password00@deno-cluster-lc6m8.mongodb.net/shop`;
const client = new MongoClient();
client.connectWithUri(MONGO_URL);

const db = client.database('shop');

export default db;
