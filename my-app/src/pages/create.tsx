import React from 'react'
import {useState} from "react"
import {useParams} from 'react-router-dom'
import Slatejs from "../slate"
import  Cancelbutton  from "../components/cancelbutton"
import { useNavigate } from "react-router-dom";
import { BaseEditor, Descendant,Range,Transforms, Editor,Element as SlateElement, } from 'slate'

const Createpage = () => {
  const {number } =useParams();
  const navigate = useNavigate();
  const [title,setTitle]= useState<string>("")
  const [author,setAuthor]= useState<string>("")
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: 'Type away!! and create your blog post!' }],
    },
  ]
  
  return (
    <div>
      
      
      {number}
      <Cancelbutton/>
      <div>author name of this article </div>
      <input onChange={(e)=>{setAuthor(e.target.value)}}></input>
      <div>Title of this article </div>
      <input onChange={(e)=>{setTitle(e.target.value)}}></input>
      
      <div>Content of the blog</div>
      <Slatejs value ={initialValue} id={null} author={author}  title={title}></Slatejs>
      
      
  </div>
  )
}

export default Createpage