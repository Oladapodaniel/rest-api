import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/index.js";


const app = express();

app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("server running on http://localhost:8080")
})

const MONGO_URL = "mongodb+srv://oladapodaniel10:EdL7yYUcuLDAF0qB@cluster0.pmppn5h.mongodb.net/api-users?retryWrites=true&w=majority"
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on("connected", () =>console.log("connected to mongodb"));
mongoose.connection.on("error", (error) =>console.log(error));

app.use('/', router())