import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { AppDataSource } from "./app/database";
import { Routes } from "./app/routes";
import passport from "passport";

AppDataSource.initialize()
  .then(async () => {
      
    console.log("database connected!!");

    const PORT = process.env.PORT || 5050;
    const app: Express = express();

    // setup middleware
    app.use(cors());
    app.use(express.json());
    app.use(passport.initialize());

    // setup route
    Routes.forEach(setUpRoute => {
        setUpRoute(app);
    });

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}.`);
    });

  })
  .catch((error) => console.log("error when connect to database", error));
