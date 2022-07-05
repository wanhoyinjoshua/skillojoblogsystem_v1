//this  is where the apollo client will generate the react hook from running npm run codegen
//the react hooks can be used by importing it from /generated/graphql.tsx

import { gql } from '@apollo/client';

// export const QUERY_LAUNCH_LIST = gql`
//   query Books($cursor: String, $first: Int!) {
//   books(cursor: $cursor, first: $first) {
//     books {
//       id
//       title
//       author
//     }
//     hasNextPage
//   }
// }
// `;


export const QUERY_ARTICLES = gql`
  query Articles($cursor: String, $take: Int, $skip: Int) {
    articlefeed(cursor:$cursor,take:$take, skip:$skip) {
    id
    title
    author
    previewimage
    
  }
  
}
`;
export const QUERY_SINGLE_ARTICLE = gql`

query SinglePost($articleidarg: String, $skip: Int, $take: Int, $cursor: String) {
  comment(articleidarg: $articleidarg) {
    id
    title
    articleid
  }
  articlefeed(skip: $skip, take: $take, cursor: $cursor) {
    id
    title
    content
    author
    htmlcontent

  }
}

`



export const ADD_COMMENT = gql`

mutation Mutation($title: String, $arrticleid: String) {
  post(title: $title, arrticleid: $arrticleid) {
    id
    title
    articleid
  }
}

`


export const CREATE_ARTICLE = gql`

mutation Createarticle($htmlcontent: String,$previewimage: String,$title: String, $content: String, $author: String) {
  createarticle(htmlcontent: $htmlcontent,previewimage: $previewimage,title: $title, content: $content, author:$author) {
    title
    content
    author
    previewimage
    
  }
}

`

export const UPDATE_ARTICLE =gql`

mutation Updatearticle($updatearticleId: String, $title: String, $content: String, $previewimage: String, $author: String, $htmlcontent: String) {
  updatearticle(id: $updatearticleId, title: $title, content: $content, previewimage: $previewimage, author: $author, htmlcontent: $htmlcontent) {
    title
    id
    content
    author
    previewimage
    htmlcontent
  }
}



`


export const DELETE_ARTICLE = gql`

mutation Deletearticle($deletearticleId: String) {
  deletearticle(id: $deletearticleId) {
    title
    
    id
  }
}


`



