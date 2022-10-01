import axios from "axios";
import VideoSearchBar from "../VideoSearchBar";

const KEY ="AIzaSyChcGUpKHW2KiDj6rQ_Z3SjREOBj5BcVuc";

export default axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params:{
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
    }
});