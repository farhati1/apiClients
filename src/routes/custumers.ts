// routes/customerRoutes.ts
import express from 'express';
import { createCustumer, getCustumer, updateCustumer, deleteCustumer, getAllCustomers } from '../controllers/custumers';

const router = express.Router();

router.post('/custumers', createCustumer);
router.get('/custumers', getAllCustomers);
router.get('/custumers/:id', getCustumer);
router.put('/custumers/:id', updateCustumer);
router.delete('/custumers/:id', deleteCustumer);

export default router;
