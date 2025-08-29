import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css"; // import the css file

function App() {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postDesc, setDesc] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  const API_URL = "https://68a03fdd6e38a02c58182425.mockapi.io/api/v1/usrs";

  // Get All Post
  const getPost = async () => {
    try {
      const postget = await axios.get(API_URL);
      setAllPost(postget?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  // Post Create
  const postHandler = async () => {
    if (!postText.trim()) {
      alert("⚠️ Title is required!");
      return;
    }

    const postData = {
      postText,
      postImage,
      postDesc,
    };

    try {
      await axios.post(API_URL, postData);
      getPost();

      // reset inputs after posting
      setPostText("");
      setPostImage("");
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      getPost();
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateHandler = (id, post) => {
    setUpdateId(id);
    setPostText(post.postText);
    setPostImage(post.postImage);
    setDesc(post.postDesc);
  };

  const editPostHandler = async () => {
    if (!postText.trim()) {
      alert("⚠️ Title is required!");
      return;
    }

    const updatePost = {
      postDesc,
      postImage,
      postText,
    };

    try {
      await axios.put(`${API_URL}/${updateId}`, updatePost);
      getPost();

      // reset inputs after editing
      setUpdateId(null);
      setPostText("");
      setPostImage("");
      setDesc("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="heading">📌 My Posts</h1>

      <div className="form-container">
        <input
          value={postText}
          type="text"
          placeholder="Enter Post Title *"
          onChange={(e) => setPostText(e.target.value)}
        />
        <input
          value={postImage}
          type="text"
          placeholder="Enter Image URL"
          onChange={(e) => setPostImage(e.target.value)}
        />
        <input
          value={postDesc}
          type="text"
          placeholder="Enter Description"
          onChange={(e) => setDesc(e.target.value)}
        />

        {updateId ? (
          <button className="update-btn" onClick={editPostHandler}>
            Update Post
          </button>
        ) : (
          <button className="create-btn" onClick={postHandler}>
            Create Post
          </button>
        )}
      </div>

      <hr />

      <div className="posts-container">
        {allPost.map((post, index) => (
          <div key={post.id} className={`card card-${(index % 4) + 1}`}>
            <h2>{post.postText}</h2>
            {post.postImage && (
              <img src={post.postImage} alt="" className="card-img" />
            )}
            <p>{post.postDesc}</p>
            <div className="card-actions">
              <button onClick={() => updateHandler(post.id, post)}>
                ✏️ Edit
              </button>
              <button onClick={() => deleteHandler(post.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
