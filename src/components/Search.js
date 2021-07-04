export const Search = ({ searchFunc, value }) => {

    return (
        <div className="search">
            <input type="text" 
                   id="searchtext"
                   value={value} 
                   onChange={(e) => searchFunc(e.target.value)} 
                   name="search" 
                   placeholder="Search by name...">
            </input>
        </div>
    )
}