import { useState } from 'react';
import { levelService } from './Level.service.jsx';
import { getRandomIntInclusive } from '../services/util.service.js';

export function GigPreview({ gig }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isImage = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.jfif'];
    return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const isVideo = (url) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
  };

  const handlePrev = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? gig.imgUrls.length - 1 : currentImageIndex - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex(currentImageIndex === gig.imgUrls.length - 1 ? 0 : currentImageIndex + 1);
  };

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

  return (
    <div className="preview">
      <div className="gig-image-box">
        {isImage(gig.imgUrls[currentImageIndex]) ? (
          <img src={gig.imgUrls[currentImageIndex]} alt="Gig" className="gig-img" />
        ) : isVideo(gig.imgUrls[currentImageIndex]) ? (
          <video
            src={gig.imgUrls[currentImageIndex]}
            controls
            className="gig-img"
          />
        ) : null}

        <label className="prev-btn" onClick={handlePrev}>
          {levelService.leftSign}
        </label>
        <label className="next-btn" onClick={handleNext}>
          {levelService.rightSign}
        </label>

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


      <div className="gig-info">
        <div className="owner-info">
          <img className="owner-img" src={gig.owner.imgUrl} alt="" />
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
  );
}
