
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
          price: 100.00,  // Updated price: Budget
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
          imgUrls: ['/img/img1.jpg', '/video/video1.mp4', '/img/img1second.jpg'],
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
                location: 'USA',
              },
            },
          ],
          aboutThisGig: {
            overview: "I will create a unique and creative logo tailored specifically for your business or brand.",
            services: [
              "Custom logo design",
              "3 design concepts to choose from",
              "High-quality files for print and digital use",
              "Unlimited revisions"
            ],
            deliverables: [
              "A modern, professional logo",
              "A file package (AI, EPS, PNG, JPG)",
              "A vector file for scalability"
            ],
            whyMe: [
              "Experienced designer",
              "Fast delivery",
              "100% satisfaction guarantee"
            ],
            note: "Please provide details about your brand and any design preferences before placing an order.",
            thankYou: "Thank you for visiting my gig!"
          },
        },
        {
          _id: 'g102',
          title: 'I will write a compelling blog post',
          price: 250.00,  // Updated price: Mid-range
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
          imgUrls: ['/img/img2.jpg', '/img/img2second.jpg', '/img/img2third.jpg'],
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
                location: 'Canada',
              },
            },
          ],
          aboutThisGig: {
            overview: "I will write a well-researched, SEO-friendly blog post that will engage your readers and drive traffic to your website.",
            services: [
              "SEO optimized content",
              "Informative and engaging writing",
              "Targeted keyword usage for better ranking",
              "Plagiarism-free content"
            ],
            deliverables: [
              "High-quality blog post (500-1500 words)",
              "SEO-friendly formatting",
              "Quick turnaround"
            ],
            whyMe: [
              "Experienced writer",
              "Fast communication",
              "100% satisfaction guarantee"
            ],
            note: "Please share the topic and any specific instructions before placing an order.",
            thankYou: "Thank you for considering my gig!"
          },
        },
        {
          _id: 'g103',
          title: 'I will help you with your social media strategy',
          price: 400.00,  // Updated price: High-end
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
          imgUrls: ['/img/img3.jpg', '/img/img3second.jpg'],
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
                location: 'Germany',
              },
            },
          ],
          aboutThisGig: {
            overview: "I will help you create a strategy that suits your business and helps you achieve measurable results.",
            services: [
              "Social media audit",
              "Tailored social media strategy",
              "Content calendar creation",
              "Growth tactics (followers, engagement, and brand awareness)"
            ],
            deliverables: [
              "A customized strategy for your brand",
              "A content calendar with post ideas",
              "Tips for boosting engagement and followers"
            ],
            whyMe: [
              "Experienced social media strategist",
              "Fast delivery",
              "100% satisfaction guarantee"
            ],
            note: "Please message me with your business goals and current social media status before placing an order.",
            thankYou: "Thank you for considering my gig!"
          },
        },
        {
          _id: 'g104',
          title: 'I will edit your YouTube song video',
          price: 150.00,  // Updated price: Mid-range
          owner: {
            _id: 'u107',
            fullname: 'Lugas V',
            imgUrl: '/img/img4.jpg',
            level: 'Top Rated',
            rate: 4.5,
          },
          daysToMake: 4,
          description: 'Get professional video editing services for your YouTube content.',
          avgResponseTime: 2,
          loc: 'Australia',
          imgUrls: ['/img/img4.jpg', '/video/video4.mp4', '/img/img4second.jpg'],
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
                location: 'Australia',
              },
            },
          ],
          aboutThisGig: {
            overview: "I will edit your song video for YouTube with high-quality effects, transitions, and color grading.",
            services: [
              "Video editing for music videos, vlogs, or other content",
              "Audio synchronization and enhancement",
              "Color correction and effects"
            ],
            deliverables: [
              "A high-quality, polished video",
              "Fast turnaround time",
              "Full HD or 4K video quality"
            ],
            whyMe: [
              "Experienced video editor",
              "Quick turnaround",
              "100% satisfaction guarantee"
            ],
            note: "Please contact me with your video footage and any specific requests before placing an order.",
            thankYou: "Thank you for visiting my gig!"
          },
        },
        {
          _id: 'g105',
          title: 'I will create a professional website for you',
          price: 800.00,  // Updated price: High-end
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
          imgUrls: ['/img/img5.jpg', '/img/img5second.jpg'],
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
                location: 'India',
              },
            },
          ],
          aboutThisGig: {
            overview: "I will design a custom website that meets your needs, using modern web development technologies and design principles.",
            services: [
              "Custom website design (Responsive)",
              "E-commerce websites",
              "WordPress or HTML-based websites"
            ],
            deliverables: [
              "A fully responsive website",
              "SEO optimized",
              "1 month free maintenance"
            ],
            whyMe: [
              "Experienced web developer",
              "Clean, modern designs",
              "100% satisfaction guarantee"
            ],
            note: "Please contact me before placing an order to discuss your project requirements.",
            thankYou: "Thank you for choosing my gig!"
          },
        },
        {
          _id: 'g106',
          title: 'I will teach you guitar lessons online',
          price: 60.00,  // Updated price: Mid-range
          owner: {
            _id: 'u111',
            fullname: 'David Smith',
            imgUrl: '/img/faces/david smith.jpg',
            level: 'Level 1',
            rate: 4.7,
          },
          daysToMake: 5,
          description: 'Learn to play guitar from an experienced teacher. Online lessons tailored to your level.',
          avgResponseTime: 2,
          loc: 'USA',
          imgUrls: ['/img/img6.jpg', '/video/video6.mp4'],
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
                location: 'UK',
              },
            },
          ],
          aboutThisGig: {
            overview: "Learn to play guitar from an experienced and professional teacher. Lessons will be tailored to your skill level.",
            services: [
              "Beginner, intermediate, or advanced lessons",
              "Online lessons via Zoom or Skype",
              "Customized lesson plans"
            ],
            deliverables: [
              "Personalized lesson notes",
              "Video tutorials",
              "Progress tracking"
            ],
            whyMe: [
              "Experienced guitar teacher",
              "Flexible lesson schedules",
              "100% satisfaction guarantee"
            ],
            note: "Please contact me with your current skill level and any specific goals you have before placing an order.",
            thankYou: "Thank you for choosing my gig!"
          },
        },
        {
          _id: 'g107',
          title: 'I will make a personalized fitness plan',
          price: 150.00,  // Updated price: High-end
          owner: {
            _id: 'u113',
            fullname: 'Emily Ray',
            imgUrl: '/img/faces/Emily Ray.jpg',
            level: 'Top Rated',
            rate: 4.9,
          },
          daysToMake: 7,
          description: 'Personalized fitness plan for your specific goals, from beginner to advanced.',
          avgResponseTime: 1,
          loc: 'Australia',
          imgUrls: ['/img/img7.jpg', '/img/img7second.jpg', '/img/img7third.jpg'],
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
                location: 'USA',
              },
            },
          ],
          aboutThisGig: {
            overview: "I will create a personalized fitness plan designed to help you reach your fitness goals, whether you are a beginner or advanced.",
            services: [
              "Custom workout routines",
              "Nutrition guidance",
              "Weekly check-ins to track progress"
            ],
            deliverables: [
              "A personalized fitness plan",
              "Video tutorials for exercises",
              "Ongoing support"
            ],
            whyMe: [
              "Certified personal trainer",
              "Experience working with all fitness levels",
              "100% satisfaction guarantee"
            ],
            note: "Please message me with your fitness goals and any specific preferences you have before placing an order.",
            thankYou: "Thank you for choosing my gig!"
          },
        },
        {
          _id: 'g108',
          title: 'I will translate your documents',
          price: 80.00,  // Updated price: Mid-range
          owner: {
            _id: 'u115',
            fullname: 'John Miller',
            imgUrl: '/img/faces/John Miller.jpg',
            level: 'Level 1',
            rate: 4.8,
          },
          daysToMake: 4,
          description: 'Professional translation services for various types of documents.',
          avgResponseTime: 3,
          loc: 'Germany',
          imgUrls: ['/img/img8.jpg', '/img/img8second.jpg'],
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
                location: 'France',
              },
            },
          ],
          aboutThisGig: {
            overview: "I will provide accurate and professional translations for your documents, helping you bridge language barriers effectively.",
            services: [
              "Translation of documents (business, academic, legal, etc.)",
              "Fast turnaround",
              "Proofreading and editing"
            ],
            deliverables: [
              "Accurate, high-quality translations",
              "Delivery in your preferred format"
            ],
            whyMe: [
              "Fluent in multiple languages",
              "Attention to detail",
              "100% satisfaction guarantee"
            ],
            note: "Please provide the document and specify the language pair before placing an order.",
            thankYou: "Thank you for choosing my gig!"
          },
        },
      ];
      
      saveToStorage(STORAGE_KEY, gigs);
    }      

}
