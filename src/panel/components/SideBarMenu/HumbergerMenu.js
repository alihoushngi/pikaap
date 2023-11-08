import React, { useState } from "react";
import styled from "styled-components";
import SideBarMenu from "../SideBarMenu";
import "./index.scss";

const Humber = styled.div`
	width: 2rem;
	height: 1.5rem;
	position: fixed;
	top: 30px;
	right: 20px;
	display: flex;
	justify-content: space-around;
	flex-flow: column nowrap;
	z-index: 2;

	div {
		width: 1.7rem;
		height: 0.1rem;
		background-color: ${({ open }) => (open ? "#333" : "#fff")};
		border-radius: 10px;
		transform-origin: 1px;
		transition: all 0.3s linear;

		&:nth-child(1) {
			transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
		}
		&:nth-child(2) {
			transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
			opacity: ${({ open }) => (open ? 0 : 1)};
		}
		&:nth-child(3) {
			transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
		}
	}
`;

const Controler = styled.div`
	width: 150px;
	position: sticky;
	background-color: #1e1e2d;
	display: flex;
	flex-direction: column;
	z-index: 450;
	top: 25%;
	height: 500px;
	overflow-y: auto;
	overflow-x: hidden;
	border-top-left-radius: 15px;
	border-bottom-left-radius: 15px;
	transition: transform 0.3s ease-in-out;

	a {
		white-space: nowrap;
	}

	&::-webkit-scrollbar {
		background-color: #15152181;
		width: 8px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #323248;
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: #2a2a3d;
	}

	position: absolute;
	transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
`;

const HumbergerMenu = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Humber open={open} onClick={() => setOpen(!open)}>
				<div />
				<div />
				<div />
			</Humber>
			<Controler open={open}>
				<SideBarMenu setOpen={setOpen} />
			</Controler>
		</>
	);
};

export default HumbergerMenu;
