import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateEditPost = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch post data if we're in edit mode
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/posts/${id}`)
        .then((res) => res.json())
        .then((data) => setFormData({ title: data.title, content: data.content }))
        .catch((err) => setError("Failed to load post"));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required.");
      return;
    }

    const method = id ? "PUT" : "POST"; // Use PUT for editing, POST for creating new post
    const url = id ? `http://localhost:5000/posts/${id}` : "http://localhost:5000/posts";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save post.");
        }
        return res.json();
      })
      .then(() => {
        navigate("/"); // Navigate back to homepage after saving
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="create-edit-post">
      <h1>{id ? "Edit Post" : "Create New Post"}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} className="create-post-form">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="button-group">
          <button type="submit">{id ? "Update Post" : "Save Post"}</button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{ marginLeft: "10px" }}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPost;
