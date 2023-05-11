"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./app/database");
const routes_1 = require("./app/routes");
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("database connected!!");
    const PORT = process.env.PORT || 5050;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.static('public'));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(passport_1.default.initialize());
    app.get("/", (req, res) => {
        res.json({ message: "Hello world" });
    });
    routes_1.Routes.forEach(setUpRoute => {
        setUpRoute(app);
    });
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}.`);
    });
})
    .catch((error) => console.log("error when connect to database", error));
