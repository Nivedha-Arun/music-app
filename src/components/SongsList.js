import { useState } from "react";
import { FiPlay, AiFillHeart, RiPlayListAddLine, AiFillDelete } from "react-icons/all";

export const SongsList = ({record, add, deleterecord, addToPlaylist, albums, deleteSong}) => {
    const [fillcolor, setfillcolor] = useState("currentColor")
    if(albums)
    {var found = albums.find(element => element.albumid === record.albumId);}
    const likeSong = () => {
        if(fillcolor === "currentColor")
        { setfillcolor("red"); }
        else
        { setfillcolor("currentColor")}
    }
    return (
    <tbody>
    <tr key={record.id} className="record">
                                <td><h3 className="id">{record.id}</h3></td>
                                <td><img src={record.url} alt={record.id} /></td>
                                <td><h3 className="song-name">{record.title}</h3>
                                {found && <h5 className="song-name">{found.albumname}</h5>}</td>
                                <td><button><FiPlay size={32} className="icons play" /></button></td>
                                <td><button onClick={likeSong}><AiFillHeart size={32} id="likeSong" fill={fillcolor} className="icons" /></button></td>
                                <td className={add}><button onClick={() => addToPlaylist(record.id)}><RiPlayListAddLine size={32}/></button></td>
                                <td className={deleterecord}><button onClick={() => deleteSong(record.id)}><AiFillDelete size={32}/></button></td>
                            </tr></tbody>)
}