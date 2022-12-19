import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const postsAdapter = createEntityAdapter({})

const initialState = postsAdapter.getInitialState()

export const postsApiSlice = apiSlice.injectEndpoints({
         endpoints: builder => ({
             getPosts: builder.query({
                 query: () => ({
                     url: '/posts',
                     validateStatus: (response, result) => {
                         return response.status === 200 && !result.isError
                     }
                 }),
                 transformResponse: responseData => {
                    const loadedPosts = responseData.map(post => {
                        post.id = post._id
                        return post
                    });
                    return postsAdapter.setAll(initialState, loadedPosts)
                },
                providesTags: (result, error, arg) => {
                    if (result?.ids) {
                        return [
                            { type: 'Post', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'Post', id }))
                        ]
                    } else return [{ type: 'Post', id: 'LIST' }]
                }
             }),
             addNewPost: builder.mutation({
                 query: initialPost => ({
                     url: '/posts',
                     method: 'POST',
                     body: {
                         ...initialPost,
                     }
                 }),
                 invalidatesTags: [
                     { type: 'Post', id: "LIST" }
                 ]
             })
         })
     })
     export const {
         useGetPostsQuery,
         useAddNewPostMutation
     } = postsApiSlice

     export const selectPostsResult = postsApiSlice.endpoints.getPosts.select()
    

     const selectPostsData = createSelector(
         selectPostsResult,
         postsResult => postsResult.data // normalized state object with ids & entities
     )
  
     export const {
         selectAll: selectAllPosts,
         selectById: selectPostById,
         selectIds: selectPostIds
         // Pass in a selector that returns the posts slice of state
     } = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)

