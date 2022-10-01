import React from "react";

function Grossary(props){
     return(
         <dl>
             {props.items.map(item =>(
                <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                </React.Fragment>
             )
             )}
         </dl>
     )
}
export default Grossary;