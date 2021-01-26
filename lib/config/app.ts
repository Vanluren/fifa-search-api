import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { compose } from "compose-middleware";
import env from "../env";
import CommonRoutes from "../routes/CommonRoutes";

class App {
  public app: express.Application;
  private commonRoutes: CommonRoutes = new CommonRoutes();
  public mongoUrl: string = "mongodb://localhost:27017/" + env.getDBName();
  public dbConnection: mongoose.Connection;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.commonRoutes.route(this.app);
  }

  private config(): void {
    this.app.use(compose([json(), urlencoded({ extended: false }), cors()]));
  }

  private mongoSetup(): void {
    mongoose
      .connect(this.mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("db connected");
      });
  }
}

export default new App().app;
