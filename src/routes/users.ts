// user.route.ts
import express from 'express';
import { createUser, getUser, updateUser, deleteUser, loginUser } from '../controllers/users';

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.post('/users/login', loginUser);

export default router;
