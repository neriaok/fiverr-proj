import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { loadGig, addGigMsg } from '../store/actions/gig.actions.js'
import { OrderGig } from '../cmps/OrderGig.jsx'


export function GigDetails() {

  const {gigId} = useParams()
  const clearGigId = gigId.replace(":", "")
  
  

  const gig = useSelector(storeState => storeState.gigModule.gig)
  const loading = useSelector(storeState => storeState.gigModule.loading) 

  useEffect(() => {
    loadGig(clearGigId)
  }, [clearGigId])

  async function onAddGigMsg(gigId) {
    try {
        await addGigMsg(gigId, 'bla bla ' + parseInt(Math.random()*10))
        showSuccessMsg(`Gig msg added`)
    } catch (err) {
        showErrorMsg('Cannot add gig msg')
    }        

}
// {
//   _id: 'g101',
//   title: 'I will design your logo',
//   price: 12.16,
//   owner: {
//     _id: 'u101',
//     fullname: 'Dudu Da',
//     imgUrl: '/img/img1.jpg',
//     level: 'Level 2',
//     rate: 4,
//   },
//   daysToMake: 3,
//   description: 'Make unique logo that stands out for your business or brand.',
//   avgResponseTime: 1,
//   loc: 'Ghana',
//   imgUrls: ['/img/img1.jpg' ,  '/video/video1.mp4' , '/img/img1second.jpg' ],
//   tags: ['Arts And Crafts', 'Logo Design'],
//   likedByUsers: ['mini-user'],
//   reviews: [
//     {
//       id: 'r101',
//       txt: 'Did an amazing work! Highly recommended.',
//       rate: 4,
//       by: {
//         _id: 'u102',
//         fullname: 'User 2',
//         imgUrl: 'https://via.placeholder.com/50',
//       },
//     },
//   ],
// },
if (loading) return <div>Loading...</div>

if (!gig) return <div>Wait a second..</div>

  return (
    <div className='gig-details-container'>
      <div>{gig.title}</div>
      <OrderGig gig={gig}/>

    </div>
  )
}