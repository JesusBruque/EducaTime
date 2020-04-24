import React, {useState, FunctionComponent, useRef} from "react";
import styles from '../styles/ImageEditable.module.css';

type Props = {
    image:string,
    height:number,
    width:number,
    description:string
}
const ImageEditable : FunctionComponent<Props> = (props) => {

    const [selectedImage,setSelectedImage] = useState(false);
    const thisRef = useRef(null);
    let resizing = false;
    const [imageProps,setImageProps] = useState({height:props.height,width:props.width});

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseCorner = (e) => {
        e.preventDefault();
        resizing = true;
        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);
    };
    const handleMouseUp = (e) => {
        if(resizing){
            resizing=false;
            document.removeEventListener('mousemove',handleMouseMove);
            setSelectedImage(false);
        }
    };

    const handleMouseMove = (e) => {
        mouseX = e.clientX || e.pageX;
        mouseY = e.clientY || e.pageY;
        let image = thisRef.current;
        let imgInfo = image.getBoundingClientRect();
        setImageProps({height:imageProps.height + (imgInfo.y - mouseY),width:imageProps.width + (imgInfo.x - mouseX)});
        console.log(resizing);
    };

    const resizeImage = () => {

    };
    const handleClickImage = () => {
        setSelectedImage(!selectedImage);
    };

    return (
        <div className={styles.imageContainer}>
            <img src={props.image} style={{height:`${imageProps.height}px`,width:`${imageProps.width}`}} alt={props.description} onClick={handleClickImage} ref={thisRef}/>
            {
                selectedImage &&
                <div className={styles.marcoElement}>
                    <div onMouseDown={handleMouseCorner} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className={`${styles.cornerElement} ${styles.nw}`}></div>
                    <div onMouseDown={handleMouseCorner} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className={`${styles.cornerElement} ${styles.ne}`}></div>
                    <div onMouseDown={handleMouseCorner} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className={`${styles.cornerElement} ${styles.se}`}></div>
                    <div onMouseDown={handleMouseCorner} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className={`${styles.cornerElement} ${styles.sw}`}></div>
                </div>
            }
        </div>
    )
};

export default ImageEditable;
