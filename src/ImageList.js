import "./imageList.css";
import react from "react";
import ImageCard from "./ImageCard"
import { image } from "faker";

const ImageList = props =>{
    console.log(props.images);
const image = props.images.map((image)=>{
        return <ImageCard key={image.id} image={image} />
    })
   return <div className="image-list">{image}</div> 
};
export default ImageList;