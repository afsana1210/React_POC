import React,{ useState } from "react";
// import { useState } from "react/cjs/react.production.min";
import Accordion from "./componets/Accordion";
import Comp1 from "./componets/Comp1";
import Count from "./componets/Count";
import Dropdown from "./componets/Dropdown";
import Header from "./componets/Header";
import Route from "./componets/Route";
import Search from "./componets/Search";
import Translate from "./componets/Translate";
import generate_table from "./employee";
import VideoSearchAPI from "./VideoComponent/VideoSearchAPI";

const items=[
    {
        title:"what is React?",
        content: "React is a front end javascript framework."
    },
    {
        title:"why use React?",
        content:"React is a favourite JS library for engineers."
    },
    {
        title:"How do you use React?",
        content:"You use react by creating components."
    }
];
const mystyle={
    color:"red"
}
const option=[
    {
        label:'The Color Red',
        value:'red'
    },
    {
        label:'The Color Green',
        value:'green'
    },
    {
        label:'The Color Blue',
        value:'blue'
    },

];

const showAccordion=()=>{
    if(window.location.pathname === '/'){
       return <Accordion item={items} />
    }
};
const showList=()=>{
    if(window.location.pathname === '/list'){
       return <Search />
    }
}
const showDropDown=()=>{
    if(window.location.pathname === '/dropdown'){
       return <Dropdown />
    }
}
const showTranslate=()=>{
    if(window.location.pathname === '/translate'){
       return <Translate />
    }
}
export default ()=>{
   const [selected,setSelected] =useState(option[0]);
   return (
       <div>
           <VideoSearchAPI />
       </div>
    // <div>
    //     <Header />
    //   <Route path="/">
    //     <Accordion items={items} />
    //   </Route>
    //   <Route path="/list">
    //     <Search />
    //   </Route>
    //   <Route path="/dropdown">
    //     <Dropdown
    //       label="Select a color"
    //       option={option}
    //       selected={selected}
    //       onSelectedChange={setSelected}
    //     />
    //   </Route>
    //   <Route path="/translate">
    //     <Translate />
    //   </Route>
    // </div>
  );
};
//   return(
//       <div>
          {/* <Accordion items={items}/> */}
        //   <Route path="/">
        //     <Accordion items={items}/>
        //   </Route>
          
        //   <Route path="/list">
        //     <Search/>
        //   </Route>
        //   <Route path="/dropdown">
        //     <Dropdown 
        //       label='Select color'
        //       option={option}
        //       selected={selected}
        //       onSelectedChange={setSelected}
        //     />
        //   </Route>
        //   <Route path="/translate">
        //     <Translate />
        //   </Route>
          {/* {showAccordion()}
          {showList()}
          {showDropDown()}
          {showTranslate()} */}
            {/* <Translate /> */}
          
          {/* <Count /> */}
          {/* <Search /> */}
          {/* <Comp1/> */}
          {/* <Accordion items={items}/>
        
          <generate_table /> */}
//       </div>
//   );
// };