import React,{ useState ,useEffect} from "react";
import VideoSearchBar from "./VideoSearchBar";
import VideoList from "./VideoList";
import YoutubeAPI from "./YoutubeAPI";
import VideoDetail from "./VideoDetail";


const VideoSearchAPI=()=>{
    const[videos,setVideos]=useState([]);
    const[selectedVideo,setSelectedVideo]=useState(null);

    useEffect(()=>{
        onTermSubmit('buildings');   
    },[]);
    const onTermSubmit = async terms =>{
        const response=await YoutubeAPI.get("/search",{
            params:{
                q: terms
            }
        }
        );
        setVideos(response.data.items);
        setSelectedVideo(response.data.items[0]);
        
    };
    const onVideoSelect= video=>{
        setSelectedVideo(video);
     };
     return(
        <div className="ui container">
            <VideoSearchBar onFormSubmit={onTermSubmit} />
            <div className="ui grid">
                <div className="ui row">
                    <div className="eleven wide column">
                      <VideoDetail video={selectedVideo}/>
                    </div>
                    <div className="five wide column">
                       <VideoList 
                         onVideoSelect={onVideoSelect} 
                         videos={videos}/>
                    </div>   
                </div>  
            </div>
            
        </div>
    )
};
export default VideoSearchAPI;

