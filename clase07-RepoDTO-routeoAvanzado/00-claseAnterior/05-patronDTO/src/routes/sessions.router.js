import { Router } from 'express';
import { SessionsController } from '../controllers/sessionsController.js';
import passport from 'passport';
import { passportCall } from '../utils.js';
export const router=Router()

router.post(
    '/register', 
    passportCall("registro"), 
    SessionsController.register
)


router.post(
    '/login', 
    passportCall("login"),
    SessionsController.login
)