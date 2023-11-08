import React, { memo, useState } from "react";
import styled from "styled-components";
import "./index.scss";

function Modal({
	buttonType,
	openButtonClass,
	openButtonContent,
	buttonStyle,
	modalTitle,
	modalDis,
	exitButtonContent,
	modalId,
	children,
	modalFooter,
}) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<button
				className={openButtonClass}
				type={buttonType}
				onClick={() => setModalOpen(true)}
			>
				{openButtonContent}
			</button>

			<ModalWrapepr rot={modalOpen}>
				<div className='modalDialog'>
					<div className='modalContent'>
						<div className='modalHeader'>
							<div className='modalTitleWrapper'>
								<h5 className='modalTitleClass'>{modalTitle}</h5>
								<span className='desTitile'>{modalDis}</span>
							</div>
							<button
								style={buttonStyle}
								className='exitButtonClass'
								onClick={() => setModalOpen(false)}
							>
								<i className='fal fa-close' />
							</button>
						</div>
						<div className='modalBody'>{children}</div>
						<div className='modalFooter'>{modalFooter}</div>
					</div>
				</div>
			</ModalWrapepr>
			<ModalBackground rot={modalOpen} id={modalId}></ModalBackground>
		</>
	);
}

const ModalWrapepr = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	z-index: 1027;
	top: 0;
	left: 50%;

	transition: 0.3s ease-in-out;
	transform-origin: top;
	transform: ${(props) => (props.rot ? "scaleY(1)" : "scaleY(0)")};
	height: ${(props) => (props.rot ? "100%" : "0")};
	opacity: ${(props) => (props.rot ? "1" : "0")};
`;

const ModalBackground = styled.div`
	background-color: rgba(0, 0, 0, 0.8);
	position: fixed;
	z-index: 1026;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	/* transition: transform 0.1s ease-in-out; */
	transform: ${(props) => (props.rot ? "scale(1)" : "scale(0)")};
	/* height: ${(props) => (props.rot ? "100%" : "0")}; */
`;

export default memo(Modal);
