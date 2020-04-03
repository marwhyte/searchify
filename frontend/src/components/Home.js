import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
const Home = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8888/auth/refresh_token")
      .then((res) => console.log(res));
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.code;

    // fetch("https://api.spotify.com/v1/me", {
    //   headers: {
    //     Authorization: "Bearer " + accessToken,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    // localStorage.setItem("accessToken", accessToken.code);
    // setAccessToken(accessToken.code);
  }, []);
  // useEffect(() => {
  //   const request = new Request(
  //     `https://api.spotify.com/v1/browse/categories`,
  //     {
  //       headers: new Headers({
  //         Authorization: "Bearer " + accessToken,
  //       }),
  //     }
  //   );
  //   fetch(request).then((res) => {
  //     console.log(res);
  //   });
  // axios
  //   .get("https://api.spotify.com/v1/me/top/artists", {
  //     Authorization: "Bearer " + accessToken
  //   })
  //   .then(res => {
  //     console.log(res);
  //   })
  //   .catch(err => {
  //     console.log("there was an error!");
  //   });
  // });

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
          favorites.map((favorite) => {
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
