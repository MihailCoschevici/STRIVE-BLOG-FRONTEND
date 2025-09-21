import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
import BlogItem from '../../components/blog/blog-item/BlogItem';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/blogPosts`);
        const data = await response.json();
        setPosts(data.posts || data); 
      } catch (error) {
        console.error('Errore:', error);
      }
    }
    fetchBlogPosts();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Ultimi articoli dal blog:</h1>
      <Row>
        {posts && posts.length > 0 ? (
          posts.slice(0, 3).map(post => (
            <Col xs={12} md={4} key={post._id} className="mb-4 d-flex">
              <BlogItem post={post} />
            </Col>
          ))
        ) : (
          <p className="text-center">Nessun post da visualizzare.</p>
        )}
      </Row>

      {/* ===============================================
          PULSANTE PER VEDERE TUTTI GLI ARTICOLI
          =============================================== */}
      <div className="text-center mt-4">
        <Button as={Link} to="/blog" variant="primary" size="lg">
          Vedi Tutti gli Articoli
        </Button>
      </div>
      {/* =============================================== */}
      
    </Container>
  );
};

export default Home;