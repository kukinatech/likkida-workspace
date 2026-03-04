import type { NextFunction, Request, Response } from 'express'
import supabaseClient from '../../databases/supabase.js'
import jwt from 'jsonwebtoken'
import config from '../../configs/index.js';
import { HttpResponseMapper } from '../mappers.js';
import type { Entidade, TEmpresa } from '@likkida/shared';
/// <reference path="./types/express.d.ts" />


interface JwtPayload {
    sub: string;
    role: string;
    empresa_id: string;
    email: string
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                empresa: Entidade;
                roles: Array<string>
                permissoes: Array<string>
            };
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const hastString = req.cookies.token

        if (!hastString) {
            return res.status(401).json(
                HttpResponseMapper({ message: "Não aoutorizado!" })
            )
        }
        const hastStringSplited = hastString.split(' ');

        if (hastStringSplited.length !== 2) {
            return res.status(401).json(
                HttpResponseMapper({ message: "Token mal Formadodo!" })
            )
        }

        const [flag, token] = hastStringSplited

        if (flag !== 'Bearer') {
            return res.status(401).json(
                HttpResponseMapper({ message: "Token mal Formadodo!" })
            )
        }
        if (!token) {
            return res.status(401).json(
                HttpResponseMapper({ message: "Token mal Formadodo!" })
            )
        }
        const decoded = jwt.verify(token, config.SUPABASE_JWT_SECRET!) as JwtPayload;
        req.user = {
            id: decoded.sub,
            empresa: { id: decoded.empresa_id },
            email: decoded.email,
            roles: [],
            permissoes: []
        }
        next();

    } catch (error: any) {
        return res.status(401).json(HttpResponseMapper({ message: "Não aoutorizado!" }))
    }
}