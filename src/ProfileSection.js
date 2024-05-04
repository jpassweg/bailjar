import React from "react";
import './Containers.css'
import profile from './images/profile.jpg'

export const ProfileSection = () => {
  return (
    <div class="container">
      <div class="image-container">
        <img src={profile} id="profile-image" alt="Jonas Passweg"/>
      </div>
      <div class="text-container" id="profile-section-div">
        <h1>Hello, I'm Jonas Passweg</h1>
        <p>Welcome to my website! Here you can find information about my projects, skills, and professional experiences.</p>
      </div>
    </div>
  );
};