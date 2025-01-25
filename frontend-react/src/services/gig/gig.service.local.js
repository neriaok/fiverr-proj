
import { storageService } from '../async-storage.service'
import { makeId , loadFromStorage , saveToStorage } from '../util.service'
import { userService } from '../user'
// localStorage.clear()
const STORAGE_KEY = 'gig'

_createGigs()
query()
console.log(query({tag: 'logo design'}))
export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = { txt: '', price: 0, tag: '', deliveryTime: '' }) {
  let gigs;

  try {
      gigs = await storageService.query(STORAGE_KEY); // Fetch gigs from storage or API
  } catch (error) {
      console.error('Error fetching gigs:', error);
      return [];
  }

  const { txt, price, tag, deliveryTime } = filterBy;

  // Creating regex for txt and tag filter if they exist
  const txtRegex = txt ? new RegExp(txt, 'i') : null;
  const tagRegex = tag ? new RegExp(tag, 'i') : null;

  gigs = gigs.filter(gig => {
      // Check if 'txt' is in the owner's fullname or gig description
      const matchesTxt = txtRegex ? txtRegex.test(gig.owner.fullname) || txtRegex.test(gig.description) : true;

      // Check if 'price' filter is met (based on value, mid-range, or high-end)
      const matchesPrice = price ? (
          (price === 'value' && gig.price < 451) ||
          (price === 'mid-range' && gig.price >= 451 && gig.price <= 846) ||
          (price === 'high-end' && gig.price > 846)
      ) : true;

      // Check if 'tag' is in the gig tags array
      const matchesTag = tagRegex ? gig.tags.some(t => tagRegex.test(t)) : true;

      // Check if 'deliveryTime' filter is met
      const matchesDeliveryTime = deliveryTime ? (
          (deliveryTime === 'up-to-3' && gig.daysToMake <= 3) ||
          (deliveryTime === 'up-to-7' && gig.daysToMake <= 7) ||
          (deliveryTime === 'anytime')
      ) : true;

      // Return the gig if all filters match
      return matchesTxt && matchesPrice && matchesTag && matchesDeliveryTime;
  });

  return gigs;
}


