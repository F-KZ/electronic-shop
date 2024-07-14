import express from 'express'
import { register, login, getPublicProfile, updateProfile, getUsers } from "./user/userActions.js";
import {authenticateToken, admin} from "../middleware/authToken.js";

const userRoutes = express.Router()

userRoutes.route('/').post(register).get(authenticateToken, admin, getUsers)
userRoutes.route('/auth').post(login)
userRoutes.route('/profile/:id').get(authenticateToken, getPublicProfile).put(authenticateToken, updateProfile)

export default userRoutes