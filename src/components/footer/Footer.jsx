import React from "react";
import { Container } from "react-bootstrap";
import './styles.css'; // 1. Importa il file CSS

const Footer = () => {
  return (
    // 2. Aggiungi la classe CSS qui
    <footer className="blog-footer">
      <Container>{`${new Date().getFullYear()} - © Strive School | Developed for Homework Projects EPICODE.`}</Container>
    </footer>
  );
};

export default Footer;