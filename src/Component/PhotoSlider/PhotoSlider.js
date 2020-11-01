import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../../Assets/Css/PhotoSlider.css';
import 'react-slideshow-image/dist/styles.css'
import dogBanner from '../../Assets/Images/dog-banner-image.png'
import dogField from '../../Assets/Images/Dog-FIeld-1030x300.jpg'

const PhotoSlider = () => {
	const sliderProperties = {
		indicators: i => (<div className="indicator"></div>),
		easing: "ease",
		pauseOnHover: true,
		duration: 5000,
		prevArrow: <button className="nav default-nav " data-type="prev" aria-label="Previous Slide"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"></path></svg></button>
	}
	return (
		<div>
			<Slide {...sliderProperties}>
				<div className="each-fade">
					<div className="site-banner-image" style={{ 'backgroundImage': `url(` + dogBanner + `)` }}></div>
					<p>Lorem ipsum dolor sit amet, eu has malis partem aliquam, mutat everti ex qui. Vix erroribus sadipscing in, natum perpetua splendide id nec. Has in solum senserit, cum cu molestiae intellegat. Te expetendis adversarium has, ei vis ferri dicat viderer. Cu legendos reprehendunt ius.
					Te iusto causae sapientem eam, et graecis epicuri principes has. Invidunt erroribus sea et, dicit legimus cu pro. Vis et voluptaria honestatis scriptorem, his ad nominavi inimicus volutpat. Eam ne vide feugiat, cum omnes minimum vivendum ut, dicta ridens consequuntur quo an. Ex soleat noster tractatos quo.
					Id iriure assentior disputando vix, no his nibh patrioque, feugait pertinacia qui no. Eros ancillae eam te. Ei nibh rebum imperdiet mei, ne qui tale dicat omnium. Ne prompta molestiae his, recusabo maiestatis mea ex. Quot dictas moderatius his cu.
            </p>
				</div>
				<div className="each-fade">
					<div className="site-banner-image" style={{ 'backgroundImage': `url(` + dogField + `)` }}></div>
					<p>Lorem ipsum dolor sit amet, eu has malis partem aliquam, mutat everti ex qui. Vix erroribus sadipscing in, natum perpetua splendide id nec. Has in solum senserit, cum cu molestiae intellegat. Te expetendis adversarium has, ei vis ferri dicat viderer. Cu legendos reprehendunt ius.
					Te iusto causae sapientem eam, et graecis epicuri principes has. Invidunt erroribus sea et, dicit legimus cu pro. Vis et voluptaria honestatis scriptorem, his ad nominavi inimicus volutpat. Eam ne vide feugiat, cum omnes minimum vivendum ut, dicta ridens consequuntur quo an. Ex soleat noster tractatos quo.
					Id iriure assentior disputando vix, no his nibh patrioque, feugait pertinacia qui no. Eros ancillae eam te. Ei nibh rebum imperdiet mei, ne qui tale dicat omnium. Ne prompta molestiae his, recusabo maiestatis mea ex. Quot dictas moderatius his cu.
            </p>
				</div>
			</Slide>
		</div>
	)
}


export default PhotoSlider
