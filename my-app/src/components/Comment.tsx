import React from 'react'
import {useSinglePostQuery,useMutationMutation} from "../generated/graphql"
import {useState,useEffect} from 'react'
import { idText } from 'typescript'
import {QUERY_SINGLE_ARTICLE} from './query'

type props ={
    number1  : string
}
interface Comments {
	[index: number]: {
    	id: string;
      	title: string;
      	articleid: string;
    }
}
function Comment ({number1}:props){
    const [state,setState]= useState("hi")
    const [fresh,setFresh]= useState(false)
    const [comments,setComment]=useState<{id: string; title: string, articleid:string}[]>([])

    useEffect(()=>{
        if(data){
            setComment(data.comment)
        }


    })

    const { data, fetchMore, networkStatus, } = useSinglePostQuery({
        variables: {
          articleidarg:String(number1) ,
          cursor:
          String(number1),
          take:1,
          
            
         },
       });
  

           const [mutationMutation, {  }] = useMutationMutation({
            variables: {
                title: state,
                arrticleid: number1
             },refetchQueries:[{query: QUERY_SINGLE_ARTICLE},'SinglePost']
         
        

       });

       


async function  Update(){

setFresh(!fresh)
let newitem ={id: "new", title:"new",articleid:"haahah"}
// let newcomment =comments.push(newitem)


await  mutationMutation();

{data && data.comment && setComment(data?.comment)}







}
// const renderList = comments.map((item, index) => 
//                              <div key={index}>{item.title}</div>
//                            );
      
  return (
    <>
    {comments.length}
    {comments.map(x=>(<div id= {x.id}>{x.title}</div>))}


    


<strong><button onClick={e=>{Update()}}>Add comment </button></strong>
<input type="text" value={state} onChange={e=>{setState(e.target.value)}} />
    </>
  )
}

export default Comment