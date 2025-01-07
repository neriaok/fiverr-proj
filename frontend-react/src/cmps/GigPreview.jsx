import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return <article className="preview">
        <header>
            <Link to={`/gig/${gig._id}`}>{gig.vendor}</Link>
        </header>

        <p>Speed: <span>{gig.speed.toLocaleString()} Km/h</span></p>
        {gig.owner && <p>Owner: <span>{gig.owner.fullname}</span></p>}
        
    </article>
}