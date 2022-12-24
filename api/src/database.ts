import { connect, ConnectOptions } from "mongoose";
import config from "./config";

main().catch((err) => console.log(err.reason.servers));

async function main() {
  try {
    const mongooseOptions: ConnectOptions = {
      user: config.MONGO_USER,
      pass: config.MONGO_PASSWORD
    }

    const uri = `mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`;
    const db = await connect(uri);
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.log(error);
  }

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
