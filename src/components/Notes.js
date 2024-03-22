import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes();
        }
        else{
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)

    const refClose = useRef(null);
    
    const[notee, setNotee] = useState({etitle:"", edescription:"", etag:"", id:""});

    const updateNote = (note) => {
        ref.current.click();
        setNotee(Object.assign(note,notee));
        setNotee({etitle:note.title, edescription:note.description, etag:note.tag, id:note._id});
    }
    
    const onchange = (e) => {
        setNotee({...notee, [e.target.name]: e.target.value })
    }

    const handleClick1 = (e) => {
        e.preventDefault();
        refClose.current.click();
        editNote(notee.etitle, notee.edescription, notee.etag, notee.id);
    }

    return (
        <>
            <AddNote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type='text' value={notee.etitle} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={(e) => onchange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type='text' value={notee.edescription} className="form-control" id="edescription" name='edescription' onChange={(e) => onchange(e)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type='text' value={notee.etag} className="form-control" id="etag" name='etag' onChange={(e) => onchange(e)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => handleClick1(e)}>update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="row my-3">
                    <h2>Your  Notes</h2>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} notes={note} />;
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes;