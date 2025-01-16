import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { GigFilter } from '../cmps/GigFilter'
import { loadGigs } from '../store/actions/gig.actions'
import { appHeaderSvgs } from './Svgs'


export function AppHeader() {
	const [filterBy, setFilterBy] = useState(gigService.getDefaultFilter())
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

	const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()




	useEffect(() => {
		loadGigs(filterBy)

	}, [filterBy])

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	return (
		<header className="app-header full">
			<nav>
				<NavLink to="/" className="logo">
					fiverr <span className='point'>.</span>
				</NavLink>
				<GigFilter filterBy={filterBy} setFilterBy={setFilterBy} />
				<div className='header-svgs'>
					{appHeaderSvgs.bell}
					{appHeaderSvgs.envelope}
					{appHeaderSvgs.heart}
				</div>
				<label className='orders-font'>Orders</label>
				{user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}

				{!user && <NavLink to="login" className="login-link">Join</NavLink>}
				{user && (
					<div className="user-info">
						<Link className='user-letter' onClick={toggleMenu} to={`user/${user._id}`}>
							{/* {user.imgUrl && <img src={user.imgUrl} />} */}
							{user.fullname.charAt(0).toUpperCase()}
						</Link>
						{/* <span className="score">{user.score?.toLocaleString()}</span> */}


						{isMenuOpen && (

							<div className="menu">
								<div class="triangle-border">
									<div className="white-triangle"></div>
								</div>
								<ul>
									<li><a href="#">Profile</a></li>
									<li><a href="#">Setting</a></li>
									<li><a onClick={onLogout} href="#">logout</a></li>
								</ul>
							</div>
						)}
					</div>
				)}
			</nav>
		</header>

	)
}
