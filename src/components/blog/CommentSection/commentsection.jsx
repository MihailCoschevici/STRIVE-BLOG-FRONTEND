import React from 'react';
import './styles.css';

const CommentSection = ({ comments }) => {
  return (
    <div className="mt-5">
      <h4>Commenti:</h4>
      
      {/* Se non ci sono commenti, mostra il messaggio dentro un box stilizzato */}
      {!comments || comments.length === 0 ? (
        <div className="comment-item">
          <p className="mb-0">Nessun commento ancora.</p>
        </div>
      ) : (
        // Altrimenti, mostra la lista dei commenti
        comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <div className="comment-author">{comment.author}</div>
            <div>{comment.text}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentSection;