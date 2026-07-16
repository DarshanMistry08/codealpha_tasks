import express from 'express';
import {Router} from 'express';
const  router = express.Router();
import Registration from '../models/Registration.js';
import UpdateUserInfo from '../controller/UpdateUser.js';

router.post('/:id', UpdateUserInfo);

export default router