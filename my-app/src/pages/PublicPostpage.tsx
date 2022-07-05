
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'

import Comment from '../components/Comment'



import {ArticleWrapper} from "../style"


import axios from "axios"





import {useSinglePostQuery,useMutationMutation} from "../generated/graphql"

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../index.css';
import { json } from 'stream/consumers'





function PublicPostpage() {
  const {number } =useParams();



  
 



   const { data, loading, error } = useSinglePostQuery({
     variables: {
        cursor: `${number}`
        
        
        
     },
   });

   const [title,setTitle]= useState<Object>({title:"",author:""})
   const [author,setAuthor]= useState<string>("loading")

  
   
   useEffect(() => {
    // Update the document title using the browser API
  
    
    {data && setTitle({title:data["articlefeed"][0]["title"],author:data["articlefeed"][0]["author"]})}
    
    console.log(title)
  },[data]);


       

     
  return (
    <>
    <ArticleWrapper>
    <article >
      <h1>{data && data["articlefeed"][0]["title"]}</h1>
    
    {data && data["articlefeed"][0]["author"]}
    <br>
    </br>
    <br></br>
   
    {data && <div dangerouslySetInnerHTML={{ __html: data["articlefeed"][0]["htmlcontent"] }} />}
    
     
    </article>
    <Comment number1={number}></Comment>  
    </ArticleWrapper>
    
{/* {data && <Slatejs value ={JSON.parse(data["articlefeed"][0]["content"])}  id={number} author={title["author"]}  title={title["title"]}  ></Slatejs>} */}
    
    </>
   
      
     
    

  )
}



export default PublicPostpage