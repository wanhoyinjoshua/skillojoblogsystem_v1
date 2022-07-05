import React, { useState,useEffect } from 'react'
import {useParams} from 'react-router-dom'
import Slatejs from "../slate"
import { BaseEditor, Descendant,Range,Transforms, Editor,Element as SlateElement, } from 'slate'
import { useSinglePostQuery} from '../generated/graphql'
import  Cancelbutton  from "../components/cancelbutton"
import Deletebutton from "../components/deletebutton"
const Editpage = () => {
  const {number } =useParams();
  
 

  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'Type away!!' }],
    },
  ]

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
    <div>
      
      {number}
      
      <div>author name of this article </div>
      {data && <input value={title["author"]} onChange={(e)=>{setTitle({title:title["title"],author: e.target.value})}}></input>}
      <div>Title of this article </div>
      {data &&<input   value ={title["title"]} onChange={(e)=>{setTitle({title: e.target.value,author:title["author"]})}}></input>}
      
      <div>Content of the blog</div>
      <Cancelbutton/>
      <Deletebutton id ={number}/>
      <button>Hide</button>
      
     
      {data && <Slatejs value ={JSON.parse(data["articlefeed"][0]["content"])}  id={number} author={title["author"]}  title={title["title"]}  ></Slatejs>}
      
      
      
  </div>
  )
}

export default Editpage