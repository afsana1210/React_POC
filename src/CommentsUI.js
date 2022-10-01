import React from "react";
import Faker from "faker";

function CommentsUI(props){
  console.log(props);
    return(
            <div className="comment">
                <a href="/" className="avatar">
                    <img src={`${Faker.image.nature()}?random=${Math.round(Math.random() * 1000)}`}  alt={"avatar"} className="avatarImg"/>
                </a>
            <div className="content">
                <a href="/" className="author">
                    {props.author}
                </a>
            <div className="metadata">
                <span className="date">{props.timeAgo}</span>
            </div>
            <div className="text">{props.textComment}</div>

            </div>

            
        </div>
    );
}
export default CommentsUI;