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
      [name]: type === "radio" ? value === "true" : value,
    });
  };

  // submit, invio in POST e reset
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
};

export default PostForm;