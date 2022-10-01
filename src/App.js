import React from 'react';
import './App.css';
import Time from './Time';
import Welcome from './Welcome';
import Comment from "./Comment";
import Table from './Table';
import Grossary from './Grossary';
import Footer from './Footer';
import Header from './Header';
import Greeting from './Greeting';
import TodoItem from './TodoItem';
import Contact from './Contact';
import Jokes from './Jokes';
import Product from './Product';
import todosData from './todosData';
import Myinfo from './Classandstate';
import Test from './Test';
import Login from './Login';
import EventHandling from './Eventhandling';
import EventChange from './EventChange';
import ConditionalApp from './ConditionalApp';
import ConditionalAndOperator from './ConditionalAndOperator'
import UserLoggingState from './UserLoggingState'
import ApiCall from './ApiCall';
import FormChangeState from './FormChangeState';
import TravlerForm from './TravlerForm';
import MemeGenerator from './MemeGenerator';
import LanguageTranslator from './LanguageTranslator';
import CommentsUI from './CommentsUI';
import ApprovalCard from './ApprovalCard';
import UserLocation from './UserLocation';
import Clock from './Clock';
import SearchBar from './SearchBar';
import Validator from './Validator';
import CallBackChild from './CallBackChild';
import UserList from './UserList';
import VideoSearchBar from './VideoSearchBar';
import VideoSearchAPI from './VideoSearchAPI';
import MyComp from './MyComp';
import ButtonComp from './ButtonComp';
import NewinnerHTMLSyntac from './NewinnerHTMLSyntac';
import ReferenceElement from './ReferenceElement';
import UserListComp from './UserListComp';
import Reducer from './Reducers/Reducer'
import ClockInterval from './ClockInterval';
import Toggle from './Toggle';
 function App(props){
   const groceryData = [
     {"id":1,"term":"abcd","description":"empty"},
     {"id":2,"term":"xyz","description":"empty"}];
    const JokesData=[
      {"id":1,"question":"hdfvjdnv","answer":"djfdjfs"},
      {"id":2,"question":"maskajsijas"}
    ]
    const products=[
      { id:"1",
         name:"Pencil",
         price:1,
         description:"perfect for those who can't remeber things."
      },
      {  id:"2",
         name:"Box",
         price:5,
         description:"perfect for carring food outside."
      },
      {  id:"3",
         name:"Brush",
         price:2,
         description:"perfect for tooth cleaning."
      },
  ]
    const ProductComponent=products.map(item=>{
      return <Product products={item} />
    })
    const todoitems=todosData.map(item=><TodoItem key={item.id} item={item}/>)
    let recievedvalue;
    const recievedDefaultValue=(value)=>{

      console.log("In App",value); 
      recievedvalue = value;
    }
  //  return(
  //    <div>
  //      {/* <Jokes question="dhfjdfhjdhfjd" answer="shfjdnvdjgh"/>
  //      <Jokes answer="dnsfbhndb vnf"/> */}
  //      <NewinnerHTMLSyntac />
  //      <ButtonComp recievedDefaultValue={recievedDefaultValue}/>
  //      <MyComp  id="1" name="firstcomp" style={{color:"red"}} count={recievedvalue}>
  //          <div>Hello</div>
  //       </MyComp>
  //      {/* <MyComp  id="2" name="secondcomp" style={{color:"blue" ,backgroundColor:"grey"}}/> */}
  //      <VideoSearchAPI />
  //      <UserList />
  //      <CallBackChild />
  //      <Clock />
  //      <UserLocation />
  //      <div className="UI comment container">
  //        <ApprovalCard>
  //          <div>
  //            <h4>warning</h4>
  //            Are you sure you want to do this?
  //          </div>
  //        </ApprovalCard>
  //      <ApprovalCard>
  //      <CommentsUI 
  //        author="John" 
  //        timeAgo="Today at 4:00PM" 
  //        textComment="This is awesome blog" 
  //       />
  //       </ApprovalCard>
  //       <ApprovalCard>
  //       <CommentsUI 
  //        author="Jeny" 
  //        timeAgo="Today at 5:30PM"
  //        textComment="Nice blog post!"
  //       />
  //       </ApprovalCard>
  //       <ApprovalCard>
  //       <CommentsUI 
  //        author="Sam" 
  //        timeAgo="Yesterday at 4:49PM" 
  //        textComment="Love this blog!!"
  //       />
  //       </ApprovalCard>
  //       <ApprovalCard>
  //      <CommentsUI 
  //        author="Mark" 
  //        timeAgo="Yesternday at 3:50PM" 
  //        textComment="Thanks for sharing this blog post"
  //       />
  //       </ApprovalCard>
  //      </div>
       
  //      {/* <LanguageTranslator />
  //      <MemeGenerator />
  //      <TravlerForm />
  //      <FormChangeState />
  //      <ApiCall />
  //      <UserLoggingState />
  //      <ConditionalAndOperator />
  //      <ConditionalApp />
  //      <EventChange />
  //      <Test />
  //      <Login />
  //      <EventHandling />
  //      <Jokes item={JokesData} />
  //      {ProductComponent}
  //      {todoitems}
  //      <Header username="afsana"/>
  //      <Myinfo />
  //      <ul>
  //        <li>1</li>
  //        <li>2</li>
  //        <li>3</li>
  //      </ul>
       
  //      <Greeting />
  
  //      <Footer />
  //       <Welcome name="afsana"/>
  //       <Time />
  //       <Comment name="abc" text="ahgdjfj"/>
  //       <Table />
  //       <Grossary items={groceryData}/>
  //       <Contact />
  //        */}
  //    </div>
     
  //  )
  return(
    <>
    {/* <Reducer /> */}
    {/* <VideoSearchAPI /> */}
    <ClockInterval/>
    <Toggle/>
      {/* <UserListComp /> */}
      {/* <MyComp />
    <ReferenceElement /> */}
    </>
    
  )
 }

export default App;
