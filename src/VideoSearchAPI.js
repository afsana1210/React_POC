import React from "react";
import VideoSearchBar from "./VideoSearchBar";
import VideoList from "./VideoList";
import youTube from "./api/youTube";
import VideoDetail from "./VideoDetail";

export default class VideoSearchAPI extends React.Component{
    state = { videos :[], selectedVideo:null };

    componentDidMount(){
        this.onTermSubmit('buildings');    
    }
    onTermSubmit = async terms =>{
        const response=await youTube.get("/search",{
            params:{
                q: terms
            }
        }
        );
        this.setState({
            videos: response.data.items,
            selectedVideo : response.data.items[0]
        })
    };
    onVideoSelect= video=>{
       this.setState({selectedVideo : video});
    }
    render(){
        return(
            <div className="ui container">
                <VideoSearchBar onFormSubmit={this.onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                          <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                           <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>   
                    </div>  
                </div>
                
            </div>
        )
    }
}