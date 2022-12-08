import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from "cookie-session";
import {errorHandler, NotFoundError} from '@raphaelfreysolutions/commons';
import {createTicketRouter} from "./routes/new";

const app = express();
// make express aware that traffic is coming from proxy through ingress-nginx
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(createTicketRouter);

app.all('*', async (req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};