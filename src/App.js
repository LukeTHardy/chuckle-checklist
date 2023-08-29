import "./App.css";
import { useState } from "react";

export const App = () => {
  const [newJoke, setNewJoke] = useState("");

  <div className="app-container">
    return (
    <>
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          value={newJoke}
          placeholder="New One Liner"
          onChange={(change) => {}}
        />
        <button className="joke-input-submit">It's a Keeper</button>
      </div>
    </>
    );
  </div>;
};
