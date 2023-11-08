import React, { Children, useState } from "react";
import styled from "styled-components";
import CustomButton from "../CustomButton";

const EditModal = ({
	buttonContent,
	modalTitle,
	onSubmitClick,
	modalId,
	content,
	onModalOpen,
	isOpen = false,
	onCancelModal,
}) => {
	// const [modalOpen, setModalOpen] = useState(isOpen);
	return (
		<>
			<div
				onClick={() => {
					onModalOpen();
				}}
			>
				{buttonContent}
			</div>
			<ModalWrapepr rot={isOpen}>
				<div className='modalDialog'>
					<div className='modalContent'>
						<div className='modalBody'>
							<div className='TModalWrapper'>
								<h2>{modalTitle}</h2>
								<div className='modalContent'>{content}</div>
								<div className='YesOrNo'>
									<div style={{ marginLeft: 4 }}>
										<CustomButton text={"تایید"} onClick={onSubmitClick} />
									</div>
									<CustomButton
										isDanger
										text={"لغو"}
										onClick={() => {
											onCancelModal();
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ModalWrapepr>
			<ModalBackground rot={isOpen} id={modalId}></ModalBackground>
		</>
	);
};

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
	transition: transform 0.1s ease-in-out;
	transform: ${(props) => (props.rot ? "scale(1)" : "scale(0)")};
	height: ${(props) => (props.rot ? "100%" : "0")};
`;

export default EditModal;
