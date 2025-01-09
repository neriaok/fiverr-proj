import { Link } from 'react-router-dom'

export function GigPreview({ gig }) {
    return(

    <div className="preview">
          {/* Gig image */}
          <div className="gig-image">
            <img src={gig.imgUrls[0]} alt="Gig" className="gig-img" />
          </div>
    
          {/* Gig Details */}
          <div className="gig-info">
            {/* Second Line: Owner Full Name and Level */}
            <div className="owner-info">
              <p className="owner-level">{gig.owner.level}</p>
              <p className="owner-name">{gig.owner.fullname}</p>
            </div>
    
            {/* Third Line: Title */}
            <h2 className="gig-title">{gig.title}</h2>
    
            {/* Fourth Line: Rating */}
            <p className="gig-rate">{gig.owner.rate} ⭐</p>
    
            {/* Fifth Line: Price */}
            <p className="gig-price">${gig.price}</p>
          </div>
        </div>
        
    )
}