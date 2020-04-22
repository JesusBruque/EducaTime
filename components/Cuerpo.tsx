const Cuerpo = ({titulo, descripcion, anchoTitulo})=>{
    let estiloCuerpo = {
        display:"grid",
        width: "100%",
        gridTemplateRows: anchoTitulo.toString()+"px auto",
        gridRowGap: "10px",
        gridTemplateAreas: `
                            'title'
                            'description'
                           `
    };
    let estiloHijoTitulo = {
        width:'100%',
        height: '100%',
        gridArea: 'title'
    }
    let estiloHijoDescripcion = {
        gridArea: 'description'
    }
    return(
        <div style={estiloCuerpo}>
            <div style={estiloHijoTitulo}>
                {titulo}
            </div>
            <div style={estiloHijoDescripcion}>
                {descripcion}
            </div>
        </div>
    )
};

export default Cuerpo;