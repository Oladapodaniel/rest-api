import { deleteUserById, getUserById, getUsers } from "../db/users.js"

export const getAllUsers = async (req, res) => {
    try {
        let users = await getUsers();
        return res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        let deletedUser = await deleteUserById(id);
        return res.status(200).json(deletedUser)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(403)
        }

        let user = await getUserById(id);
        user.username = username
        user.save();
        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}