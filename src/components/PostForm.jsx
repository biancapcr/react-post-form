// importazione hook e axios
import { useState } from "react";
import axios from "axios";

const PostForm = () => {
  // definisco stato inziale del form
  const initialFormData = {
    author: "",
    title: "",
    body: "",
    public: true,
  };

  // tracciamento valori form
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "radio"
          ? value === "true"
            ? true
            : false
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", formData)
      .then((resp) => {
        console.log("Dati inviati con successo:", resp.data);
        setFormData(initialFormData);
      })
      .catch((err) => {
        console.error("Errore invio:", err);
      });
  };

  return (
    <div className="pf-wrapper">
      <form className="pf-card" onSubmit={handleSubmit}>
        <h2 className="pf-title">Create New Post</h2>

        <div className="pf-grid pf-grid--2">
          <div className="pf-field">
            <label htmlFor="author" className="pf-label">Author Name</label>
            <input
              type="text"
              className="pf-input"
              placeholder="Insert author's name.."
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pf-field">
            <label htmlFor="title" className="pf-label">Post Title</label>
            <input
              type="text"
              className="pf-input"
              placeholder="Insert post title.."
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="pf-field">
          <label htmlFor="body" className="pf-label">Post Content</label>
          <textarea
            className="pf-textarea"
            placeholder="Type here.."
            id="body"
            name="body"
            rows="6"
            value={formData.body}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <fieldset className="pf-fieldset">
          <legend className="pf-legend">Public</legend>
          <div className="pf-radio-group">
            <label className="pf-radio">
              <input
              type="radio"
              name="public"
              value="true"
              checked={formData.public === true}
              onChange={handleChange}
              />
              <span>Yes</span>
              </label>

    <label className="pf-radio">
      <input
        type="radio"
        name="public"
        value="false"
        checked={formData.public === false}
        onChange={handleChange}
      />
      <span>No</span>
    </label>
  </div>
</fieldset>
        <button type="submit" className="pf-button">Submit Post</button>
      </form>
    </div>
  );
};

export default PostForm;