import React from 'react'


import logo from './logo.svg';
import { useRef,useEffect,useState } from 'react';


import '../App.css';
import '../mobile.css'

import {useArticlesQuery} from "../generated/graphql"
import Card from "../components/Card"



import {NetworkStatus} from '@apollo/client';
import CSS from 'csstype';
import { json } from 'stream/consumers';

const buttonStyles: CSS.Properties = {
  display: 'none'
  
};


function Publichome() {

  const listInnerRef = useRef<HTMLDivElement>(null);
  const buttonref = useRef<HTMLButtonElement>(null);
  const [count,setCount] = useState(0)
  const [disable, setDisable] = useState(false);
  let options = {
    root: null,
    rootMargin: "100px",
    threshold: 1
  };


useEffect(()=>{
  // console.log(listInnerRef)
  
  console.log("useeffect")
  const observer =new IntersectionObserver((entries)=>{
    const entry = entries[0]
    
    if(entry.isIntersecting===true &&data  && networkStatus !== NetworkStatus.fetchMore){
      console.log("in")
      // this is the problem, I cant put fetchmore here 
      // for example if i put fetchmore(....), it will just blowup.

      
      


      // buttonref.current?.click()
      
      
      
      
      setTimeout(() => {  setDisable(false); }, 2000);
      
      
      
    }
      
     
      
    
  },options)



  if (listInnerRef.current){
    observer.observe(listInnerRef.current)
    

  }
  
})


  const { data, fetchMore, networkStatus, } = useArticlesQuery({
   variables: {
       
       take: 2,
       
    },
  });

  

  if (!data || !data) {
    return <div>"loading</div>;
  }

  //call this function when button is clicked
  const load = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDisable(true)
    
    

    
    fetchMore({
      variables: {
        first: 2,
        cursor:
          data.articlefeed[data.articlefeed.length - 1].id,
          skip:1
      },
      updateQuery: (pv, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return pv;
        }
        if ([...pv.articlefeed]==[...fetchMoreResult.articlefeed]) {
          return pv;
        }
        

        return {
          
            __typename: "Query",
            articlefeed: Array.from(new Set([
              ...pv.articlefeed,
              ...fetchMoreResult.articlefeed
            ])),
            
          
        };
      }
    })

    setCount(data.articlefeed.length)
  };



  return (
    <>
    
     <main ref={listInnerRef} id='content' className='content' >
        <div className='wraps'>
          <div  className='grid' >
            <div >
              {data.articlefeed.map(x=>(<Card preview={x.previewimage} id= {x.id} title={x.title} author={x.author}/>))}
              {/* {JSON.stringify(data)} */}
              
              <button ref={buttonref} disabled={disable}onClick={load}>Load more</button>
              
              
          
              
            </div>
          </div>
          
        </div>
        {/* {networkStatus === 3 && data.books.hasNextPage&& <div className='loadinginfinitescroll'></div>}
        {!data?.books.hasNextPage && <div>the end</div>} */}
        
      </main>

      {<div ref={listInnerRef}>{`Target for infinite scroll`}</div>}
      
    
      
    </>
  )
}




export default Publichome