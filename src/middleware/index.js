import express from "express";
import _ from "lodash";
// import merge from "lodash";

import { getUserBySesionToken } from "../db/users.js";

export const isOwner = (req, res, next) => {
    const { id } = req.params;
    const currentUserId = _.get(req, 'identity._id')
    console.log("Current User Id:" + currentUserId)
    console.log("Id:" + id)

    if (!currentUserId) {
        return res.sendStatus(403);
    }
    
    if (currentUserId.toString() !== id.toString()) {
        return res.sendStatus(403)
    }
    next();
}

export const isAuthenticated = async (req, res, next) => {
    const sessionToken = req.cookies["OLADAPO"];

    if (!sessionToken) {
        return res.sendStatus(403)
    }
    
    const existingUser = await getUserBySesionToken(sessionToken);
    console.log(existingUser, 'exisuser')
    if (!existingUser) {
        res.sendStatus(403);
    }
    let reqq = {
        name: 'Dapo'
    }
    _.merge(reqq, {age: 10})
    console.log(reqq)

    _.merge(req, { identity: existingUser})
    next()
}