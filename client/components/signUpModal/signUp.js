import React from "react";

export default function signUp() {
  return (
    <div className="signUpModal">
      <div className="modalContent">
        <button class="modalClose">✖</button>
        <h3 class="modalTitle" id="signTitle">
          Sign Up
        </h3>
        <div class="signInputWrapper">
          <input type="text" class="modalInput" placeholder="First Name" />

          <input type="text" class="modalInput" placeholder="Last Name" />

          <input type="text" class="modalInput" placeholder="Email" />

          <input
            type="tel"
            class="modalInput"
            id="phone"
            name="phone"
            pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
            placeholder="Mobile"
          />

          <input type="text" class="modalInput" placeholder="Password" />

          <input type="text" class="modalInput" placeholder="Confirm Password" />
        </div>
        <button type="submit" class="modalSubmit" id="signSubmit">
          Login
        </button>
      </div>
    </div>
  );
}
