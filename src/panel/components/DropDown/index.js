import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./index.scss";

const DropDown = ({
	menuLink,
	itemRow,
	itemText,
	menuIcon,
	svgWrapper,
	menuTitle,
	itemSvg,
	itemHasSubMenu,
	style,
	boxStyle,
	menuIconStyle,
	selectClass,
	closeAfterClick,
}) => {
	const [isActive, setIsActive] = useState(false);
	const ref = useRef();
	useEffect(() => {
		const closeDropDown = (e) => {
			if (isActive && ref.current && !ref.current.contains(e.target)) {
				setIsActive(false);
			}
		};
		document.body.addEventListener("click", closeDropDown);
		return () => {
			document.body.removeEventListener("click", closeDropDown);
		};
	}, [isActive]);
	const onClickHandler = () => {
		setIsActive((pre) => !pre);
	};

	const user = [
		{
			admin: "admin",
		},
	];

	return (
		<div className={menuLink} ref={ref}>
			<div className={itemRow} onClick={onClickHandler}>
				<div className={menuIcon} style={menuIconStyle}>
					<div className={svgWrapper}>{itemSvg}</div>
				</div>
				<span className={menuTitle}>{itemText}</span>
				<Icon rot={isActive} id='icon-toggle' style={style}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						x='0px'
						y='0px'
						width='15px'
						height='15px'
						viewBox='0 0 52 52'
						enableBackground='new 0 0 52 52'
						fill='#92929F'
					>
						<path d='M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z' />
					</svg>
				</Icon>
			</div>
			<Select
				vis={isActive}
				style={boxStyle}
				className={`${selectClass} heightAnimation`}
				onClick={() => closeAfterClick && setIsActive(!isActive)}
			>
				{itemHasSubMenu}
			</Select>
		</div>
	);
};

const Icon = styled.i`
	transition: 0.3s;
	transform: ${(props) => (props.rot ? "rotate(180deg)" : "rotate(0deg)")};
	left: 10px;
	position: absolute;
	@media (max-width: 1314px) {
		position: unset;
		margin-right: 1rem;
	}
`;

const Select = styled.div`
	transition: 150ms cubic-bezier(0.36, 0.33, 0.63, 0.77);
	/* transition: all 200ms linear; */
	transform: ${(props) => (props.vis ? "scaleY(1)" : "scaleY(0)")};
	transform-origin: top;
	opacity: ${(props) => (props.vis ? 1 : 0)};
	max-height: ${(props) => (props.vis ? "300px" : "0px")};
	margin-top: 0.5rem !important;
	z-index: 2;
`;

export default DropDown;
