import React, { useContext, useState } from 'react'
import NoteContext from '../context/noteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });


    const onchange = (e) => {
        setNote({...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type='text' value={note.title} className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={(e) => onchange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type='text' value={note.description} className="form-control" id="description" name='description' onChange={(e) => onchange(e)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type='text' value={note.tag} className="form-control" id="tag" name='tag' onChange={(e) => onchange(e)} />
                    </div>
                    <button className="btn btn-primary" onClick={(e) => handleClick(e)}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
