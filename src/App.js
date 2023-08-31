import "./App.css";
import { useState, useEffect } from "react";
import { EditJoke, SaveJoke, DeleteJoke } from "./services/jokeService";
import { getAllJokes } from "./services/jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [newJokeObject, setNewJokeObject] = useState({});
  const [allJokes, setAllJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
      console.log("All jokes set");
      console.log(jokesArray);
    });
  }, []);

  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told === true);
    const untold = allJokes.filter((joke) => joke.told === false);
    setToldJokes(told);
    setUntoldJokes(untold);
    console.log(told);
    console.log(untold);
  }, [allJokes]);

  // const toggleTold = (joke) => {
  //   let editedJoke = ;
  //   return editedJoke;
  // };

  const UpdateJokes = () => {
    getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr);
    });
  };

  const handleToggleClick = async (joke) => {
    let toggledJoke = {
      text: joke.text,
      told: joke.told ? false : true,
      id: joke.id,
    };
    await EditJoke(toggledJoke);
    UpdateJokes();
  };

  const handleDeleteClick = async (badJoke) => {
    await DeleteJoke(badJoke.id);
    UpdateJokes();
  };

  return (
    <>
      {/* Joke input component */}

      <div className="app-container">
        <header className="app-heading">
          <div className="app-heading-circle">
            <img className="app-logo" src={stevePic} alt="Good job Steve" />
          </div>
          <h1 className="app-heading-text">Chuckle Checklist</h1>
          <h2 className="align-left">Add Joke</h2>
        </header>
        <div className="joke-add-form">
          <input
            className="joke-input"
            type="text"
            value={inputValue}
            placeholder="New One Liner"
            onChange={(change) => {
              const newJoke = change.target.value;
              setInputValue(newJoke);
              setNewJokeObject({
                text: newJoke,
                told: false,
                id: null,
              });
            }}
          />
          <button
            className="joke-input-submit"
            onClick={() => {
              SaveJoke(newJokeObject); // saves new joke to the database
              setInputValue(""); // resets value of input field
              setAllJokes([...allJokes, newJokeObject]); // updates the value of allJokes with new joke
              UpdateJokes(); // updates the value of allJokes...again?
            }}
          >
            Save Joke
          </button>
        </div>

        {/* Joke Lists */}

        <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2>
              <i className="fa-solid fa-volume-high" /> Told
              <span className="told-count">{toldJokes.length}</span>
            </h2>
            <ul>
              {toldJokes.map((joke) => {
                return (
                  <li className="joke-list-item" key={joke.id}>
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div>
                      <button
                        className="joke-list-action-delete"
                        onClick={(click) => {
                          handleDeleteClick(joke);
                        }}
                      >
                        <i className="fa-solid fa-skull" />
                      </button>
                      <button
                        className="joke-list-action-toggle"
                        onClick={(click) => {
                          handleToggleClick(joke);
                        }}
                        // type="button"
                      >
                        <i className="fa-solid fa-volume-xmark" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="joke-list-container">
            <h2>
              <i className="fa-solid fa-volume-xmark" /> Untold
              <span className="untold-count">{untoldJokes.length}</span>
            </h2>
            <ul>
              {untoldJokes.map((joke) => {
                return (
                  <li className="joke-list-item" key={joke.id}>
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div>
                      <button
                        className="joke-list-action-delete"
                        onClick={(click) => {
                          handleDeleteClick(joke);
                        }}
                      >
                        <i className="fa-solid fa-skull" />
                      </button>
                      <button
                        className="joke-list-action-toggle"
                        onClick={(click) => {
                          handleToggleClick(joke);
                        }}
                        // type="button"
                      >
                        <i className="fa-solid fa-volume-high" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
