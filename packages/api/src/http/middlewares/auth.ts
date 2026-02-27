import type { NextFunction, Request, Response } from 'express'
import supabaseClient from '../../databases/supabase.js'
import jwt from 'jsonwebtoken'
import config from '../../configs/index.js';
import { HttpResponseMapper } from '../mappers.js';
/// <reference path="./types/express.d.ts" />


interface JwtPayload {
    sub: string;
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: string;
                token: string;
            };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {

        const hastString = req.headers.authorization
        console.log(hastString)
        if (!hastString) {
            return res.status(401).json(
                HttpResponseMapper({ isError: true, message: "Não aoutorizado!" })
            )
        }
        const hastStringSplited = hastString.split(' ');

        if (hastStringSplited.length !== 2) {
            return res.status(401).json(
                HttpResponseMapper({ isError: true, message: "Token mal Formadodo!" })
            )
        }

        const [flag, token] = hastStringSplited

        if (flag !== 'Bearer') {
            return res.status(401).json(
                HttpResponseMapper({ isError: true, message: "Token mal Formadodo!" })
            )
        }

        if (!token) {
            return res.status(401).json(
                HttpResponseMapper({ isError: true, message: "Token mal Formadodo!" })
            )
        }
        console.log(config.SUPABASE_KEY)

        const decoded = jwt.verify(token, config.SUPABASE_JWT_SECRET!) as JwtPayload;

        req.user = {
            id: decoded.sub,
            token: token,
            role: 'NORMAL'
        }
        next();

    } catch (error: any) {
        return res.status(401).json(HttpResponseMapper({ isError: true, message: "Não aoutorizado!" }))
    }
}