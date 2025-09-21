import React, { useState, useEffect } from 'react';
import { Container, Row, Pagination } from 'react-bootstrap';
import BlogItem from '../../components/blog/blog-item/BlogItem';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/blogPosts?page=${currentPage}&limit=3`);
        if (!response.ok) {
          throw new Error('Errore nel caricamento dei post!');
        }
        const data = await response.json();

        
        setPosts(data.posts); 
        setTotalPages(data.totalPages);
        

      } catch (error) {
        console.error('Errore:', error);
      }
    };

    fetchBlogPosts();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Benvenuto sullo Strive Blog!</h1>
      <Row>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <BlogItem key={post._id} post={post} />
          ))
        ) : (
          <p className="text-center">Nessun post da visualizzare.</p>
        )}
      </Row>

      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages).keys()].map(number => (
          <Pagination.Item 
            key={number + 1} 
            active={number + 1 === currentPage} 
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default Blog;