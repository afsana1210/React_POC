import React,{ useState,useEffect,useRef } from "react";


const Dropdown=({label,option,onSelectedChange,selected})=>{
    const [open , setOpen] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        const onBodyClick=(event)=>{
            if(ref.current.contains(event.target)){
                return;
            }
            // console.log(event.target);
            // console.log('BODY CLICK');
            setOpen(false);
        }
        // ,{capture:true});
        document.body.addEventListener('click',onBodyClick);
        return()=>{
            document.body.removeEventListener('click',onBodyClick);
        }; 
    },[]);
    const renderedOptions=option.map((options)=>{ 
        if(options.value === selected.value){
            return null;
        }
        return(
            <div 
              key={options.value} 
              className='item'
              onClick={()=>{
                // console.log('ITEM CLICK');
                onSelectedChange(options)}}
              >
              {options.label}
            </div>
        );
    });
    console.log(ref.current);
    return(
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">
                  {label}
                </label>
                <div onClick={()=>{
                    //  console.log('DROPDOWN CLICK');
                     setOpen(!open)}}
                  className={`ui selection dropdown ${open ? 'visible active': ''}`}>
                    <i className="dropdown icon"></i>
                        <div className="text">{selected.label}</div>
                        <div className={`menu ${open? 'visible transition' : ''}`}>
                            {renderedOptions}
                        </div>
                    
                </div>
            </div>

        </div>
    )
     
}
export default Dropdown;