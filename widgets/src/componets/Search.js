import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

const Search=()=>{
    const [term , setTerm]=useState('programming');
    const [result,setResult]=useState([]);

    console.log("Result",result);
    console.log("I run with every render")

    //empty data passed it run once at initial render
    
    // useEffect(()=>{
    //     console.log("I run once")
    // },[]);

    //nothing passed then it run with every render and at initial render
    // useEffect(()=>{
    //     console.log("I run with evry render and at inital rended")
    // });

    //passed [data] it will render at initial render and run after every render if data has changed since last render
        // useEffect(()=>{
        //     console.log("I run with evry render and at inital rended whever terms changed")
        // },[term]);


        // useEffect(()=>{
        //     const search= async ()=>{
        //      await axios.get("scbjdv");
        //     };
        //     search();
        // },[term]);


        // useEffect(()=>{
        //     (async ()=>{
        //       await axios.get("scbjdv");
        //     })();//immediate invoke function
        // },[term]);

        // useEffect(()=>{
        //      axios.get("scbjdv")
        //      .then((response)=>{
        //        console.log(response.data);
        //      });
        // },[term]);

        useEffect(()=>{
            const search= async ()=>{
               const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
                   params:{
                       action: 'query',
                       list : 'search',
                       origin : '*',
                       format: 'json',
                       srsearch: term
                   },
               }) ;
               setResult(data.query.search);
            };
            if(term && !result.length){
                search();
            }else{
                const timeoutId= setTimeout(()=>{
                    if(term){
                        search();
                    }
                },1000);
                return()=>{
                    clearTimeout(timeoutId);
                }
            }
                  
        },[term]);
        const renderedResults = result.map((results)=>{
            return(
                <div key={results.pageid} className='item'>
                    <div className="right floated button">
                        <a
                          className="ui button"
                          href={`https://en.wikipedia.org?curid=${results.pageid}`}
                         >
                            Go
                        </a>
                    </div>
                    <div className="content">
                    <div className="header">
                      {results.title}
                    </div>
                     <span dangerouslySetInnerHTML={{__html:results.snippet}}></span>
                    </div>
                </div>

            )
            

        })
 return(
    <div>
        <div className="ui form">
                <div className="field">
                    <label>Enter search Term</label>
                    <input
                    className="input"
                    value={term}
                    onChange={(e)=>{setTerm(e.target.value)}}
                    />
                </div>
        </div>
        <div className="ui celled list">
            {renderedResults}
        </div>
     
    </div>
 );
}

export default Search;