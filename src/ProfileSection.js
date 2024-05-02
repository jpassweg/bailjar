import React from "react";
import './Containers.css'
import profile from './images/profile.jpg'

export const ProfileSection = () => {
  return (
    <div class="container">
      <div class="image-container">
        <img src={profile} class="image" alt="Jonas Passweg"/>
      </div>
      <div class="text-container">
        <h1>Hello, I'm Jonas Passweg</h1>
        <p>Welcome to my portfolio website! Here you can find information about my projects, skills, and professional experiences.</p>
      </div>
    </div>
  );
};