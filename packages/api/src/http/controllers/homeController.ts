import { type Request, type Response } from "express"

export const homeController = (req: Request, res: Response) => {
     res.status(200).json({ status: 'OK' })
}