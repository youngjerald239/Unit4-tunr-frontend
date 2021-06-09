import './App.css';
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost"
import Form from "./pages/Form"
import {useState, useEffect} from "react"
import { Route, Switch, Link } from "react-router-dom";
function App(props) {
  /////////////////
  // Style Objects
  /////////////////
  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  const button = {
    backgroundColor: "red",
    display: "block",
    margin: "auto",
  };

  
  /////////////////////
  // State & Other Variables
  /////////////////////
  const url = "https://unit4-mini-tunr.herokuapp.com/songs/"
  const [posts, setPosts] = useState([])
  // an object that represents a null song
const nullSong = {
  title: "",
  artist: "",
  time: ""
};
// const state to hold song to edit
const [targetSong, setTargetSong] = useState(nullSong);
  //////////////
// Functions
//////////////

// Function to get list of Songs from API
const getSongs = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// Function to add song from form data
const addSongs = async (newSong) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSong),
  });

  // get updated list of songs
  getSongs();
};

// Function to select song to edit
const getTargetSong = (song) => {
  setTargetSong(song);
  props.history.push("/edit");
};

// Function to edit song on form submission
const updateSong = async (song) => {
  const response = await fetch(url + song.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });

  // get updated list of songs
  getSongs();
};

// Function to delete song on form submission
const deleteSong = async (song) => {
  const response = await fetch(url + song.id + "/", {
    method: "delete",
  });

  // get updated list of songs
  getSongs();
  props.history.push("/");
};


  /////////////////
  // useEffects
  /////////////////
  useEffect(() => {getSongs()}, [])

  return (
      <div className="App" style={{backgroundColor:"gray"}}>
        <h1 style={h1}>Tunr Playlist</h1>
        <Link to="/new"><button style={button}>Create New Song</button></Link>
        <Switch>
        <Route
    exact
    path="/"
    render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
  />
          <Route
  path="/post/:id"
  render={(routerProps) => (
    <SinglePost
      {...routerProps}
      posts={posts}
      edit={getTargetSong}
      deleteSong={deleteSong}
    />
  )}
/>
          <Route
              path="/new"
              render={(routerProps) => (
          <Form
            {...routerProps}
            initialSong={nullSong}
            handleSubmit={addSongs}
            buttonLabel="create song"
        />
      )}
    />
          <Route
    path="/edit"
    render={(routerProps) => (
      <Form
        {...routerProps}
        initialSong={targetSong}
        handleSubmit={updateSong}
        buttonLabel="update song"
      />
    )}
  />
        </Switch>
      </div>
    );
}
export default App;