import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // const fetchFavorites = async () => {
    //   const userId = localStorage.getItem("user_id");
    //   const results = await axios.get(
    //     `https://symphinity-backend.herokuapp.com/api/music/${userId}/faves`
    //   );
    //   console.log(results);
    //   setFavorites(results.data);
    // };
    // fetchFavorites();
  }, []);
  return (
    <div className="home">
      <form>
        <input type="text" name="searchbar" placeholder="Search A song!" />
      </form>
      <div className="favorites">
        <h2>Your Favorites!</h2>
        {favorites.length === 0 ? (
          <p>You Have no Favorites!</p>
        ) : (
          favorites.map(favorite => {
            return (
              <div className="favSong">
                <p>{favorite.track_name}</p>
                <p>{favorite.artist_name}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
