// import { userService } from '../services/user'
import { GigPreview } from './GigPreview'

export function GigList({ gigs}) {
    
    // function shouldShowActionBtns(gig) {
    //     const user = userService.getLoggedinUser()
        
    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return gig.owner?._id === user._id
    // }

    return (
    // <div>{gigs[0]._id}</div>
    // <div>gig list</div>

    <section className='gig-list-container'>
        <div className='results'>{gigs.length} results</div>
        <ul className="list">
            {gigs.map(gig =>
                <li key={gig._id}>
                    <GigPreview gig={gig}/>
                </li>)
            }
        </ul>
    </section>
    )
}