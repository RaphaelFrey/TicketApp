import request from "supertest";
import {app} from "../../app";
import {Ticket} from "../../models/ticket"

it('has route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});

    expect(response.status).not.toEqual(404);
});
it('it can only be accessed if the user is signed in', async () => {
    await request(app)
        .post('/api/tickets')
        .send({})
        .expect(401);
});

it('returns a status other then 401 if the user is signed in', async () => {
   const response = await request(app)
       .post('/api/tickets')
       .set('Cookie', global.ticketsignin())
       .send({});
   expect(response.status).not.toEqual(401);
});
it('returns an error if an invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.ticketsignin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.ticketsignin())
        .send({
            price: 10
        })
        .expect(400);
});
it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.ticketsignin())
        .send({
            title: 'myTicket',
            price: -10
        })
        .expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.ticketsignin())
        .send({
            title: 'myTicket',
        })
        .expect(400);
});
it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    const title = 'myTicket';
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.ticketsignin())
        .send({
            title,
            price: 20
        })
        .expect(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(20);
    expect(tickets[0].title).toEqual(title);
});