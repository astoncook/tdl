const routes = require('express').Router();
const connect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const validation = require('../middleware/validate');

routes.get('/', (req, res) => {

    const results = connect.getCollection().find();

    results.toArray().then((documents) => {
        if (err) {
            res.status(400).json({
                message: err
            });
        }
        res.status(200).json(documents);
        console.log(`Returned To do List Successfully`);
    });
});

routes.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid toDo id to find a toDo.');
    }
    const toDoId = new ObjectId(req.params.id);

    const results = connect.getCollection().find({
        _id: toDoId
    });

    results.toArray().then((documents) => {
        if (err) {
            res.status(400).json({
                message: err
            });
        }
        res.status(200).json(documents[0]);
        console.log(`Returned To Do ${req.params.id}`);
    });
});

routes.post('/', (req, res) => {
    const toDo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        toDoSubject: req.body.toDoSubject,
        toDoItem: req.body.toDoItem
    };
    const response = connect.getCollection().insertOne(toDo);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the to do list.');
    }
});

routes.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid toDo id to update a toDo.');
    }
    const userId = new ObjectId(req.params.id);
    const toDo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
        toDoSubject: req.body.toDoSubject,
        toDoItem: req.body.toDoItem
    };
    const response = connect.getCollection().replaceOne({
        _id: userId
    }, toDo);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the to do list.');
    }
});

routes.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid toDo id to delete a toDo.');
    }
    const userId = new ObjectId(req.params.id);
    const response = connect.getCollection().deleteOne({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the to do list.');
    }
});

module.exports = routes;