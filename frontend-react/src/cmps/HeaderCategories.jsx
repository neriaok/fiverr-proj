import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export function HeaderCategories() {
    const location = useLocation()
	const isHomePage = location.pathname === '/' ? true : false

    return (
        <div className={'header-categories-container ' + (isHomePage ? '' : 'absolute')}>
            <nav className='categories-nav'>
                <ul className='categories-list'>
                    <NavLink to="gigs/programing&tech" className='categories-link'>Programing & Tech</NavLink>
                    <NavLink to="gigs/graphics&design" className='categories-link'>Graphics & Design</NavLink>
                    <NavLink to="gigs/Marketing" className='categories-link'>Digital Marketing</NavLink>
                    <NavLink to="gigs/writing&translation" className='categories-link'>Writing & Translation</NavLink>
                    <NavLink to="gigs/video&animation" className='categories-link'>Video & Animation</NavLink>
                    <NavLink to="gigs/ai-services" className='categories-link'>AI Services</NavLink>
                    <NavLink to="gigs/music&audio" className='categories-link'>Music & Audio</NavLink>
                    <NavLink to="gigs/business" className='categories-link'>Business</NavLink>
                    <NavLink to="gigs/consulting" className='categories-link'>Consulting</NavLink>
                </ul>
            </nav>
        </div>
    )
}