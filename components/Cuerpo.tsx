const Cuerpo = ({titulo, descripcion, final, anchoTitulo})=>{
    
    let estiloCuerpoA = {
        display:"grid",
        width: "100%",
        height: "100%",
        gridTemplateRows: final==null? anchoTitulo + ' auto 1px': anchoTitulo + ' auto 18%',
        gridRowGap: "10px",
        gridTemplateAreas: `
                            'title'
                            'description'
                            'final'
                           `
    };
    let estiloCuerpoB = {
        display:"grid",
        width: "100%",
        height: "100%",
        gridTemplateRows: final==null? '1fr 1fr 1px': '1fr 1fr 1fr',
        gridRowGap: "10px",
        gridTemplateAreas: `
                            'title'
                            'description'
                            'final'
                           `
    };
    let estiloHijoTitulo = {
        width:'100%',
        height: '100%',
        gridArea: 'title'
    }
    let estiloHijoDescripcion = {
        width:'100%',
        height: '100%',
        gridArea: 'description'
    }
    let estiloHijoFinal = {
        width:'100%',
        height: '100%',
        gridArea: 'final'
    }
    return(
        <div style={anchoTitulo!=null? estiloCuerpoA:estiloCuerpoB}>
            <div style={estiloHijoTitulo}>
                {titulo}
            </div>
            <div style={estiloHijoDescripcion}>
                {descripcion}
            </div>
            <div style = {estiloHijoFinal}>
                {final}
            </div>
        </div>
    )
};

export default Cuerpo;