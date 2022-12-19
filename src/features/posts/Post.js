import { useGetPostsQuery } from './postsApiSlice'
import { memo } from 'react'

const Post = ({noteId}) => {

    const { data:post } = useGetPostsQuery()


    if (post) {
        return (
            <div>Post id : {noteId}</div>
        )

    } else return null
}

const memoizedNote = memo(Post)

export default memoizedNote