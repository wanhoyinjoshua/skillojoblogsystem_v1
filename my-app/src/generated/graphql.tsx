import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Articles = {
  __typename?: 'Articles';
  author: Scalars['String'];
  content: Scalars['String'];
  htmlcontent: Scalars['String'];
  id: Scalars['String'];
  previewimage: Scalars['String'];
  title: Scalars['String'];
};

export type Comments = {
  __typename?: 'Comments';
  articleid: Scalars['String'];
  id: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createarticle: Articles;
  deletearticle: Articles;
  post: Comments;
  updatearticle: Articles;
};


export type MutationCreatearticleArgs = {
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  htmlcontent?: InputMaybe<Scalars['String']>;
  previewimage?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationDeletearticleArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationPostArgs = {
  arrticleid?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdatearticleArgs = {
  author?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  htmlcontent?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  previewimage?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  articlefeed: Array<Articles>;
  comment: Array<Comments>;
};


export type QueryArticlefeedArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryCommentArgs = {
  articleidarg?: InputMaybe<Scalars['String']>;
};

export type ArticlesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articlefeed: Array<{ __typename?: 'Articles', id: string, title: string, author: string, previewimage: string }> };

export type SinglePostQueryVariables = Exact<{
  articleidarg?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['String']>;
}>;


export type SinglePostQuery = { __typename?: 'Query', comment: Array<{ __typename?: 'Comments', id: string, title: string, articleid: string }>, articlefeed: Array<{ __typename?: 'Articles', id: string, title: string, content: string, author: string, htmlcontent: string }> };

export type MutationMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  arrticleid?: InputMaybe<Scalars['String']>;
}>;


export type MutationMutation = { __typename?: 'Mutation', post: { __typename?: 'Comments', id: string, title: string, articleid: string } };

export type CreatearticleMutationVariables = Exact<{
  htmlcontent?: InputMaybe<Scalars['String']>;
  previewimage?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
}>;


export type CreatearticleMutation = { __typename?: 'Mutation', createarticle: { __typename?: 'Articles', title: string, content: string, author: string, previewimage: string } };

export type UpdatearticleMutationVariables = Exact<{
  updatearticleId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  previewimage?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  htmlcontent?: InputMaybe<Scalars['String']>;
}>;


export type UpdatearticleMutation = { __typename?: 'Mutation', updatearticle: { __typename?: 'Articles', title: string, id: string, content: string, author: string, previewimage: string, htmlcontent: string } };

export type DeletearticleMutationVariables = Exact<{
  deletearticleId?: InputMaybe<Scalars['String']>;
}>;


export type DeletearticleMutation = { __typename?: 'Mutation', deletearticle: { __typename?: 'Articles', title: string, id: string } };


export const ArticlesDocument = gql`
    query Articles($cursor: String, $take: Int, $skip: Int) {
  articlefeed(cursor: $cursor, take: $take, skip: $skip) {
    id
    title
    author
    previewimage
  }
}
    `;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export const SinglePostDocument = gql`
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
    `;

/**
 * __useSinglePostQuery__
 *
 * To run a query within a React component, call `useSinglePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSinglePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSinglePostQuery({
 *   variables: {
 *      articleidarg: // value for 'articleidarg'
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSinglePostQuery(baseOptions?: Apollo.QueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, options);
      }
export function useSinglePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SinglePostQuery, SinglePostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SinglePostQuery, SinglePostQueryVariables>(SinglePostDocument, options);
        }
export type SinglePostQueryHookResult = ReturnType<typeof useSinglePostQuery>;
export type SinglePostLazyQueryHookResult = ReturnType<typeof useSinglePostLazyQuery>;
export type SinglePostQueryResult = Apollo.QueryResult<SinglePostQuery, SinglePostQueryVariables>;
export const MutationDocument = gql`
    mutation Mutation($title: String, $arrticleid: String) {
  post(title: $title, arrticleid: $arrticleid) {
    id
    title
    articleid
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      title: // value for 'title'
 *      arrticleid: // value for 'arrticleid'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const CreatearticleDocument = gql`
    mutation Createarticle($htmlcontent: String, $previewimage: String, $title: String, $content: String, $author: String) {
  createarticle(
    htmlcontent: $htmlcontent
    previewimage: $previewimage
    title: $title
    content: $content
    author: $author
  ) {
    title
    content
    author
    previewimage
  }
}
    `;
export type CreatearticleMutationFn = Apollo.MutationFunction<CreatearticleMutation, CreatearticleMutationVariables>;

/**
 * __useCreatearticleMutation__
 *
 * To run a mutation, you first call `useCreatearticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatearticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createarticleMutation, { data, loading, error }] = useCreatearticleMutation({
 *   variables: {
 *      htmlcontent: // value for 'htmlcontent'
 *      previewimage: // value for 'previewimage'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      author: // value for 'author'
 *   },
 * });
 */
