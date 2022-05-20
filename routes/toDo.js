const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

routes.get('/', (req, res) => {

    const results = connect.getCollection().find();

    results.toArray().then((documents) => {
        res.status(200).json(documents);
        console.log(`Returned To do List Successfully`);
    });
});

routes.get('/:id', (req, res) => {
    const contactId = new ObjectId(req.params.id);

    const results = connect.getCollection().find({
        _id: contactId
    });

    results.toArray().then((documents) => {
        res.status(200).json(documents[0]);
        console.log(`Returned To Do ${req.params.id}`);
    });
});

routes.post('/', (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = connect.getCollection().insertOne(contact);
    res.json(response);
});

module.exports = routes;