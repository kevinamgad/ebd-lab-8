
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import ListingCard from "./components/ListingCard.jsx";
import {
  getListings,
  createListing,
  removeListing,
} from "./api/listings.js";

function App() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load listings from the API when the app starts
  useEffect(() => {
    getListings()
      .then((data) => setListings(data))
      .catch(() => setError("Can't reach the API."))
      .finally(() => setLoading(false));
  }, []);

  // Update the browser tab title when listings change
  useEffect(() => {
    document.title = `ebd bn'b (${listings.length} listings)`;
  }, [listings]);

  // Add a listing to MongoDB
  async function addListing(listing) {
    const saved = await createListing(listing);
    setListings([...listings, saved]);
  }

  // Delete a listing from MongoDB
  async function deleteListing(id) {
    await removeListing(id);
    setListings(listings.filter((l) => l._id !== id));
  }

  // Show loading message
  if (loading) {
    return <p className="page">Loading...</p>;
  }

  // Show error message
  if (error) {
    return <p className="page error">{error}</p>;
  }

  // Show message if there are no listings
  if (listings.length === 0) {
    return (
      <main>
        <Header />
        <p className="page">No listings yet. Add one!</p>
      </main>
    );
  }

  // Create one card for every listing
  const cards = listings.map((listing) => (
    <ListingCard
      key={listing._id}
      listing={listing}
      onDelete={deleteListing}
    />
  ));

  return (
    <main>
      <Header />
      <div className="listings">{cards}</div>
    </main>
  );
}

export default App;