export function useCreatearticleMutation(baseOptions?: Apollo.MutationHookOptions<CreatearticleMutation, CreatearticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatearticleMutation, CreatearticleMutationVariables>(CreatearticleDocument, options);
      }
export type CreatearticleMutationHookResult = ReturnType<typeof useCreatearticleMutation>;
export type CreatearticleMutationResult = Apollo.MutationResult<CreatearticleMutation>;
export type CreatearticleMutationOptions = Apollo.BaseMutationOptions<CreatearticleMutation, CreatearticleMutationVariables>;
export const UpdatearticleDocument = gql`
    mutation Updatearticle($updatearticleId: String, $title: String, $content: String, $previewimage: String, $author: String, $htmlcontent: String) {
  updatearticle(
    id: $updatearticleId
    title: $title
    content: $content
    previewimage: $previewimage
    author: $author
    htmlcontent: $htmlcontent
  ) {
    title
    id
    content
    author
    previewimage
    htmlcontent
  }
}
    `;
export type UpdatearticleMutationFn = Apollo.MutationFunction<UpdatearticleMutation, UpdatearticleMutationVariables>;

/**
 * __useUpdatearticleMutation__
 *
 * To run a mutation, you first call `useUpdatearticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatearticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatearticleMutation, { data, loading, error }] = useUpdatearticleMutation({
 *   variables: {
 *      updatearticleId: // value for 'updatearticleId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      previewimage: // value for 'previewimage'
 *      author: // value for 'author'
 *      htmlcontent: // value for 'htmlcontent'
 *   },
 * });
 */
export function useUpdatearticleMutation(baseOptions?: Apollo.MutationHookOptions<UpdatearticleMutation, UpdatearticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatearticleMutation, UpdatearticleMutationVariables>(UpdatearticleDocument, options);
      }
export type UpdatearticleMutationHookResult = ReturnType<typeof useUpdatearticleMutation>;
export type UpdatearticleMutationResult = Apollo.MutationResult<UpdatearticleMutation>;
export type UpdatearticleMutationOptions = Apollo.BaseMutationOptions<UpdatearticleMutation, UpdatearticleMutationVariables>;
export const DeletearticleDocument = gql`
    mutation Deletearticle($deletearticleId: String) {
  deletearticle(id: $deletearticleId) {
    title
    id
  }
}
    `;
export type DeletearticleMutationFn = Apollo.MutationFunction<DeletearticleMutation, DeletearticleMutationVariables>;

/**
 * __useDeletearticleMutation__
 *
 * To run a mutation, you first call `useDeletearticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletearticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletearticleMutation, { data, loading, error }] = useDeletearticleMutation({
 *   variables: {
 *      deletearticleId: // value for 'deletearticleId'
 *   },
 * });
 */
export function useDeletearticleMutation(baseOptions?: Apollo.MutationHookOptions<DeletearticleMutation, DeletearticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletearticleMutation, DeletearticleMutationVariables>(DeletearticleDocument, options);
      }
export type DeletearticleMutationHookResult = ReturnType<typeof useDeletearticleMutation>;
export type DeletearticleMutationResult = Apollo.MutationResult<DeletearticleMutation>;
export type DeletearticleMutationOptions = Apollo.BaseMutationOptions<DeletearticleMutation, DeletearticleMutationVariables>;