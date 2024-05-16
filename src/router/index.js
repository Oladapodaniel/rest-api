import express from "express";
import authentication from "./authentication.js";
import allUsers from "./allUsers.js";

const router = express.Router();

export default () => {
    authentication(router);
    allUsers(router)
    return router
}