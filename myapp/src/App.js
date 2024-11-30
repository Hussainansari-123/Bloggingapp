import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import PostPage from "./Pages/PostPage";
import CreateEditPost from "./Pages/CreateEditPost";
import "./App.css";

const App = () => {
  return (
    <Router>
      {/* Shared Navbar */}
      <header className="header">
        <div className="navbar">
          <div className="logo">My Blog</div>
          <nav>
            <Link to="/">Home</Link> {/* Link to Home page */}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Homepage route */}
          <Route path="/create" element={<CreateEditPost />} /> {/* Create post */}
          <Route path="/edit/:id" element={<CreateEditPost />} /> {/* Edit post */}
          <Route path="/post/:id" element={<PostPage />} /> {/* View post */}
        </Routes>
      </main>

      {/* Footer */}
      <div className="page-wrapper">
  <div className="page-content">
 
  </div>
  <footer className="footer">
    <p>&copy; 2024 Your Website. All rights reserved.</p>
  </footer>
</div>

    </Router>
  );
};

export default App;
