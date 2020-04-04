import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

const WholeForm = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, red, purple, #ff0040, #550a8a);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
`;
const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  width: 600px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  padding: 42px 55px 45px 55px;
  margin-bottom: 10%;
`;

export default function Register(props) {
  return (
    <WholeForm>
      <h1>Welcome to Spotify Song Suggester!</h1>
      <Display>
        <a href="https://myspotifybackendserver.herokuapp.com/login">Login</a>
      </Display>
    </WholeForm>
  );
}
