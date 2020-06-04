import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const MONGO_URL = `ADD YOUR URL`;
const client = new MongoClient();
client.connectWithUri(MONGO_URL);

const db = client.database('shop');

export default db;
