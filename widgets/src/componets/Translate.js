import react,{useState} from "react";
import Convert from "./Convert";
import Dropdown from './Dropdown';



const option=[
    {
        label:'Africa',
        value:'af'
    },
    {
        label:'Hindi',
        value:'hi'
    },
    {
        label:'Arabic',
        value:'ar'
    },

]

const Translate=()=>{
    const [language,setLanguage]=useState(option[0]);
    const [Text,setText]=useState('');
   return(
       <div>
           <div className="ui form">
               <div className="field">
                   <label>Enter Text</label>
                   <input value={Text} onChange={(e)=>setText(e.target.value)}></input>
               </div>
           </div>
           <Dropdown
            label='Select a language'
            selected={language}
            onSelectedChange={setLanguage}
            option={option}/>
            <hr />
            <h3 className="=ui header">Output</h3>
            <Convert text={Text} language={language}/>
       </div>
   );
}

export default Translate;
