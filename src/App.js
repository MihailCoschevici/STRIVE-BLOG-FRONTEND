import React, { useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/home/Home.jsx';
import Blog from './views/blog/Blog.jsx';
import New from './views/new/New.jsx';
import Post from './views/post/post.jsx';
import Navbar from './components/navbar/BlogNavbar.jsx';
import Footer from './components/footer/Footer.jsx';

function App() {

  // ==========================================================
  //      AGGIUNTO BLOCCO PER GESTIRE IL TOKEN DI LOGIN
  // ==========================================================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem("accessToken", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);


  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/new" element={<New />} />
            <Route path="/blog/:id" element={<Post />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;