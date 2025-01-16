import { Link, NavLink } from "react-router-dom"
import { homePageSvgs } from "../cmps/Svgs"
import React, { useState, useEffect, useRef } from "react"

export function HomePage() {

        const [currentIndex, setCurrentIndex] = useState(0)
        const [visibleCards, setVisibleCards] = useState(1)
        const containerRef = useRef(null)
        const cards = [
            {id: 1, content: <li><button className="populer-services-btn btn-1"><span>Website Development</span> <img src="/img/web-dev.jpg" alt="" /></button></li>},
            {id: 2, content: <li><button className="populer-services-btn btn-2"><span>Logo Design</span> <img src="/img/logo-design.jpg" alt="" /></button></li>},
            {id: 3, content: <li><button className="populer-services-btn btn-3"><span>SEO</span> <img src="/img/seo.jpg" alt="" /></button></li>},
            {id: 4, content: <li><button className="populer-services-btn btn-4"><span>Architecture & Interior Design</span> <img src="/img/architecture-design.jpg" alt="" /></button></li>},
            {id: 5, content: <li><button className="populer-services-btn btn-5"><span>Social Media Marketing</span> <img src="/img/social-media-marketing.jpg" alt="" /></button></li>},
            {id: 6, content: <li><button className="populer-services-btn btn-6"><span>Voice Over</span> <img src="/img/voice-over.jpg" alt="" /></button></li>},
            {id: 7, content: <li><button className="populer-services-btn btn-7"><span>UGC Videos</span> <img src="/img/UGC-Video.jpg" alt="" /></button></li>},
            {id: 8, content: <li><button className="populer-services-btn btn-8"><span>Software Development</span> <img src="/img/software-development.jpg" alt="" /></button></li>},
            {id: 9, content: <li><button className="populer-services-btn btn-9"><span>Data Science & ML</span> <img src="/img/data-science.jpg" alt="" /></button></li>},
            {id: 10, content: <li><button className="populer-services-btn btn-10"><span>Product Photography</span> <img src="/img/product-photography.jpg" alt="" /></button></li>},
            {id: 11, content: <li><button className="populer-services-btn btn-11"><span>E-Commerce Marketing</span> <img src="/img/e-commerce.jpg" alt="" /></button></li>},
            {id: 12, content: <li><button className="populer-services-btn btn-12"><span>Video Editing</span> <img src="/img/video-editing.jpg" alt="" /></button></li>}
        ]

        useEffect (() => {
            const updateVisibleCards = () => {
                if(containerRef.current) {
                    const containerWidth = containerRef.current.offsetWidth
                    const cardWidth = 200
                    const newVisibleCards = Math.floor(containerWidth / cardWidth)
                    setVisibleCards(newVisibleCards)
                }
            }

            updateVisibleCards()
            window.addEventListener('resize', updateVisibleCards)
            return () => window.removeEventListener('resize', updateVisibleCards)
        }, [cards.length])

        // const nextCard = () => {
        //     setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
        // }
        const nextCard = () => {
            setCurrentIndex((prevIndex) => (prevIndex + Math.max(1, visibleCards - 1)) % cards.length)
        }

        // const prevCard = () => {
        //     setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
        // }
        const prevCard = () => {
            setCurrentIndex((prevIndex) => (prevIndex - Math.max(1, visibleCards - 1) + cards.length) % cards.length)
        }


    return (
        <section>
            <div className="search-container">
                <img src="/img/Home-page-green.jpg" alt="" className="green-background-img"/>
                <div className="on-pic">
                    <article className="on-pic-text">Scale your professional workforce with  freelancers</article>
                    <form className="gig-search-container">
                        <input type="text" id='txt' name='txt' className='gig-search' placeholder='Search for any service...'/>
                        <button className='search-btn'><svg width={"16"} height={"16"} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path></svg></button>
                    </form>
                </div>
                    <article className="trusted-by">Trusted by: 
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.ff37dd3.svg" alt="meta logo" />
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.e74f4d9.svg" alt="meta logo" />
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.b310314.svg" alt="meta logo" />
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pg.22fca85.svg" alt="meta logo" />
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.d398de5.svg" alt="meta logo" />
                        <img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/payoneer.7c1170d.svg" alt="meta logo" />    
                    </article>
            </div>

            <div className="categories-container">
                <NavLink to="gigs/programing&tech"><button className="categories-btn prog&tech"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech-thin.56382a2.svg" alt="" />Programing & Tech</button></NavLink>
                <NavLink to="gigs/graphics&design"><button className="categories-btn graph&design"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg" alt="" /> Graphics & Design</button></NavLink>
                <NavLink to="gigs/Marketing"><button className="categories-btn marketing"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg" alt="" />Digital Marketing</button></NavLink>
                <NavLink to="gigs/writing&translation"><button className="categories-btn writing&trans"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg" alt="" />Writing & Translation</button></NavLink>
                <NavLink to="gigs/video&animation"><button className="categories-btn video&animation"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg" alt="" />Video & Animation</button></NavLink>
                <NavLink to="gigs/ai-services"><button className="categories-btn ai"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg" alt="" />AI Services</button></NavLink>
                <NavLink to="gigs/music&audio"><button className="categories-btn music"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg" alt="" />Music & Audio</button></NavLink>
                <NavLink to="gigs/business"><button className="categories-btn business"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg" alt="" />Business</button></NavLink>
                <NavLink to="gigs/consulting"><button className="categories-btn consulting"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg" alt="" />Consulting</button></NavLink>
            </div>

            <div className="popular-services-container" ref={containerRef}>
                <h2>Popular services</h2>


                <ul className="popular-services-carrousel">
                    {cards.slice(currentIndex, currentIndex + visibleCards).map(card => (
                        <div className="card" key={card.id}>
                            {card.content}
                        </div>
                    ))}
                    {/* <li><button className="populer-services-btn btn-1"><span>Website Development</span> <img src="/img/web-dev.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-2"><span>Logo Design</span> <img src="/img/logo-design.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-3"><span>SEO</span> <img src="/img/seo.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-4"><span>Architecture & Interior Design</span> <img src="/img/architecture-design.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-5"><span>Social Media Marketing</span> <img src="/img/social-media-marketing.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-6"><span>Voice Over</span> <img src="/img/voice-over.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-7"><span>UGC Videos</span> <img src="/img/UGC-Video.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-8"><span>Software Development</span> <img src="/img/software-development.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-9"><span>Data Science & ML</span> <img src="/img/data-science.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-10"><span>Product Photography</span> <img src="/img/product-photography.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-11"><span>E-Commerce Marketing</span> <img src="/img/e-commerce.jpg" alt="" /></button></li>
                    <li><button className="populer-services-btn btn-12"><span>Video Editing</span> <img src="/img/video-editing.jpg" alt="" /></button></li> */}
                </ul>

                <button className="carrousel-nav next" onClick={nextCard}>{homePageSvgs.carrouselNext}</button>
                <button className="carrousel-nav previous" onClick={prevCard}>{homePageSvgs.carrouselPrev}</button>
            </div>

            <div className="logo-maker-container">
                <article className="logo-maker">
                    {homePageSvgs.logoMaker}
                    
                    <h2>
                        Make an incredible
                        <br />
                        logo
                        <em> in seconds</em>
                    </h2>
                    
                    <article className="logo-maker-text">
                        Pre-designed by top talent. just add your touch.
                    </article>

                    <button>Try Fiverr Logo Maker</button>

                </article>
                <article className="logo-maker-img">
                    <img src="/img/logo-maker-lohp.jpg" alt="" />
                </article>
            </div>

            <div className="made-on-container">
                <h2>Made on Fivver</h2>
                
                <ul className="made-on-gigs">
                    <img src="/img/made-on.jpg" alt="" />
                    <img src="/img/made-on-1.jpg" alt="" />
                    <img src="/img/made-on-2.jpg" alt="" />
                    <img src="/img/made-on-3.jpg" alt="" />
                    <img src="/img/made-on-4.jpg" alt="" />
                    <img src="/img/made-on-5.jpg" alt="" />
                    <img src="/img/made-on-6.jpg" alt="" />
                    <img src="/img/made-on-7.jpg" alt="" />
                    <img src="/img/made-on-8.jpg" alt="" />
                    <img src="/img/made-on-9.jpg" alt="" />
                    <img src="/img/made-on-10.jpg" alt="" />
                </ul>
            </div>
        </section >
    )
}