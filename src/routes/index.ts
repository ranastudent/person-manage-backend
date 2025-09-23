import express from 'express'
import { AuthRoute } from '../module/auth/auth.route';
import { PersonRoute } from '../module/person/person.route';



export const router = express.Router();

router.use('/auth',AuthRoute);
router.use('/person',PersonRoute);