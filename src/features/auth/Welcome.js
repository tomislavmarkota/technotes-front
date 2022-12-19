import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

    const { username, isUser, isAdmin } = useAuth()


    const content = (
        <section className="welcome">

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/posts">View all posts</Link></p>

            <p><Link to="/dash/posts/new">Add New Post</Link></p>

            {isAdmin && <p><Link to="/dash/posts/approval">Waiting on approval</Link></p>}

        </section>
    )

    return content
}
export default Welcome