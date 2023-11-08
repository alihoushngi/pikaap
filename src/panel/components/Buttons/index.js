import React from "react";
import { Link } from "react-router-dom";

const Buttons = ({ ButtonUrl, ButtonContent, style, buttonsWrapper, onClick, styleWrapper }) => {
	return (
		<div className={buttonsWrapper} style={styleWrapper}>
			<Link style={style} to={ButtonUrl} onClick={onClick}>
				{ButtonContent}
			</Link>
		</div>
	);
};

export default Buttons;
