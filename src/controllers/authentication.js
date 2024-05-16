import { getUserByEmail, createUser } from "../db/users.js";
import { authentication, random } from "../helpers/index.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Incomplete data"})
        }

        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
        if (!user) {
            return res.sendStatus(400)
        }

        const expectedHash = authentication(user.authentication.salt, password)
        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({message: "Password is not correct"})
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        // save to db
        await user.save()
        // set cookie with the session Token
        res.cookie('OLADAPO', user.authentication.sessionToken, { domain: "localhost", path: "/" })
        return res.status(200).json(user).end();

    } catch (error) {
     console.log(error)   
    }
}

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            res.status(400).json({ message: "Incomplete expected data" });
            return;
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "User exists" });
            return;
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        });
        
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message || "An error occurred");
    }
};
