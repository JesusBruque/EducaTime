import Link from 'next/link';

const courseStyle = {
    width: "100%",
    height: "180px",
    padding: "10px",
    background:"#000",
    border: '1px solid #DDD'
};
const todos={
    margin:"5px",
    border: '1px solid #FFF'
}
const foto ={
    display:"inline-block",
    width:"24%",
    height:"80%",
    background:"#DAD"
}
const contenido={
    display:"inline-block",
    width:"76%",
    height:"80%",
    background:"#DAA"
}
const descripcion={
    width:"100%",
    height:"82%",
    background:"#ACC"
}
const stats={
    width:"100%",
    height:"18%",
    background:"red"
}
const titulo={
    width:"100%",
    height:"18%",
    background:"#FFF"
}
const descripcionCurso={
    width:"100%",
    height:"82%",
    background:"#FAF",
    padding:"10px"
}
const left={
    display:"inline-block",
    width:"25%",
    height:"100%",
    background:"#0D0"
}
const rating={
    display:"inline-block",
    width:"50%",
    height:"100%",
    background:"#B0B"
}
const porCiento={
    display:"inline-block",
    width:"50%",
    height:"100%",
    background:"#0B0"
}
const right={
    display:"inline-block",
    width:"30%",
    height:"100%",
    background:"#AB3"
}
const descuento={
    display:"inline-block",
    width:"50%",
    height:"100%",
    background:"#6BA"
}
const precio={
    display:"inline-block",
    width:"50%",
    height:"100%",
    background:"#57A"
}
const Course = () => {
    return (<Link href={`www.google.com`}>
        <div style={courseStyle} className="caja">
            <div style= {foto} className="vistaPreviaVideo">
                
            </div>
            <div style = {contenido} className="Contenido">
                <div style = {descripcion} className="Descripcion">
                    <div style = {titulo} className="NombreDeCurso">
                    
                    </div>
                    <div style={descripcionCurso} className="DescripcionDeCurso">
                    
                    </div>
                    </div>
                <div style = {stats} className="Stats">
                    <div style = {left} className="Left">
                        <div style={rating} className="Rating">
                    
                        </div>
                        <div style={porCiento} className="PorCiento">
                    
                        </div>
                    </div>
                    <div style={right} className="Right">
                        <div style={descuento} className="Descuento">
                            
                        </div>
                        <div style={precio} className="Precio">
                    
                        </div>
                    </div>
                </div>
            </div>
            <style>{
            '.div{padding:10px;}'
            }
            </style>
        </div>
    </Link>)
};

export default Course;