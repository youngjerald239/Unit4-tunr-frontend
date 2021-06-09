import React, { useState } from "react";
const Form = ({ initialSong, handleSubmit, buttonLabel, history }) => {
  ////////////////////
  // The Form Data State
  ////////////////////
  const [formData, setFormData] = useState(initialSong);
  /////////////////////
  // functions
  /////////////////////
  const handleChange = (event) => {
    //Make a copy of the current state
    const newState = { ...formData };
    //updating a property on the object
    newState[event.target.name] = event.target.value;
    //pass the object as the new state
    setFormData(newState);
  };
  const handleSubmission = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmission}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.title}
        name="title"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.artist}
        name="artist"
      />
      <input
        type="integer"
        onChange={handleChange}
        value={formData.time}
        name="time"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};
export default Form;