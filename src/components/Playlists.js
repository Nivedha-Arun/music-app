import {useHistory } from "react-router-dom";
import { MyLibrary } from "./MyLibrary";

function Playlist ({song, results}) {
    const history = useHistory();

    //To Navigate to the selected playlist
    const handleClick = () => {
        history.push("/newplaylist");
        document.getElementById('buttons').style.display = "none";
    }

    let buttonText = "Create Playlist";
    return (
        <div className="create-playlist">
            <input type="button" className="btn-create" value={buttonText} onClick={handleClick}/>
            <MyLibrary songsList={song} results={results}/>
        </div>
    )
}

export default Playlist;