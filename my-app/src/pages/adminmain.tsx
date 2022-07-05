import React, { useEffect, useState } from 'react'
import Slatejs from "../slate"
import {ArticlesQuery, useArticlesQuery} from "../generated/graphql"
import Row from "../components/Row"
import { Link } from 'react-router-dom';
function  Main () {
    //make a use effect here 


   
      const [data1,setData]= useState<ArticlesQuery>()

      const { data, fetchMore, networkStatus, } = useArticlesQuery({
        variables: {
            
            take:100,
            skip:0
            
         },
       });
       

      

  return (
    <>
    {JSON.stringify(data)}
    
    <br></br>
    {data && data.articlefeed.length}
    <div>{data && data.articlefeed && data.articlefeed.map(x=>(<Row id= {x.id} title={x.title} author ={x.author} imagepreview ={x.previewimage}/>))}</div>
    <Link to = {`/posts/create`}> Create page </Link>
    </>
    
    // <Slatejs value={}></Slatejs>
  )
}

export default Main