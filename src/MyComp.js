import React, { useState } from "react";
import StudentTable from './StudentTable';
import StudentForm from './StudentForm';

// class MyComp extends React.Component{
//     constructor(props){
//         super(props)
//         console.log(props)
//         this.state={count:0}
//     }
    
//     handleChange=(prevState,props)=>{
//         this.setState((prevState,props)=>prevState.count+props.count)}
    
//     render(){
//         return (
//             <>
//             <div>count: {this.state.count}</div>
//             <button onClick={this.handleChange}>change</button>
//             </>
//         )
       
//     }
// }

// const MyComp=(props)=>{
//     console.log(props);
    
//    return(
//        <div id={props.id} style={props.style}>
//            <div style={{backgroundColor:"pink"}}>{props.name}</div>
//            <div style={{marginTop: 50}}>{props.children}</div>
//            { props.children ?
           
//             <div style={{marginTop: 50}}>children</div> : null }
//            <div> count: {props.count ? props.count : "-"}</div>
//         </div>
//    )
// }

// class MyComp extends React.Component {
//     constructor(props) {
//       super(props)
  
//       this.state = {
//         records: [],
//         // inputValue: this.props.name
//       };
//     }
  
//     render() {
//       return <div>{this.props.name}</div>
//     }
//   }

// export default MyComp;
// const MyComp = ( props ) => {
//     const [studentData, setStudentData] = useState([{id: 101, name: 'afsana'}]);

//     const setStudentDataHandler = (id, name) => {
//         setStudentData([...studentData, {id: id, name: name} ]);
//     }
//     return(
//         <>
//         <StudentTable studentDetails={ studentData } />
//         <StudentForm setStudentDataHandler={ setStudentDataHandler } />
//         </>
        
//     );
// };
const MyComp = () =>{
    const [studentDetails,setStudentDetails]=useState([{id:1,name:"afsana"}]);

    const setStudentDataHandler = (id,name)=>{
        setStudentDetails([...studentDetails , {id:id,name:name}]);
    }


    return(
        <>
          <StudentTable studentDetails={studentDetails} />
          <StudentForm  setStudentDataHandler={setStudentDataHandler} />
        </>
    )
}

export default MyComp;