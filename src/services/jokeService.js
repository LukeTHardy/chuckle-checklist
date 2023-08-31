export const getAllJokes = () => {
  return fetch(`http://localhost:8088/jokes`).then((response) =>
    response.json()
  );
};

export const SaveJoke = async (newJokeObject) => {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newJokeObject),
  };
  const response = await fetch("http://localhost:8088/jokes", postOptions);
};

export const EditJoke = async (editedJoke) => {
  const putOptions = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(editedJoke),
  };
  const response = await fetch(
    `http://localhost:8088/jokes/${editedJoke.id}`,
    putOptions
  );
};

export const DeleteJoke = async (badJokeId) => {
  const deleteDeets = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  };
  const deleteCall = await fetch(
    `http://localhost:8088/jokes/${badJokeId}`,
    deleteDeets
  );
};
