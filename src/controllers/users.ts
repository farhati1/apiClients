import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

export const createUser = async (req: Request, res: Response) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            ...req.body,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        res.send({ message: 'You are now connected!' });
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
};
