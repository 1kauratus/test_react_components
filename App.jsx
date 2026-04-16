import { useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:3000";

export default function App() {
  const [form, setForm] = useState({ name: "", description: "" });
  const [features, setFeatures] = useState([]);

  // Load features on mount
  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const res = await axios.get(`${API}/features`);
      setFeatures(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/features`, form);
      setForm({ name: "", description: "" });
      fetchFeatures(); // refresh list after adding
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="features">
      <h2>Add Feature</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Feature Name"
          value={form.name} onChange={handleChange} />
        <br /><br />
        <input type="text" name="description" placeholder="Feature Description"
          value={form.description} onChange={handleChange} />
        <br /><br />
        <button type="submit">Add Feature</button>
      </form>

      <h2>Features:</h2>
      <ul>
        {features.map((f) => (
          <li key={f._id}>
            <strong>{f.name}</strong>: {f.description}
          </li>
        ))}
      </ul>
    </div>
  );
}