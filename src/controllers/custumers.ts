// controllers/CustumerController.ts
import { Request, Response } from 'express';
import Custumer from '../models/custumer';

export const createCustumer = async (req: Request, res: Response) => {
    try {
        const custumer = new Custumer(req.body);
        await custumer.save();
        res.status(201).send(custumer);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const getCustumer = async (req: Request, res: Response) => {
    try {
        const custumer = await Custumer.findById(req.params.id);
        if (!custumer) {
            return res.status(404).send({ message: 'Custumer not found' });
        }
        res.send(custumer);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const updateCustumer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedCustumer = req.body;
        const custumer = await Custumer.findByIdAndUpdate(id, updatedCustumer, { new: true });
        if (!custumer) {
            return res.status(404).send({ message: 'Custumer not found' });
        }
        res.send(custumer);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const deleteCustumer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Custumer.findByIdAndDelete(id);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const custumers = await Custumer.find().select('name ');
        res.send(custumers);
    } catch (error) {
        res.status(500).send({ message: error instanceof Error ? error.message : 'An error occurred' });
    }
};

export default {
    createCustumer,
    getCustumer,
    updateCustumer,
    deleteCustumer,
    getAllCustomers,
};
