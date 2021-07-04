//Loader
export const Loader = ({isLoading}) => {
    return (
        <div className={!isLoading ? "visible loader" : "hide"}></div>
    )
}