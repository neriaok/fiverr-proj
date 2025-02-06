// import { userService } from '../services/user'
import { GigPreview } from './GigPreview'

export function GigList({ gigs}) {

    return (

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