import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../../components/blog/CommentSection/commentsection.jsx'; 

const Post = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPostAndComments() {
      try {
        const postResponse = await fetch(`${process.env.REACT_APP_API_URL}/blogPosts/${id}`);
        if (!postResponse.ok) {
          throw new Error('Errore nel caricamento del post!');
        }
        const postData = await postResponse.json();
        setPost(postData);
      } catch (error) {
        console.error('Errore:', error);
      }
    }

    if (id) {
      fetchPostAndComments();
    }
  }, [id]);

  if (!post) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1>{post.title}</h1>
          <p>Categoria: {post.category}</p>
          <p>Autore: {post.author}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Visualizza i commenti */}
          <CommentSection comments={post.comments} />
        </div>
      </div>
    </div>
  );
};

export default Post;