import React from "react";
import Column from "./Column";

function Table(){
    return(
       <div>
           <table border='1'  cellPadding='10px'>
               <tr>
                <Column/>
               </tr>
           </table>
       </div>
    )
}
export default Table;