import './App.scss';
import {GiViolin, AiOutlineHome, RiPlayListAddFill} from "react-icons/all";
import React, { useEffect, useState } from 'react';
import { HomeScreen } from "./components/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import Playlist from './components/Playlists';
import CreatePlaylist from './components/CreatePlaylist';

var results = [];

function App() {
  let iconStyles = { color: "#ff9528", margin: "-4px 8px" };

  const [songs, setsongs] = useState([]);
  const [albums, setalbums] = useState([]);
  let albumname = [];
    const [isLoaded, setIsLoaded] = useState(false);
    if(results.length === 0)
    {results = [...songs];}

    const fetchSongsList = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos')
            .then((response) => response.json())
        setsongs(response);
        setIsLoaded(true);
    }

    const fetchAlbums = async() => {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      setalbums(response);
  }

    useEffect(() => {
        fetchSongsList();
        fetchAlbums();
    }, [])

    for(let i =0; i<albums.length; i++)
    {
    albumname.push({albumid: albums[i].id, albumname: albums[i].title});
    }


  return (
    <div className="App">
    <div className="main">
      <a href="/" className="title">VBI Music App    <GiViolin style={iconStyles} /></a>
      <div className="options">
        <a href="/"><AiOutlineHome /> Home</a>
        <a href="/playlists"><RiPlayListAddFill /> Create Playlist</a>
      </div>
    </div>
    <div className="home">
      <BrowserRouter>
      <Route exact activeClassName="active" path="/" render={()=> <HomeScreen setsongs={setsongs} songs={songs} albums={albumname} results={results} isLoaded={isLoaded}/>} />
      <Route path="/playlists" component={()=> <Playlist song={songs} results={results}/>} /> 
      <Route path="/newplaylist" component={()=> <CreatePlaylist song={songs} results={results}/> }/>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;
