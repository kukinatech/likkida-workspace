import { Express } from "express";

export declare global {
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
export {};