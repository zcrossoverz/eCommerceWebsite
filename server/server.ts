import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5050;
const app: Express = express();

// 
app.use(cors());
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    // res.json(DataSourceOptions);
    res.json({h:"hello!!!"})!
});



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});