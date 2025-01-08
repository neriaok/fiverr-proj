import React from 'react';
// import { readJsonFile } from './util.service.js'



// Sample gig object as props
export function Gig(gig){
    var gig = {
        _id: 'g101',
        title: 'I will design your logo',
        price: 12.16,
        owner: {
            _id: 'u101',
            fullname: 'Dudu Da',
            imgUrl: 'url',
            level: 'basic/premium',
            rate: 4,
        },
        daysToMake: 3,
        description: 'Make unique logo...',
        avgResponseTime: 1,
        loc: 'Ghana',
        imgUrls: ['/img/img1.jpg'],
        tags: ['Arts And Crafts', 'Logo Design'],
        likedByUsers: ['mini-user'],
        reviews: [
            {
                id: 'madeId',
                txt: 'Did an amazing work',
                rate: 4,
                by: {
                    _id: 'u102',
                    fullname: 'user2',
                    imgUrl: '/img/img2.jpg',
                },
            },
        ],
    }
    return (
        <div className="gig-gigd">
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
      );
    }

