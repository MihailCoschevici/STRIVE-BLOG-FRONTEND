import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './styles.css';
import BlogLike from '../../likes/BlogLike'; 


const BlogItem = ({ post }) => {
  if (!post) {
    return null;
  }

  return (
    <Card className="h-100 shadow-sm d-flex flex-column">
      <Card.Img
        variant="top"
        src={post.cover}
        style={{ height: '200px', objectFit: 'cover' }}
        alt={post.title}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{post.title}</Card.Title>
        <div
          className="card-text flex-grow-1"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-auto pt-3">
            <Card.Text>
              <small className="text-muted">
                Autore: {post.author}
              </small>
            </Card.Text>
        </div>
        <div className="mt-2 d-flex justify-content-between align-items-center">
          <Link to={`/blog/${post._id}`} className="btn btn-primary">
            Leggi di più
          </Link>
          <BlogLike defaultLikes={[]} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogItem;