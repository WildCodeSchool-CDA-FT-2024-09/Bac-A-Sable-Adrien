import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  repos: Repo;
  repos_id: Scalars['String']['output'];
};

export type CommentInput = {
  comment: Scalars['String']['input'];
  repos_id: Scalars['String']['input'];
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type LightRepo = {
  __typename?: 'LightRepo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewComment: Comment;
  createNewRepo: Repo;
  deletComment: Scalars['Boolean']['output'];
};


export type MutationCreateNewCommentArgs = {
  data: CommentInput;
};


export type MutationCreateNewRepoArgs = {
  data: RepoInput;
};


export type MutationDeletCommentArgs = {
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  fulllangs: Array<Lang>;
  fullrepos: Array<Repo>;
  lightrepos: Array<LightRepo>;
};


export type QueryFullreposArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type Repo = {
  __typename?: 'Repo';
  comments?: Maybe<Array<Comment>>;
  id: Scalars['ID']['output'];
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  status: Statu;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  isPrivate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Statu = {
  __typename?: 'Statu';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type CreateNewCommentMutationVariables = Exact<{
  data: CommentInput;
}>;


export type CreateNewCommentMutation = { __typename?: 'Mutation', createNewComment: { __typename?: 'Comment', repos_id: string, comment: string } };

export type DeletCommentMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletCommentMutation = { __typename?: 'Mutation', deletComment: boolean };

export type GetFullReposQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFullReposQuery = { __typename?: 'Query', fullrepos: Array<{ __typename?: 'Repo', id: string, name: string, comments?: Array<{ __typename?: 'Comment', comment: string, repos_id: string, id: string }> | null }> };

export type GetOneReposQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetOneReposQuery = { __typename?: 'Query', fullrepos: Array<{ __typename?: 'Repo', name: string, url: string, id: string, langs: Array<{ __typename?: 'Lang', id: number, label: string }>, status: { __typename?: 'Statu', label: string, id: number } }>, fulllangs: Array<{ __typename?: 'Lang', id: number, label: string }> };


export const CreateNewCommentDocument = gql`
    mutation CreateNewComment($data: CommentInput!) {
  createNewComment(data: $data) {
    repos_id
    comment
  }
}
    `;
export type CreateNewCommentMutationFn = Apollo.MutationFunction<CreateNewCommentMutation, CreateNewCommentMutationVariables>;

/**
 * __useCreateNewCommentMutation__
 *
 * To run a mutation, you first call `useCreateNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCommentMutation, { data, loading, error }] = useCreateNewCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCommentMutation, CreateNewCommentMutationVariables>(CreateNewCommentDocument, options);
      }
export type CreateNewCommentMutationHookResult = ReturnType<typeof useCreateNewCommentMutation>;
export type CreateNewCommentMutationResult = Apollo.MutationResult<CreateNewCommentMutation>;
export type CreateNewCommentMutationOptions = Apollo.BaseMutationOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>;
export const DeletCommentDocument = gql`
    mutation DeletComment($id: Float!) {
  deletComment(id: $id)
}
    `;
export type DeletCommentMutationFn = Apollo.MutationFunction<DeletCommentMutation, DeletCommentMutationVariables>;

/**
 * __useDeletCommentMutation__
 *
 * To run a mutation, you first call `useDeletCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletCommentMutation, { data, loading, error }] = useDeletCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeletCommentMutation, DeletCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletCommentMutation, DeletCommentMutationVariables>(DeletCommentDocument, options);
      }
export type DeletCommentMutationHookResult = ReturnType<typeof useDeletCommentMutation>;
export type DeletCommentMutationResult = Apollo.MutationResult<DeletCommentMutation>;
export type DeletCommentMutationOptions = Apollo.BaseMutationOptions<DeletCommentMutation, DeletCommentMutationVariables>;
export const GetFullReposDocument = gql`
    query GetFullRepos($id: String) {
  fullrepos(id: $id) {
    id
    name
    comments {
      comment
      repos_id
      id
    }
  }
}
    `;

/**
 * __useGetFullReposQuery__
 *
 * To run a query within a React component, call `useGetFullReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFullReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFullReposQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFullReposQuery(baseOptions?: Apollo.QueryHookOptions<GetFullReposQuery, GetFullReposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFullReposQuery, GetFullReposQueryVariables>(GetFullReposDocument, options);
      }
export function useGetFullReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFullReposQuery, GetFullReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFullReposQuery, GetFullReposQueryVariables>(GetFullReposDocument, options);
        }
export function useGetFullReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFullReposQuery, GetFullReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFullReposQuery, GetFullReposQueryVariables>(GetFullReposDocument, options);
        }
export type GetFullReposQueryHookResult = ReturnType<typeof useGetFullReposQuery>;
export type GetFullReposLazyQueryHookResult = ReturnType<typeof useGetFullReposLazyQuery>;
export type GetFullReposSuspenseQueryHookResult = ReturnType<typeof useGetFullReposSuspenseQuery>;
export type GetFullReposQueryResult = Apollo.QueryResult<GetFullReposQuery, GetFullReposQueryVariables>;
export const GetOneReposDocument = gql`
    query GetOneRepos($id: String) {
  fullrepos(id: $id) {
    langs {
      id
      label
    }
    name
    status {
      label
      id
    }
    url
    id
  }
  fulllangs {
    id
    label
  }
}
    `;

/**
 * __useGetOneReposQuery__
 *
 * To run a query within a React component, call `useGetOneReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneReposQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneReposQuery(baseOptions?: Apollo.QueryHookOptions<GetOneReposQuery, GetOneReposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneReposQuery, GetOneReposQueryVariables>(GetOneReposDocument, options);
      }
export function useGetOneReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneReposQuery, GetOneReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneReposQuery, GetOneReposQueryVariables>(GetOneReposDocument, options);
        }
export function useGetOneReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneReposQuery, GetOneReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneReposQuery, GetOneReposQueryVariables>(GetOneReposDocument, options);
        }
export type GetOneReposQueryHookResult = ReturnType<typeof useGetOneReposQuery>;
export type GetOneReposLazyQueryHookResult = ReturnType<typeof useGetOneReposLazyQuery>;
export type GetOneReposSuspenseQueryHookResult = ReturnType<typeof useGetOneReposSuspenseQuery>;
export type GetOneReposQueryResult = Apollo.QueryResult<GetOneReposQuery, GetOneReposQueryVariables>;