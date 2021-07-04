import React, { useCallback } from 'react';
import { SongsList } from './SongsList';
import { Loader } from './Loader';
import { Search } from './Search';
import { AiOutlinePlayCircle, FaStepForward, FaStepBackward, ImLoop, BsShuffle } from 'react-icons/all'

let val = "";
export const HomeScreen = ({songs, results, isLoaded, setsongs, albums}) => {

    //Search functionality is implemented
    const searchData = useCallback(value => {
        if(value)
        {   val = value;
            var searchResults = results.filter(element => element.title.includes(value.toLowerCase()))
            setsongs(searchResults)}
        else{
        val = "";
        setsongs(results)
        }
    }, [setsongs, results])

    return (
        <div>
            {/* Songs List with Search */}
            {<Loader isLoading={isLoaded} />}
            {isLoaded && <div className="container">
                <div className="song-title">
                    <h1>My Songs</h1>
                    <h3>{songs.length} songs</h3>
                </div>
                <Search value={val} searchFunc={searchData}/>
                <div className="my-songs">
                    <table>
                        {songs.map((record) => {
                            return (
                                <SongsList key={record.id} record={record} albums={albums} add={"hide"} deleterecord={"hide"}/>)
                        })}
                    </table>
                </div>

                {/*Player Section */}
                <div className="player">
                    <div className="icons">
                        <BsShuffle className="player-icon" size={22}/>
                        <FaStepBackward className="player-icon" size={22}/>
                        <AiOutlinePlayCircle className="player-icon play" size={40}/>
                        <FaStepForward className="player-icon" size={22}/>
                        <ImLoop className="player-icon" size={22}/>
                    </div>
                    <div className="duration">
                        <hr></hr>
                    </div>
                </div>
            </div>}
        </div>
    )
}