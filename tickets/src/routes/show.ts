import express, {Request, Response} from "express";
import {Ticket} from "../models/ticket";
import {NotFoundError, validateRequest} from "@raphaelfreysolutions/commons";
import {param} from "express-validator";
import {Types as MongooseTypes} from 'mongoose';

const router = express.Router();

router.get('/api/tickets/:id', param('id').custom((idValue) => MongooseTypes.ObjectId.isValid(idValue)).withMessage('id must be a valid MongoDB ObjectID'), validateRequest,
    async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }
    res.send(ticket);
});

export { router as showTicketRouter };