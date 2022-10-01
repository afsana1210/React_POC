import React from "react";
// import Field from './components/field';
// import Languages from './components/languages';
// import Translate from './components/translate';
function getText(){
    return "Click Me";
}
function LanguageTranslator(){
    const labelText="Enter Name";
    return(
        <div>
            <label className="label" htmlFor="name">{labelText}</label>
            <input id="name" type="text"></input>
            <button style={{backgroundColor:"blue",color:"white"}}>
              {getText()}
            </button>
            {/* <Field />
            <Languages />
            <Translate /> */}
        </div>
    )

}
export default LanguageTranslator;