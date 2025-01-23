import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { logout } from '../store/actions/user.actions';
import { GigFilter } from '../cmps/GigFilter';
import { loadGigs } from '../store/actions/gig.actions';
import { appHeaderSvgs } from './Svgs';

export function AppHeader() {
	const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter());
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const user = useSelector(storeState => storeState.userModule.user);
	const navigate = useNavigate();

	useEffect(() => {
		loadGigs(filterBy);
	}, [filterBy]);

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
		<header className="app-header full">
		{/* <header className="app-header full main-container"> */}
			<nav>
				 <div className="right-header">
				{/* Logo */}
				<NavLink to="/" className="logo">
					fiverr <span className='point'>.</span>
				</NavLink>

				<GigFilter user={user} filterBy={filterBy} setFilterBy={setFilterBy} />
				</div>
				{user && (
					<>
						<div className='header-svgs'>
							{appHeaderSvgs.bell}
							{appHeaderSvgs.envelope}
							{appHeaderSvgs.heart}
						</div>
						<label className='orders-font'>Orders</label>
						{user.isAdmin && <NavLink to="/admin">Admin</NavLink>}

						<div className="user-info">
							<Link className='user-letter' onClick={toggleMenu} to={`user/${user._id}`}>
								{user.fullname.charAt(0).toUpperCase()}
							</Link>

							{isMenuOpen && (
								<div className="menu">
									<div className="triangle-border">
										<div className="white-triangle"></div>
									</div>
									<ul>
										<li><a href="#">Profile</a></li>
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
							<span>
							<label>Become a Seller</label>
							<label>Sign in</label>
							</span>
						</div>
						<NavLink to="login" className="login-link">Join</NavLink>
					</div>
				)}
			</nav>
		</header>
	);
}
