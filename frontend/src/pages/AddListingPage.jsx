
import { useState } from "react";
import { useNavigate } from "react-router";

function AddListingPage({ onAdd }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // MongoDB creates the _id
      await onAdd({
        title: title,
        pricePerNight: Number(price),
      });

      navigate("/");
    } catch (err) {
      alert(`Could not save it: ${err.message}`);
    }
  }

  return (
    <form className="page form" onSubmit={handleSubmit}>
      <h2>Add a listing</h2>

      <label>
        Title
        <input
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Price per night
        <input
          type="number"
          value={price}
          required
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <button type="submit">Add listing</button>
    </form>
  );
}

export default AddListingPage;
