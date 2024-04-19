const express = require('express');
const router = express.Router();

// Load userSavedStocks model. 
const User = require('../../models/userSavedStocks.js');


// @route   GET api/users
// @desc    Gets all user data (currently only 1 user)
// @access  Public
router.get('/', async (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({nousersfound: 'No Users Found'}));
});

// @route   PUT api/users/:id
// @desc    Update users by id (will mostly be used to update array of saved stocks)
// @access  Public
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(err => 
            res.status(400).json({error : 'Unable to update the Database' })
        );
});

module.exports = router;