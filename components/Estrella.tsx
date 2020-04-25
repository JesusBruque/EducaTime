const Estrella = () => {

    let paraPath = {
        fill: "none",
        stroke: "black",
        strokeWidth:"0.5px"
    }
    let barra = {
        paddingTop: "100%",
        // backrgound
    }
    return(
        <div style = {barra}>
            <svg xmlns={"http://www.w3.org/2000/svg"} width={"10.418"} height={"10.002"} viewBox={"0 0 10.418 10.002"}>
                <path id={"prefix__star"} d={"M9.876 4.082a.526.526 0 0 0-.453-.361l-2.858-.26L5.435.816a.526.526 0 0 0-.968 0l-1.13 2.645-2.859.259a.527.527 0 0 0-.3.921L2.34 6.536 1.7 9.342a.526.526 0 0 0 .783.569l2.468-1.474 2.464 1.474a.527.527 0 0 0 .785-.569l-.638-2.806 2.161-1.895a.527.527 0 0 0 .153-.559zM5 8.409"} transform={"translate(.258 -.246)"} style={paraPath}/>
            </svg>
        </div>
)
};
export default Estrella;