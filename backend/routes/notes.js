const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// route 1 - fetch all notes

router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try{
        const note = await Notes.find({user: req.user.id});
        res.json(note);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occored");
    }
})

// route 2 - add a note 

router.post('/addnote', fetchuser, [
    body('title', "enter a valid title").isLength({ min:3 }),
    body('description', "enter a valid description").isLength({ min:5 })
], async (req, res)=>{

    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {title, description, tag} = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedData = await note.save();
        res.json(savedData);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occored");
    }
})

// router 3 

router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        const newNote = {};

        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occored");
    }
})

// router 4

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {

        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("Not found");
        }

        if(note.user.toString() !== req.user.id){
            return res.status(404).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"success": "note has been deleted", note: note});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occored");
    }
})


module.exports = router;