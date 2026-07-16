import express from 'express';
import { Router } from "express";
import FindEventRegister from '../controller/Myregister.js'
const router = express.Router();



router.get('/myregisters',FindEventRegister);



export default router;