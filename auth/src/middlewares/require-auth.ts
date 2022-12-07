import {NextFunction, Request, Response} from "express";
import {NotAuthorizedError} from "../errors/not-authorized-error";

/**
 * Never Use before current-user.ts
 * @param req
 * @param res
 * @param next
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};