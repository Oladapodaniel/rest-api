import { deleteUser, getAllUsers, updateUser } from "../controllers/users.js";
import { isAuthenticated, isOwner } from "../middleware/index.js";

export default (router) => {
    router.get('/getUsers', isAuthenticated, getAllUsers)
    router.delete('/deleteUser/:id', isAuthenticated, isOwner, deleteUser)
    router.patch('/updateUser/:id', isAuthenticated, isOwner, updateUser)
}