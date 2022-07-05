import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components"

const Row = (props) => {
  const RowWrapper = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  width: 100px;
  height:auto
  
  
  `
  const Previewimage =styled.img`
  width:100%
  `
  return (
    <>
     <Link to = {`/posts/edit/${props.id}`}>
    <RowWrapper>
      <Previewimage src={props.imagepreview}></Previewimage>
    {props.title}
    <div>{props.author}</div> 
    </RowWrapper>
    </Link>
 
    
    
    </>
  )
}

export default Row