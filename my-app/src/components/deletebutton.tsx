import { click } from '@testing-library/user-event/dist/click';
import React from 'react'

import { useDeletearticleMutation } from '../generated/graphql';
import { useNavigate } from "react-router-dom";
import { confirm } from "react-confirm-box";
import {QUERY_ARTICLES} from "../../src/components/query"

const Deletebutton = (props) => {

     const [deletearticleMutation, { data, loading, error }] = useDeletearticleMutation({
       variables: {
          deletearticleId: props.id// value for 'deletearticleId'
       },refetchQueries:[{query:QUERY_ARTICLES},'Articles']
     })
     const navigate = useNavigate();
     async function deletearticle (){

        const result =await  confirm("Are you sure?");

        if (result){

            await deletearticleMutation()
        console.log("succesffully deleted")
        navigate("/")

        }
        else{
            console.log("ok")
        }
        

     }
  return (
    <button onClick={deletearticle}>Delete this article </button>
  )
}

export default Deletebutton