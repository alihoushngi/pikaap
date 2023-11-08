import React from "react";
import { Link } from "react-router-dom";
import "../../index.scss";
import image from "../../panel/assets/Images/TaxiVector.png";
import video from "../../panel/assets/videos/backgroundVideo.mp4";

const HomeScreen = () => {
	return (
		<>
			<video loop muted autoPlay poster={image} className='video-background'>
				<source src={video} type='video/mp4' />
			</video>
			<div className='HomeScreen'>
				<Link className='navigateToDashboard' to='/administrator'>
					انتقال به صفحه ورود
				</Link>
			</div>
		</>
	);
};

export default HomeScreen;
