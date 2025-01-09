export function HomePage() {
    return (
        <section>
            <div className="search-container">
                <img src="/img/Home-page-green.jpg" alt="" className="green-background-img"/>
                <div className="on-pic">
                    <article className="on-pic-text">Scale your professional workforce with  freelancers</article>
                    <form className="gig-search-container">
                        <input type="text" id='txt' name='txt' className='gig-search' placeholder='Search for any service...' value=''/>
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
                <button className="categories-btn prog&tech"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/programming-tech-thin.56382a2.svg" alt="" /> Programing & Tech</button>
                <button className="categories-btn graph&design"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/graphics-design-thin.ff38893.svg" alt="" /> Graphics & Design</button>
                <button className="categories-btn marketing"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/digital-marketing-thin.68edb44.svg" alt="" />Digital Marketing</button>
                <button className="categories-btn writing&trans"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/writing-translation-thin.fd3699b.svg" alt="" />Writing & Translation</button>
                <button className="categories-btn video&animation"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/video-animation-thin.9d3f24d.svg" alt="" />Video & Animation</button>
                <button className="categories-btn ai"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/ai-services-thin.104f389.svg" alt="" />AI Services</button>
                <button className="categories-btn music"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/music-audio-thin.43a9801.svg" alt="" />Music & Audio</button>
                <button className="categories-btn business"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/business-thin.885e68e.svg" alt="" />Business</button>
                <button className="categories-btn consulting"><img src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/consulting-thin.d5547ff.svg" alt="" />Consulting</button>
            </div>

                <h2>Made on Fivver</h2>
            <div className="made-on-container">
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
            </div>
        </section >
    )
}