import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    
    const noteIntial = [];

    const [notes, setNotes] = useState(noteIntial);
    
    // get all notes

    const getNotes = async ()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: "GET",
            headers:{
                "auth-token" : localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setNotes(data);

    }

    // add note

    const addNote = async (title, description, tag) => {
        if(!title || !description){
            console.log("no");
        }
        else{
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const data = await response.json();


        let note = data;

        setNotes(notes.concat(note));
    }
    }

    // delete note

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: "DELETE",
            headers:{
                "auth-token" : localStorage.getItem('token')
            },
        });


        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // edit note 

    const editNote = async (title, description, tag, id)=> {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViNTEwNGMyZGU5YTY2ZGQ3YTRhYWIxIn0sImlhdCI6MTcwNjQyNzg5OX0.pSLL8pvb8ewYqlLKJXsyXnQqYHQaCLKnV-tHNINGYSs"
            },
            body: JSON.stringify({title, description, tag})
        });
        const data = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        for(let i=0; i<notes.length; i++){
            // const element = notes[i];
            if(newNotes[i]._id===id){
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
