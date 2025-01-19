import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { levelService } from './Level.service.jsx';
import { getRandomIntInclusive } from '../services/util.service.js';

export function GigPreview({ gig }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper function to check if the URL is an image
  const isImage = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.jfif'];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  // Helper function to check if the URL is a video
  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  // Navigate to the previous image/video
  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Navigate to the next image/video
  const handleNext = () => {
    if (currentImageIndex < gig.imgUrls.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  // Determine the owner's level and corresponding icon
  const ownerLevel = gig.owner.level === 'Top Rated' ? 'topRated' : 'owner-level';
  const rendRateNum = ` (${getRandomIntInclusive(10, 900)})`;

  const setIcon = (level) => {
    switch (level) {
      case 'Top Rated':
        return levelService.topRateSign;
      case 'Level 2':
        return levelService.level2Sign;
      default:
        return levelService.level1Sign;
    }
  };

  const ownerLevelIcon = setIcon(gig.owner.level);

  // Ensure there are valid images/videos before rendering
  const currentUrl = gig.imgUrls[currentImageIndex];
  const toLink = `/gig/:${gig._id}`

  return (
    <NavLink to = {toLink}>
    <div className="preview">
      <div className="gig-image-box">
        {isImage(currentUrl) ? (
          <img
            src={currentUrl}
            alt="Gig"
            className="gig-img"
            loading="lazy" // Adds lazy loading for performance
          />
        ) : isVideo(currentUrl) ? (
          <video
            src={currentUrl}
            controls
            className="gig-img"
            aria-label="Gig video"
          />
        ) : (
          <div className="no-media">No valid media available</div> // In case there is no image/video
        )}

        {/* Conditionally render previous button */}
        {currentImageIndex > 0 && (
          <label className="prev-btn" onClick={handlePrev} aria-label="Previous image">
            {levelService.leftSign}
          </label>
        )}

        {/* Conditionally render next button */}
        {currentImageIndex < gig.imgUrls.length - 1 && (
          <label className="next-btn" onClick={handleNext} aria-label="Next image">
            {levelService.rightSign}
          </label>
        )}

        {/* Image Navigation Points */}
        <div className="points">
          {gig.imgUrls.map((_, index) => (
            <svg
              key={index}
              width="9"
              height="9"
              viewBox="0 0 10 10"
              xmlns="http://www.w3.org/2000/svg"
              className={`point ${currentImageIndex === index ? 'active' : ''}`}
            >
              <circle cx="5" cy="5" r="4" stroke="gray" strokeWidth="0.4" fill={currentImageIndex === index ? 'white' : '#bbb8b8b8'} />
            </svg>
          ))}
        </div>
      </div>

      {/* Gig Info Section */}
      <div className="gig-info">
        <div className="owner-info">
          <img className="owner-img" src={gig.owner.imgUrl} alt={gig.owner.fullname} />
          <p className="ad-by">
            Ad by <span className="owner-name">{gig.owner.fullname}</span>
          </p>
          <p className={ownerLevel}>
            {gig.owner.level}
            {ownerLevelIcon}
          </p>
        </div>

        <p className="gig-title">{gig.title}</p>

        <p className="gig-rate">
          {levelService.blackStar} {gig.owner.rate} <span className="ratesNum">{rendRateNum}</span>
        </p>

        <p className="gig-price">From ${gig.price}</p>
      </div>
    </div>
    </NavLink>
  );
}
