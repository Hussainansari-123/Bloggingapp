import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          navigate("/"); // Navigate back to homepage after delete
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h1 
  style={{
    fontSize: "2rem",
    fontWeight: "bold",
   
    marginLeft: "20px",
    marginBottom: "10px",
    textAlign: "left",
  }}
>
  {post.title}
</h1>

<p 
  style={{
    fontSize: "1.1rem",
   
    marginLeft: "20px",
    lineHeight: "1.6",
    marginBottom: "15px",
  }}
>
  {post.content}
</p>

<p 
  style={{
    fontSize: "1rem",
   
    marginLeft: "20px",
    marginBottom: "20px",
    fontStyle: "italic",
  }}
>
  {post.date ? new Date(post.date).toLocaleDateString() : "No date available"}
</p>


      <div className="button-group">
        {/* Edit Button: Navigates to the Edit page */}
        <button
          onClick={() => navigate(`/edit/${post._id}`)}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "2px solid #007bff",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#007bff"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          Edit Post
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "2px solid #dc3545",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginLeft: "10px"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#dc3545"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          Delete Post
        </button>

        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "transparent",
            color: "white",
            border: "2px solid #28a745",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginLeft: "10px"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#28a745"}
          onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PostPage;
