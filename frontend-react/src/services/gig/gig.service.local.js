
import { storageService } from '../async-storage.service'
import { makeId , loadFromStorage , saveToStorage } from '../util.service'
import { userService } from '../user'
// localStorage.clear()
const STORAGE_KEY = 'gig'

_createGigs()
query()
export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = { txt: '', price: 0 }) {
    var gigs = await storageService.query(STORAGE_KEY)
    console.log(gigs[0].owner.level);
    
    const { txt, price } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.owner.fullname) || regex.test(gig.description))
    }
    if (price) {
        gigs = gigs.filter(gig => gig.price >= price)
    }

    console.log(gigs);
    
    return gigs
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
        gigs = [
            {
                _id: 'g101',
                title: 'I will design your logo',
                price: 12.16,
                owner: {
                    _id: 'u101',
                    fullname: 'Dudu Da',
                    imgUrl: 'https://via.placeholder.com/50',
                    level: 'Level 2',
                    rate: 4,
                },
                daysToMake: 3,
                description: 'Make unique logo that stands out for your business or brand.',
                avgResponseTime: 1,
                loc: 'Ghana',
                imgUrls: ['/img/img1.jpg'],
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
                    imgUrl: 'https://via.placeholder.com/50',
                    level: 'Level 2',
                    rate: 5,
                },
                daysToMake: 5,
                description: 'Get a high-quality, well-researched blog post that engages your audience.',
                avgResponseTime: 2,
                loc: 'USA',
                imgUrls: ['/img/img2.jpg'],
                tags: ['Writing', 'Blogging'],
                likedByUsers: ['mini-user', 'user3'],
                reviews: [
                    {
                        id: 'r102',
                        txt: 'The blog post was exactly what I needed! Very professional.',
                        rate: 5,
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
                    imgUrl: 'https://via.placeholder.com/50',
                    level: `Level 1`,
                    rate: 4.8 ,
                },
                daysToMake: 7,
                description: 'Boost your online presence and grow your audience with a tailored social media strategy.',
                avgResponseTime: 3,
                loc: 'UK',
                imgUrls: ['/img/img3.jpg'],
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
                title: 'I will edit your YouTube video',
                price: 30.00,
                owner: {
                    _id: 'u107',
                    fullname: 'Sarah Conner',
                    imgUrl: 'https://via.placeholder.com/50',
                    level: 'Top Rated',
                    rate: 4.5,
                },
                daysToMake: 4,
                description: 'Get professional video editing services for your YouTube content.',
                avgResponseTime: 2,
                loc: 'Australia',
                imgUrls: ['/img/img4.jpg'],
                tags: ['Video Editing', 'YouTube'],
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
        ];


        saveToStorage(STORAGE_KEY, gigs)
    }



}
