import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Content = () => {
    const tableStyle = {
        border: "solid black 1px"
    }

    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: "", content: "" });
    const [editNote, setEditNote] = useState(null);

    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotes();
        const storedAccessToken = localStorage.getItem('access_token');
        if (storedAccessToken) {
            setAccessToken(storedAccessToken);
        } else {
            navigate('/content'); // Redirect ke halaman login jika token tidak ada
        }
    }, []);

    const fetchNotes = () => {
        axios.get('http://127.0.0.1:3333/note')
            .then(response => {
                setNotes(response.data.data.notes);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleLogout = () => {
        // Menghapus token dari penyimpanan lokal
        localStorage.removeItem('access_token');

        // Navigasi kembali ke halaman login (atau halaman lain yang sesuai)
        navigate('/register'); // Ganti '/login' dengan halaman yang sesuai
    };

    const handleAddNote = () => {
        axios.post('http://127.0.0.1:3333/note', newNote)
            .then(response => {
                setNewNote({ title: "", content: "" });
                fetchNotes();

            })
            .catch(error => {
                console.error('Error adding note:', error);
            });
    };


    const handleEditNote = (id) => {
        const updatedNote = notes.find(note => note.id === id);
        setEditNote({ ...updatedNote });
    };

    const handleUpdateNote = () => {
        axios.put(`http://127.0.0.1:3333/note/${editNote.id}`, editNote)
            .then(response => {
                setEditNote(null);
                fetchNotes();
                console.log('Note updated successfully!');

            })
            .catch(error => {
                console.error('Error updating note:', error);
            });
    };

    const handleDeleteNote = (id) => {
        axios.delete(`http://127.0.0.1:3333/note/${id}`)
            .then(response => {
                fetchNotes();
            })
            .catch(error => {
                console.error('Error deleting note:', error);
            });
    };

    return (
        <>

            <div>
                <h2>Add New Note</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={e => setNewNote({ ...newNote, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Content"
                    value={newNote.content}
                    onChange={e => setNewNote({ ...newNote, content: e.target.value })}
                />
                <button onClick={handleAddNote}>Add</button>
            </div>
            <table style={tableStyle} >
                <thead style={tableStyle}>
                    <tr>
                        <th style={tableStyle}>id</th>
                        <th style={tableStyle}>title</th>
                        <th style={tableStyle}>content</th>
                        <th style={tableStyle}>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {notes.map(note => (
                        <tr key={note.id}>
                            <td style={tableStyle}>{note.id}</td>
                            <td style={tableStyle}>
                                {editNote?.id === note.id ? (
                                    <input
                                        type="text"
                                        value={editNote.title}
                                        onChange={e => setEditNote({ ...editNote, title: e.target.value })}
                                    />
                                ) : (
                                    note.title
                                )}
                            </td>
                            <td style={tableStyle}>
                                {editNote?.id === note.id ? (
                                    <input
                                        type="text"
                                        value={editNote.content}
                                        onChange={e => setEditNote({ ...editNote, content: e.target.value })}
                                    />
                                ) : (
                                    note.content
                                )}
                            </td>
                            <td style={tableStyle}>
                                {editNote?.id === note.id ? (
                                    <>
                                        <button onClick={handleUpdateNote}>Save</button>
                                        <button onClick={() => setEditNote(null)}>Cancel</button>

                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEditNote(note.id)}>Edit</button>
                                        <button onClick={() => handleDeleteNote(note.id)}>Delete</button>

                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default Content;
