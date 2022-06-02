const routes = require('express').Router();
const {
    ensureAuth,
    ensureGuest
} = require('../middleware/auth')
routes.use('/toDo', require('./toDo'));

const Story = require('../models/Story')

routes.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login',
    })
})

routes.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            user: req.user.id
        }).lean()
        res.render('dashboard', {
            name: req.user.firstName,
            stories,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = routes;