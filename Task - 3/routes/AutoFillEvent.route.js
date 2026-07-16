import express from 'express'
import mongoose from "mongoose";
import { Router } from "express";
import AutoFilleventInfo from '../controller/AutoFillevent.js';
const router = express.Router();


router.get('/:id',AutoFilleventInfo);

export default router;