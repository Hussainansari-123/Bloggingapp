import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch posts data
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting post with ID:", id); // Debug log
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          console.log(`Post with ID ${id} deleted successfully.`);
          // Filter the posts list to remove the deleted post
          setPosts(posts.filter((post) => post._id !== id));
        })
        .catch((err) => {
          console.error("Error deleting post:", err);
        });
    }
  };
  
  

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="homepage">
      <section className="hero-section">
        <h1>Welcome to My Blog!</h1>
        <p>Share your stories and ideas with the world.</p>
        <Link to="/create" className="create-post-btn">
          Create New Post
        </Link>
      </section>

      <section className="posts-list">
        <h2>Recent Posts</h2>
        {posts.length === 0 ? (
          <p>No posts available. Create one!</p>
        ) : (
          <ul>
 {posts.map((post) => (
  <li key={post._id}>
    <h3>{post.title}</h3>
    <p>{post.date ? new Date(post.date).toLocaleDateString() : "No date available"}</p>
    <div className="button-group">
      <Link to={`/post/${post._id}`} className="read-more-btn" style={{color:"white"}}>Read More</Link>
      <button
        onClick={() => handleDelete(post._id)}
        className="delete-btn"
      >
        Delete
      </button>
    </div>
  </li>
))}

</ul>

        )}
      </section>
    </div>
  );
};

export default Homepage;
