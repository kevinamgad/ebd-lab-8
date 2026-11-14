
import { useState } from "react";

function ListingCard({ listing, onDelete }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="card">
      <h2>{listing.title}</h2>

      <p>{listing.pricePerNight} per night</p>

      <button onClick={() => setSaved(!saved)}>
        {saved ? "♥ Saved" : "♡ Save"}
      </button>

      <button onClick={() => onDelete(listing._id)}>
        Delete
      </button>
    </div>
  );
}

export default ListingCard;
