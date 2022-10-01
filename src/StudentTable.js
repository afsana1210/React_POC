import React from 'react'

// const StudentTable = ( props ) => {
//     const { studentDetails } = props;
//     return(
//         <div>
//             {
//                 studentDetails.map(stud => {
//                     return <>
//                         <div>{stud.id}</div>
//                         <div>{stud.name}</div>
//                     </>
//                 })
//             }
//         </div>
//     )
// };

const StudentTable =(props) =>{
  const {studentDetails } = props;

  return(
      <div>
      {
        studentDetails.map(stud=>{
            return <>
            <li >
              <div >{stud.id}</div>
              <div>{stud.name}</div>
            </li>
              
            </>
        })
      }
     </div> 
  )
}

export default StudentTable;