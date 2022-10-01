import React, { useState } from 'react'

// const StudentForm = ( props ) => {
//     const { setStudentDataHandler } = props;
//     const [studentId, setStudentId ] = useState();
//     const [studentName, setStudentName ] = useState();

//     const studentDataSetId = ( event ) => {
//         setStudentId(event.target.value);
//     }

//     const studentDataSetName = ( event ) => {
//         setStudentName( event.target.value );
//     }

//     const setStudentDetails = (event) => {
//         event.preventDefault();
//         setStudentDataHandler(studentId, studentName);
//     }

//     return(
//         <>
//         <input name="id" onChange={ studentDataSetId }/>
//         <input name="name" onChange={ studentDataSetName }/>
//         <button value="submit" onClick={ setStudentDetails } />
//         </>
//     )
// };

const StudentForm =(props) =>{
    const {setStudentDataHandler} = props;
    const [studentId,setStudentId] =useState();
    const [studentName,setStudentName] = useState();

    console.log("before",studentId);

    const studentDataSetId=(e)=>{
       setStudentId(e.target.value);
    }
     console.log("after",studentId);
    const studentDataSetName=(e)=>{
        setStudentName(e.target.value);
    }

    const setStudentDetails=(e)=>{
        e.preventDefault();
        setStudentDataHandler(studentId,studentName);
    }


    return(
        <div>
            <input name="id" onChange={studentDataSetId}></input>
            <input name="name" onChange={studentDataSetName}></input>
            <button value="submit" onClick={setStudentDetails}>Submit</button>
        </div>
    )
}

export default StudentForm;