import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AppRoute(){
    const user = useSelector(storeState => storeState.userModule.user)

    return(
        <div className='routs'>
        <NavLink to="about">About</NavLink>
        <NavLink to="gigs">Gigs</NavLink> {/* gigs = gig*/}
        <NavLink to="chat">Chat</NavLink>
        <NavLink to="review">Review</NavLink>

        {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
        </div>
    )
}