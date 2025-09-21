import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles.css';

const New = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    author: '',
    cover: null,
    readTimeValue: 1,
    readTimeUnit: 'minuti',
    content: ''
  });

  const navigate = useNavigate();
  const [editorState, setEditorState] = useState('');

  const handleEditorChange = (state) => {
    setEditorState(state);
    const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));
    setFormData((prevData) => ({
      ...prevData,
      content: htmlContent,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      cover: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('category', formData.category);
    dataToSend.append('author', formData.author);
    dataToSend.append('content', formData.content);
    dataToSend.append('readTime[value]', formData.readTimeValue);
    dataToSend.append('readTime[unit]', formData.readTimeUnit);

    if (formData.cover) {
        dataToSend.append('cover', formData.cover);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/blogPosts`, {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        alert('Articolo aggiunto con successo!');
        navigate('/blog');
      } else {
        const errorData = await response.json();
        alert(`Errore nell'aggiunta dell'articolo: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Errore:', error);
      alert('Si è verificato un errore durante l\'invio del form.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1>Nuovo Articolo</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Titolo</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoria</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Autore</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contenuto</label>
              <textarea
                className="form-control"
                name="content"
                rows="5"
                value={formData.content}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Immagine di Copertina</label>
              <input
                type="file"
                className="form-control"
                name="cover"
                onChange={handleFileChange}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Crea Articolo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;