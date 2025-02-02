import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { logout } from '../store/actions/user.actions';
import { GigFilter } from '../cmps/GigFilter';
import { loadGigs } from '../store/actions/gig.actions';
import { appHeaderSvgs } from './Svgs';
import { HeaderCategories } from '../cmps/HeaderCategories.jsx';

export function AppHeader() {
	const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter());
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchBar, setIsSearchBar] = useState(false)
	const [isCategory, setIsCategory] = useState(false)
	const user = useSelector(storeState => storeState.userModule.user);
	const navigate = useNavigate();
	const location = useLocation()
	const isHomePage = location.pathname === '/' ? true : false


	useEffect(() => {
		loadGigs(filterBy);
	}, [filterBy]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const handleScroll = () => {
		if (isHomePage) {
			if (window.scrollY > 435) {
				setIsSearchBar(true)
			}
			if (window.scrollY > 713) {
				setIsCategory(true)
			}
			if (window.scrollY < 435) {
				setIsSearchBar(false)
			}
			if (window.scrollY < 713) {
				setIsCategory(false)
			}
		}
	}

	const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

	const onLogout = async () => {
		try {
			await logout();
			navigate('/');
			showSuccessMsg('Bye now');
		} catch (err) {
			showErrorMsg('Cannot logout');
		}
	};

	return (
		<header className={"app-header full" + (isHomePage ? " sticky" : '')}>
			{/* <header className="app-header full main-container"> */}
			<nav className='header-nav'>
				<div className="right-header">
					{/* Logo */}
					<NavLink to="/" className="logo">
						Avnerr <span className='point'>.</span>
					</NavLink>
					{isHomePage || <GigFilter user={user} filterBy={filterBy} setFilterBy={setFilterBy} />}
					{isSearchBar && <GigFilter user={user} filterBy={filterBy} setFilterBy={setFilterBy} />}

				</div>
				{user && (
					<>
						<label ><NavLink className='explore black' to="gigs">Explore</NavLink></label>
						<div className='header-svgs'>
							{appHeaderSvgs.bell}
							{appHeaderSvgs.envelope}
							{appHeaderSvgs.heart}
						</div>
						<NavLink to="/orders"><label className='orders-font'>Orders</label></NavLink>
						{/* {user.isAdmin && <NavLink to="/admin">Admin</NavLink>} */}

						<div className="user-info">
							<div className='user-letter' onClick={toggleMenu}>
								{user.fullname.charAt(0).toUpperCase()}
							</div>

							{isMenuOpen && (
								<div className="menu">
									<div className="triangle-border">
										<div className="white-triangle"></div>
									</div>
									<ul>
										<li><NavLink to="user/profile">Profile</NavLink></li>
										<li><a href="#">Setting</a></li>
										<li><a onClick={onLogout} href="#">Logout</a></li>
									</ul>
								</div>
							)}
						</div>
					</>
				)}

				{/* Conditional Rendering for Logged-out User */}
				{!user && (
					<div className="log-out-container">
						<div className="labels-container">
							<label ><NavLink className='gray' to="gigs">Explore</NavLink></label>
							<label><NavLink className='gray' to="/login/signup">Sign in</NavLink></label>
						</div>
						<NavLink to="login" className="login-link">Join</NavLink>
					</div>
				)}
			</nav>
			{isHomePage || <HeaderCategories />}
			{isCategory && <HeaderCategories />}
		</header>
	);
}
