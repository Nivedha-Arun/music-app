import { SongsList } from "./SongsList";
import { Loader } from "./Loader";
import { useState, useEffect } from "react";
import {useHistory } from "react-router-dom";

var myplaylists= [];

//Create Playlist button loads this screen
function CreatePlaylist ({song, results}) {
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    const [songs, setsongs] = useState([]);
    const [playlist, setplaylist] = useState([])
    var myplaylist = [];

    const setData = (list) => {
        list.sort(function (x, y) {
            return x.id - y.id;
        });
        setsongs(list);
        setIsLoaded(true);
    }

    useEffect(() => {
        setData(song);
    }, [song])

    //Stores the selected songs to a list
    const addtoplaylist = (value) => {
        myplaylist.push(value);
        var songList = songs.filter(element => (element.id !== value))
        setsongs(songList);
        createNewPlaylist();
    }

    const createNewPlaylist = () => {
        myplaylist.map((id) => {
                var addsong = results.filter(element => (element.id === (id)))
                myplaylists.push(addsong[0]);
                setplaylist(myplaylists);
                return myplaylists;
        });   
    }

    //Removes a song from the list created
    const removeSong = (value) => {
        var addSong = playlist.filter(element => (element.id === (value)));
        var newlist = playlist.filter(element => (element.id !== (value)));
        setplaylist(newlist);
        songs.push(addSong[0]);
        setData(songs);
    }

    //Stores the playlist to our local storage
    const savePlaylist = () => {
        let initialState = [];
        var name = document.getElementById("playlist-name");
        var existing = localStorage.getItem('playlist');
        existing = existing ? JSON.parse(existing.split(',')) : [];
        existing.push({
            name: name.value ? name.value : existing.length + 1,
            songs : playlist});
        localStorage.setItem('playlist', JSON.stringify(existing));
        setplaylist(initialState);
        name.value = "";
        setsongs(results);
        history.push("/playlists");
    }

    return (
        <div className="create-playlist">
        <Loader isLoading={isLoaded} />

        {/* Entire Songs List */}
        {isLoaded && <div id="my-songs" className="my-songs songlist">
                    <table>
                        {songs.map((record) => {
                            return (
                                <SongsList key={record.id} record={record} add={"visible playlist-icon"} deleterecord={"hide"} addToPlaylist={addtoplaylist}/>)
                        })}
                    </table>
        </div>}
        
        {/* Created Playlist Section */}
        {isLoaded && <div id="my-songs playlist" className={playlist.length>0 ? "my-songs visible" : "hide"}>
                <input type="text" id="playlist-name" className="playlist-name"/>
                <input type="button" className="btn-save" value="Save" onClick={savePlaylist}/>
                    <table>
                        {playlist && playlist.map((record) => {
                            return (
                                <SongsList key={record.id} record={record} add={"hide"} deleterecord={"visible playlist-icon"} deleteSong={removeSong}/>)
                        })}
                    </table>
        </div>}
        </div>
    )
}

export default CreatePlaylist;