function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        const gigToSave = {
            _id: gig._id,
            price: gig.price,
            speed: gig.speed,
        }
        savedGig = await storageService.put(STORAGE_KEY, gigToSave)
    } else {
        const gigToSave = {
            owner: gig.owner.fullname,
            price: gig.price,
            speed: gig.speed,
            // Later, owner is set by the backend
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedGig = await storageService.post(STORAGE_KEY, gigToSave)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
}

function _createGigs() {
    let gigs = loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {
        const gigs = [
            {
              _id: 'g101',
              title: 'I will design your logo',
              price: 12.16,
              owner: {
                _id: 'u101',
                fullname: 'Dudu Da',
                imgUrl: '/img/img1.jpg',
                level: 'Level 2',
                rate: 4,
              },
              daysToMake: 3,
              description: 'Make unique logo that stands out for your business or brand.',
              avgResponseTime: 1,
              loc: 'Ghana',
              imgUrls: ['/img/img1.jpg' ,  '/video/video1.mp4' , '/img/img1second.jpg' ],
              tags: ['Arts And Crafts', 'Logo Design'],
              likedByUsers: ['mini-user'],
              reviews: [
                {
                  id: 'r101',
                  txt: 'Did an amazing work! Highly recommended.',
                  rate: 4,
                  by: {
                    _id: 'u102',
                    fullname: 'User 2',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
            {
              _id: 'g102',
              title: 'I will write a compelling blog post',
              price: 20.00,
              owner: {
                _id: 'u103',
                fullname: 'Jane Doe',
                imgUrl: '/img/img2.jpg',
                level: 'Level 2',
                rate: 7,
              },
              daysToMake: 5,
              description: 'Get a high-quality, well-researched blog post that engages your audience.',
              avgResponseTime: 2,
              loc: 'USA',
              imgUrls: ['/img/img2.jpg' ,  '/img/img2second.jpg' , '/img/img2third.jpg'],
              tags: ['Writing', 'Blogging'],
              likedByUsers: ['mini-user', 'user3'],
              reviews: [
                {
                  id: 'r102',
                  txt: 'The blog post was exactly what I needed! Very professional.',
                  rate: 7,
                  by: {
                    _id: 'u104',
                    fullname: 'User 3',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
            {
              _id: 'g103',
              title: 'I will help you with your social media strategy',
              price: 50.00,
              owner: {
                _id: 'u105',
                fullname: 'Mark Twain',
                imgUrl: '/img/img3.jpg',
                level: 'Level 1',
                rate: 4.8,
              },
              daysToMake: 7,
              description: 'Boost your online presence and grow your audience with a tailored social media strategy.',
              avgResponseTime: 3,
              loc: 'UK',
              imgUrls: ['/img/img3.jpg' ,  '/img/img3second.jpg'],
              tags: ['Marketing', 'Social Media'],
              likedByUsers: ['user4', 'mini-user'],
              reviews: [
                {
                  id: 'r103',
                  txt: 'The strategy provided helped me grow my followers significantly.',
                  rate: 5,
                  by: {
                    _id: 'u106',
                    fullname: 'User 4',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
            {
              _id: 'g104',
              title: 'I will edit your YouTube song video',
              price: 30.00,
              owner: {
                _id: 'u107',
                fullname: 'lugas v',
                imgUrl: '/img/img4.jpg',
                level: 'Top Rated',
                rate: 4.5,
              },
              daysToMake: 4,
              description: 'Get professional video editing services for your YouTube content.',
              avgResponseTime: 2,
              loc: 'Australia',
              imgUrls: ['/img/img4.jpg',  '/video/video4.mp4', '/img/img4second.jpg'],
              tags: ['Marketing', 'Video Editing', 'YouTube'],
              likedByUsers: ['user5'],
              reviews: [
                {
                  id: 'r104',
                  txt: 'Great editing! My video looks amazing now!',
                  rate: 4,
                  by: {
                    _id: 'u108',
                    fullname: 'User 5',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
            // New gigs:
            {
              _id: 'g105',
              title: 'I will create a professional website for you',
              price: 150.00,
              owner: {
                _id: 'u109',
                fullname: 'Saar Lee',
                imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXHkQFT4WKaduMz0dAab_wSnD-Wah2EEmrybYyKjKPw9vvFBoE1uYjrjI&s',
                level: 'Level 2',
                rate: 6,
              },
              daysToMake: 10,
              description: 'Custom website design that fits your needs and goals.',
              avgResponseTime: 1,
              loc: 'Canada',
              imgUrls: ['/img/img5.jpg' , '/img/img5second.jpg'],
              tags: ['Web Development', 'Design', 'Marketing'],
              likedByUsers: ['user2', 'user4'],
              reviews: [
                {
                  id: 'r105',
                  txt: 'Fantastic service! The website is exactly what I wanted.',
                  rate: 6.5,
                  by: {
                    _id: 'u110',
                    fullname: 'User 6',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
            {
              _id: 'g106',
              title: 'I will teach you guitar lessons online',
              price: 40.00,
              owner: {
                _id: 'u111',
                fullname: 'David Smith',
                imgUrl: 'data:image/jpeg;base64,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',
                level: 'Level 1',
                rate: 4.7,
              },
              daysToMake: 5,
              description: 'Learn to play guitar from an experienced teacher. Online lessons tailored to your level.',
              avgResponseTime: 2,
              loc: 'USA',
              imgUrls: ['/img/img6.jpg' ,  '/video/video6.mp4'],
              tags: ['Music', 'Guitar Lessons'],
              likedByUsers: ['mini-user', 'user5'],
              reviews: [
                {
                  id: 'r106',
                  txt: 'Great lessons! David is an excellent teacher.',
                  rate: 5,
                  by: {
                    _id: 'u112',
                    fullname: 'User 7',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
            {
              _id: 'g107',
              title: 'I will make a personalized fitness plan',
              price: 75.00,
              owner: {
                _id: 'u113',
                fullname: 'Emily Ray',
                imgUrl: 'data:image/jpeg;base64,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',
                level: 'Top Rated',
                rate: 4.9,
              },
              daysToMake: 7,
              description: 'Personalized fitness plan for your specific goals, from beginner to advanced.',
              avgResponseTime: 1,
              loc: 'Australia',
              imgUrls: ['/img/img7.jpg' ,  '/img/img7second.jpg' , '/img/img7third.jpg'],
              tags: ['Fitness', 'Personal Trainer'],
              likedByUsers: ['user8', 'user6'],
              reviews: [
                {
                  id: 'r107',
                  txt: 'Emily’s fitness plan really helped me achieve my goals. Highly recommend!',
                  rate: 5,
                  by: {
                    _id: 'u114',
                    fullname: 'User 8',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
            {
              _id: 'g108',
              title: 'I will translate your documents',
              price: 25.00,
              owner: {
                _id: 'u115',
                fullname: 'John Miller',
                imgUrl:  'data:image/jpeg;base64,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',
                level: 'Level 1',
                rate: 4.8,
              },
              daysToMake: 4,
              description: 'Professional translation services for various types of documents.',
              avgResponseTime: 3,
              loc: 'Germany',
              imgUrls: ['/img/img8.jpg' ,  '/img/img8second.jpg'],
              tags: ['Translation', 'Language'],
              likedByUsers: ['user3', 'user7'],
              reviews: [
                {
                  id: 'r108',
                  txt: 'Very quick and accurate translation. Excellent service!',
                  rate: 5,
                  by: {
                    _id: 'u116',
                    fullname: 'User 9',
                    imgUrl: 'https://via.placeholder.com/50',
                  },
                },
              ],
            },
          ];
          

        saveToStorage(STORAGE_KEY, gigs)
    }



}
