import estilosGrid from '../styles/GridItems.module.css'

const GridItem=({horizontal, aspect, proporcion, cabecerita, cuerpito})=>{
    
    let estiloContenedorA = {
        gridTemplateColumns: proporcion.toString() + " auto",
        gridColumnGap: "5%",
        gridTemplateAreas: `'cabecera cuerpo'`
    };
    let estiloContenedorB = {
        gridTemplateRows: proporcion.toString() + " auto",
        gridRowGap: "5%",
        gridTemplateAreas: `
                            'cabecera'
                            'cuerpo'
                           `
    };
    let estiloHijoCabecera = {
        gridArea: 'cabecera'
    }
    let estiloHijoCuerpo = {
        gridArea: 'cuerpo'
    }
    let global = {
        width :"100%",
        paddingTop: aspect==null? "0px" : aspect+"%"
    }
    return (
        <div style = {global} className={estilosGrid.global}>
            <div className= {estilosGrid.estilo} style = {horizontal?estiloContenedorA:estiloContenedorB}>
                <div style = {estiloHijoCabecera}>
                    {cabecerita}
                </div>
                <div style = {estiloHijoCuerpo}>
                    {cuerpito!=null?cuerpito:""}
                </div>
            </div>
        </div>
    )
};

export default GridItem;