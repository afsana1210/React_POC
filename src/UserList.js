import React from "react";

const users=[
    {id:1,name:"abc"},
    {id:1,name:"def"},
    {id:1,name:"pqr"},
    {id:1,name:"stu"}
];
export default class UserList extends React.Component{
   render(){
       const userrenderer=users.map(({id,name})=>{
           return <li key={id}>{name}</li>
       })
       return(
           <ul>{userrenderer}</ul>
       )
   }
}