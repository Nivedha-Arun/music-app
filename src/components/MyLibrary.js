import { useEffect, useState, useReducer, useCallback } from "react";
import { SongsList } from "./SongsList";
import { Search } from './Search';

let songs = [];
let val = "", currentPlaylist = "";

//Reducer functionality
function reducer(state = { playlist : {}}, action) {  
    const shuffle = (array) => {
        if(array !== undefined)
        {var currentIndex = array.length,  randomIndex;
      
        while (0 !== currentIndex) {
       
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }}

        return array;}

      const remove = (value) => {
          var newarr = state.playlist.filter(element => element.id !== value)
          return newarr
      }

      const add = (value, list) => {
        var newarr = list.filter(element => element.id === value);
        state.playlist.push(newarr[0]);
        return state.playlist
    }

      const displayPlaylist = (name) => {
        let modifiedList = songs.filter(element => (element.name.toString() === name));
        let jsonObject = modifiedList[0].songs.map(JSON.stringify);      
        let uniqueSet = new Set(jsonObject);
        let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        return uniqueArray;
    }

        const saveToStorage = (array) => {
            var existing = localStorage.getItem('playlist');
            existing = existing ? JSON.parse(existing.split(',')) : [];
            var newarr = state.playlist.filter(element => element.id === array);
            existing.map((record) => {
                    if(record.name === currentPlaylist)
                    { record.songs.push(newarr[0])}
                    return record.songs.push(newarr[0])
            })
            localStorage.setItem('playlist', JSON.stringify(existing));
        }

        const removeFromStorage = (array) => {
            var existing = localStorage.getItem('playlist');
            existing = existing ? JSON.parse(existing.split(',')) : [];
            existing.map((record) => {
                    if(record.name === currentPlaylist)
                    { let list = record.songs.filter(element => (element.id !== array))
                      record.songs = list;}
                      return record.songs;
                    }
                )
            localStorage.setItem('playlist', JSON.stringify(existing));
        }

    //Switch Case for the Reducer
    switch(action.type){
    case 'display' :
        var selectedplaylist = displayPlaylist(action.value);
        return {playlist : selectedplaylist};
    case 'shuffle' :
        var newarr = shuffle(state.playlist);
        return {playlist : newarr};
    case 'delete' : 
        var arr = remove(action.value);
        removeFromStorage(action.value);
        return {playlist : arr};
    case 'add' : 
        var update = add(action.value, action.list);
        let jsonObject = update.map(JSON.stringify);      
        let uniqueSet = new Set(jsonObject);
        let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        saveToStorage(action.value);
        return {playlist : uniqueArray};
    default : 
        return state.playlist;
    }
}
var searchresults = []
export const MyLibrary = ({songsList, results}) => {
    let playlist = ""; 
    const [songList, setsongList] = useState([])
    const [list, setsongs] = useState([]);
    const [isvisible, setisvisible] = useState("hide");
    let mylist = JSON.parse(localStorage.getItem("playlist"));
    const [state, dispatch] = useReducer(reducer, (playlist)); 
    if(searchresults.length === 0)
    {searchresults = [...songList];}

    const setData = (list) => {
        setsongs(list);
        songs = list;
    }

    useEffect(() => {
        setData(mylist);
    }, [])

    //To delete a playlist from our Local Storage
    const handleClick = (element) => {
        var name = element.target.id;
        let modifiedList = list.filter(element => (element.name.toString() !== name));
        setsongs(modifiedList);
        localStorage.clear();
        localStorage.setItem("playlist", JSON.stringify(modifiedList));
    }

    //To shuffle the songs in our playlist
    const shuffleSongs = () => {
        dispatch({type : 'shuffle'})
    }

    //Loads the songs available in the selected playlist
    const displaySongs = (element) => {
        var name = element.target.id;
        currentPlaylist = name;
        document.getElementById('playlist').style.display = "block";
        document.getElementById('buttons').style.display = "none";
        dispatch({type: 'display', value : name})
    }

    //To remove a particular song from the list
    const removeSong = (value) => {
        var removedSong = state.playlist.filter(element => (element.id === value));
        songList.push(removedSong[0]);
        songList.sort(function (x, y) {
            return x.id - y.id;
        });
        setsongList(songList);
        dispatch({type: 'delete', value : value})
    }

    //To add a new song to the playlist
    const addToPlaylist = (value) => {
        var newlist = songList.filter(element => (element.id !== value));
        setsongList(newlist);
        dispatch({type: 'add', value : value, list : songList})
    }

    //To display the entire list of songs to add new songs to the playlist
    const addSongs = () => {
        setisvisible("visible");
        state.playlist.map((record) => {
            var newlist = songsList.filter(element => (element.id !== record.id));
            songsList = newlist;
            return setsongList(newlist);
        });
    }

    //Close the add more section
    const closePlaylist = () => {
        setisvisible("hide");
    }

    //Search functionality in the playlist
    const searchData = useCallback(value => {
        if(value)
        {   val = value;
            var searchResults = songList.filter(element => element.title.includes(value.toLowerCase()))
            setsongList(searchResults)}
        else{
        val = "";
        setsongList(searchresults)
        }
    }, [setsongList, songList])
    
        return(
            <div>
            {/* Stored Playlists */}
            <div id="buttons" className="button-heading">
                <h1>My Playlists</h1>
            {list && list.map((element, index) => {
            return(
            <div key={index} className="mylibrary">
                <button className="playlistName" id={element.name} onClick={displaySongs.bind(element)}>{element.name}</button>
                <button className="close" id={element.name} onClick={handleClick.bind(element.name)}>x</button>
            </div>)})}
            </div>
            
            {/* Selected Playlist with actions*/}
            <div id="playlist" className="my-songs buttons">
                <button className="actions" onClick={addSongs}>Add Song</button>
                <button className="actions" onClick={shuffleSongs}>Shuffle</button>
                <button className="actions close" onClick={closePlaylist}>Close</button>
            <table>
                {state.playlist !== undefined && state.playlist.map((record, index) => {
                    return (
                        <SongsList key={index} record={record} add={"hide"} deleterecord={"visible playlist-icon"} deleteSong={removeSong}/>
                        )})}
                         </table>
                </div>

                {/* Add More section */}
                <div id="songlist" className={isvisible + " my-songs add-songs"}>
                    <h1>Add More</h1>
                    <Search value={val} searchFunc={searchData}/>
                    <table>
                        {songList && songList.map((record) => {
                            return (
                                <SongsList key={record.id} record={record} add={"visible playlist-icon"} deleterecord={"hide"} addToPlaylist={addToPlaylist}/>)
                        })}
                    </table>
        </div>
            </div>

        )    
}