import { ReactEditor, RenderElementProps,useSlate,RenderLeafProps,useSlateStatic} from 'slate-react'
import {insertImage} from "../slate"
import axios from 'axios';
import {useCreatearticleMutation} from "../generated/graphql"
import { useUpdatearticleMutation } from '../generated/graphql';
import {QUERY_ARTICLES} from "../components/query"
import { useNavigate ,Link} from "react-router-dom";
import { useState } from 'react';
import Loading from "./loading";
import {serialise} from "../components/tohtml";
import {deserialize} from "../components/toslatejson"

type props ={
  id: string 
  author : string 
  title :string
}
export const SubmitButton = (props:props) => {
    const editor = useSlateStatic()
    const [loading ,setLoading]= useState<boolean>(false)
    const [createarticleMutation, {data }] = useCreatearticleMutation({refetchQueries:[{query:QUERY_ARTICLES},'Articles']});
     const [updatearticleMutation, {  }] = useUpdatearticleMutation({refetchQueries:[{query:QUERY_ARTICLES},'Articles']});

     const navigate = useNavigate();
  
    

    const submitevent = (event) => {
		// const url = URL.createObjectURL(event.target.files[0]);
        var local= localStorage.getItem("content")
        var localcopy = {...JSON.parse(local)};
        var previewimage=[]
        var preview = false

        const arrOfObj1 = Object.values(localcopy);
        console.log(arrOfObj1)
       const forloop = async ()=>{
        console.log("start")
        setLoading(true)
        var finalarray=[]
        for (let i = 0; i < arrOfObj1.length; i++) {
          console.log(i)
            
            if(arrOfObj1[i]["type"]== "image"){

                if(arrOfObj1[i]["url"].includes("blob")){
                    let blob = await fetch(arrOfObj1[i]["url"]).then(r => r.blob());
                
                    const { url } = await fetch("http://localhost:3001/s3Url").then(res => res.json())
                    
                    await fetch(url, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "multipart/form-data"
                        },
                        body: blob
                      })
        
                    let imageUrl = url.split('?')[0]
                    if( preview==false){
                      preview=true
                      previewimage.push(imageUrl)
                      localStorage.setItem("previewimage",imageUrl)
                    }
                    else{
                      console.log("byyeee")
                    }
                    
                    arrOfObj1[i]["url"]=imageUrl
                    console.log(arrOfObj1[i])
                    finalarray.push(arrOfObj1[i])

                
                    

                }
                else{
                    
                    
                    if( preview==false){
                      preview=true
                      previewimage.push(arrOfObj1[i]["url"])
                      localStorage.setItem("previewimage",arrOfObj1[i]["url"])
                    }
                    else{
                      console.log("byyeee")
                    }
                    finalarray.push(arrOfObj1[i])
                    
                }
                
               
            }
            else if(arrOfObj1[i]["type"]== "video"){
              if(arrOfObj1[i]["url"].includes("blob")){
                let blob = await fetch(arrOfObj1[i]["url"]).then(r => r.blob());
            
                const { url } = await fetch("http://localhost:3001/s3Url").then(res => res.json())
                
                await fetch(url, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "multipart/form-data"
                    },
                    body: blob
                  })
    
                let videoUrl = url.split('?')[0]
               
                
                arrOfObj1[i]["url"]=videoUrl
                console.log(arrOfObj1[i])
                finalarray.push(arrOfObj1[i])

            
                

            }
            else{
                finalarray.push(arrOfObj1[i])
                
            }

            }
            else{
                console.log(arrOfObj1[i])
                finalarray.push(arrOfObj1[i])
            }
          }
          console.log("end")
          console.log(finalarray)
          
          console.log(props.id)


        
          // now push to mogodb
          var node ={children : finalarray} 
        var html= serialise(node)

        var html2 =`<p>An opening paragraph with a <a href="https://example.com">link</a> in it.</p>
        <blockquote><p>A wise quote.</p></blockquote>
        <p>A closing paragraph!</p>`

        console.log(html)

        // const document = new DOMParser().parseFromString(html2, 'text/html')
        
        
        // var slateobject = deserialize(document.body)
        // console.log(slateobject)
         
          if(props.id == null || props.id== undefined){
            //creat brandnew 
            await createarticleMutation({ variables: {
              title: props.title,
              content: `${JSON.stringify(finalarray)}`,
              author: props.author,
              previewimage: localStorage.getItem("previewimage"),
              htmlcontent: `${html}`
              
           },})
  
            console.log("done")
            

              navigate("/");

            

           
          }
          else{
            //update exisitng shit.
            console.log("tjis is exisiting mate")
            await updatearticleMutation({variables: {
              updatearticleId: `${props.id}`,
              content: `${JSON.stringify(finalarray)}`,
              title: props.title,
              previewimage: localStorage.getItem("previewimage"),
              author: props.author,
              htmlcontent: `${html}`

           },})
           console.log("done")
           navigate("/");
           
          }
         
          
        }

        forloop()
        //now save to database:

        
        
        // var newcopy=[]
        // var newarray = arrOfObj1.map(async e =>{
            
            
        //     return checkforimagenode(e).then((e)=>{return e})
            
        // });
        
            
            
        // localStorage.setItem("newcpontent",JSON.stringify(newarray))

        
        
        
        
        
    //     const { url } = await fetch("http://localhost:8000/s3Url").then(res => res.json())
    //      console.log(url)

    //    window.alert({url})

        
        
        
        //now i need to search for the image type and then submit the upload the file into database 
        //then i need to uodate the url into the link i get 

        //then i need to save to database 



        // insertImage(editor, url)
        // let blob = await fetch(url).then(r => r.blob());
        // console.log(blob)
        
		
	};
    return (

        <div>
            
             <button onClick={submitevent}>submit</button>
             <Link to="/" onClick={submitevent}>Submit test </Link>
             {loading && <Loading/>}

        </div>
     
    )
  }
