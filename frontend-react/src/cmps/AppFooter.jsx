import { useSelector } from 'react-redux'
import { appFooterSvgs } from './Svgs';


export function AppFooter() {
	// const count = useSelector(storeState => storeState.userModule.count)

	return (
		<footer className="app-footer full">
			<div className="left-footer">
				<p>Avnerr &copy; </p>
				<p className='second-line'> Avnerr International Ltd. 2025</p>
			</div>
			<div className="right-footer-svgs">
				<label >{appFooterSvgs.tiktokLogo}</label>
				<label >{appFooterSvgs.instagramLogo}</label>
				<label >{appFooterSvgs.facebookLogo}</label>
			</div>

		</footer>
	)
}