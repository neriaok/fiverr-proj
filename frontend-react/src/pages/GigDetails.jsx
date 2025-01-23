import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { levelService } from '../services/level.service.js'
import { levelIcons } from '../cmps/LevelIcons.jsx'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig, addGigMsg } from '../store/actions/gig.actions.js'
import { OrderGig } from '../cmps/OrderGig.jsx'


export function GigDetails() {

  const { gigId } = useParams()
  const clearGigId = gigId.replace(":", "")

  const gig = useSelector(storeState => storeState.gigModule.gig)
  const loading = useSelector(storeState => storeState.gigModule.loading)

  useEffect(() => {
    loadGig(clearGigId)
  }, [clearGigId])

  async function onAddGigMsg(gigId) {
    try {
      await addGigMsg(gigId, 'bla bla ' + parseInt(Math.random() * 10))
      showSuccessMsg(`Gig msg added`)
    } catch (err) {
      showErrorMsg('Cannot add gig msg')
    }
  }

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

  if (loading) return <div>Loading...</div>

  if (!gig) return <div>Wait a second..</div>

  const ownerLevelIcon = levelService.setIcon(gig.owner.level);
  const ownerLevel = gig.owner.level === 'Top Rated' ? 'topRated' : 'owner-level';
  const currentUrl = gig.imgUrls[currentImageIndex];

  return (
    <div className="details-container">
      <h1 className='black'>{gig.title}</h1>
      <div className="card-details">
        <img className='owner-img' src={gig.owner.imgUrl} alt="" />
        <div className="gig-info">
          <div className='flex-info'>
            <p>{gig.owner.fullname}</p>
            <p className={ownerLevel}>{gig.owner.level}{ownerLevelIcon}</p><span className='gray'>|</span>
            <p className='gray'>{gig.reviews.length} orders in queue</p>
          </div>
          <p>{gig.owner.rate} <span className='gray'>35 reviews</span></p>
        </div>
      </div>
      <div className="gig-gallery-container">
        <div className="white-background">
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
              <div className="no-media">No valid media available</div>
            )}

            <label className="prev-btn" onClick={handlePrev} aria-label="Previous image">
              {levelIcons.leftSign}
            </label>

            <label className="next-btn" onClick={handleNext} aria-label="Next image">
              {levelIcons.rightSign}
            </label>
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="thumbnail-container">
          <div className="thumbnail-gallery">
            {gig.imgUrls.map((url, index) => (
              <div
                key={index}
                className={`thumbnail-item ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`thumbnail-img ${currentImageIndex === index ? 'highlight' : ''}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="reviews-container">
        <h2 className="reviews-title">What people loved about this freelancer</h2>
        <p className='review'>{gig.reviews[0].txt}</p>

      </div>
      {/* About this gig Section */}
      <div className="about-this-gig">
        <h2 className="section-title">About this gig</h2>

        {/* Example structure rendering */}
        <p>************ {gig.aboutThisGig?.overview} ************</p>

        <h3>My Services:</h3>
        <ul>
          {gig.aboutThisGig?.services?.map((service, index) => (
            <li key={index}>• {service}</li>
          ))}
        </ul>

        <h3>You will get:</h3>
        <ul>
          {gig.aboutThisGig?.deliverables?.map((deliverable, index) => (
            <li key={index}>• {deliverable}</li>
          ))}
        </ul>

        <h3>Why me:</h3>
        <ul>
          {gig.aboutThisGig?.whyMe?.map((reason, index) => (
            <li key={index}>• {reason}</li>
          ))}
        </ul>

        <h3>Note:</h3>
        <p>{gig.aboutThisGig?.note}</p>

        <h3>Thank You:</h3>
        <p>{gig.aboutThisGig?.thankYou}</p>
      </div>

      {/* Add Gig Message */}
      {/* <button onClick={() => onAddGigMsg(gig._id)}>Add Gig Message</button> */}
    </div>
  )
}
