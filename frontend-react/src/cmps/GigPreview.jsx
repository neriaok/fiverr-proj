// import { Link } from 'react-router-dom'
// import { svgService } from '../services/svg.service'
import {getRandomIntInclusive} from '../services/util.service.js'

export function GigPreview({ gig }) {
  var ownerLevel = gig.owner.level == 'Top Rated'? "topRated" : "owner-level"
  var rendRateNum = ` (${getRandomIntInclusive(50 , 900)})`
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
              <p>Ad by <span className="owner-name">{gig.owner.fullname}</span></p>
              <p className= {ownerLevel}>{gig.owner.level}{<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="#E4E5E7"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z"/></svg>}</p>
            </div>
    
            {/* Third Line: Title */}
            <p className="gig-title">{gig.title}</p>
    
            {/* Fourth Line: Rating */}
            <p className="gig-rate"><svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"/></svg> {gig.owner.rate} <span className='ratesNum'> {rendRateNum}</span> </p>
    
            {/* Fifth Line: Price */}
            <p className="gig-price">From ${gig.price}</p>
          </div>
        </div>
        
    )
}