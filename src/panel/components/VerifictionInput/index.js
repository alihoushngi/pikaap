import React, { useEffect, useState } from "react";
import styled from "styled-components";

const VerifictionInput = ({ value, setValue }) => {
	const [input, setInput] = useState("");

	useEffect(() => {
		setValue(input);
	}, [input]);

	// function inputFilter(e) {
	// 	var key = e.keyCode || e.which;
	// 	if (
	// 		(!e.shiftKey && !e.altKey && !e.ctrlKey && key >= 48 && key <= 57) ||
	// 		(key >= 96 && key <= 105) ||
	// 		key === 8 ||
	// 		key === 9 ||
	// 		key === 13 ||
	// 		key === 37 ||
	// 		key === 39
	// 	) {
	// 	} else {
	// 		return false;
	// 	}
	// }

	return (
		<>
			<VerifyInput
				type='text'
				name='reaciveCode'
				required
				maxLength='5'
				autoComplete='off'
				onChange={(e) => {
					// inputFilter(e);
					setInput(e.target.value);
				}}
			/>
			<SpanWrapper>
				<VFSpan></VFSpan>
				<VFSpan></VFSpan>
				<VFSpan></VFSpan>
				<VFSpan></VFSpan>
				<VFSpan></VFSpan>
			</SpanWrapper>
		</>
		// <VerificationCode>
		// 	<VerifyInput
		// 		type='text'
		// 		placeholder='_'
		// 		name='reaciveCode'
		// 		required
		// 		maxLength='1'
		// 		pattern='[0-9]'
		// 		onChange={(e) => {
		// 			setInput(e.target.value);
		// 		}}
		// 	/>
		// 	<VerifyInput
		// 		type='text'
		// 		placeholder='_'
		// 		name='reaciveCode'
		// 		required
		// 		maxLength='1'
		// 		pattern='[0-9]'
		// 		onChange={(e) => {
		// 			setInput2(e.target.value);
		// 		}}
		// 	/>
		// 	<VerifyInput
		// 		type='text'
		// 		placeholder='_'
		// 		name='reaciveCode'
		// 		required
		// 		maxLength='1'
		// 		pattern='[0-9]'
		// 		onChange={(e) => {
		// 			setInput3(e.target.value);
		// 		}}
		// 	/>
		// 	<VerifyInput
		// 		type='text'
		// 		placeholder='_'
		// 		name='reaciveCode'
		// 		required
		// 		maxLength='1'
		// 		pattern='[0-9]'
		// 		onChange={(e) => {
		// 			setInput4(e.target.value);
		// 		}}
		// 	/>
		// 	<VerifyInput
		// 		type='text'
		// 		placeholder='_'
		// 		name='reaciveCode'
		// 		required
		// 		maxLength='1'
		// 		pattern='[0-9]'
		// 		onChange={(e) => {
		// 			setInput5(e.target.value);
		// 		}}
		// 	/>
		// </VerificationCode>
	);
};

const VerificationCode = styled.div`
	display: flex;
	direction: ltr;
`;
const SpanWrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	direction: ltr;
	gap: 23px;
	margin-top: -10px;
`;
const VFSpan = styled.span`
	width: 20px;
	border-bottom: 1px solid #fff;
`;

const VerifyInput = styled.input`
	position: relative;
	background-clip: padding-box;
	border: 1px solid #323248;
	padding-top: 0.4rem;
	padding-bottom: 0.4rem;
	padding-left: 6.6rem;
	/* caret-color: transparent; */

	direction: ltr;
	border-radius: 0.625rem;
	background-color: #1e1e2d;
	border-color: #1e1e2d;
	color: #92929f;
	transition: color 0.2s ease, background-color 0.2s ease;
	display: block;
	height: 50px;
	margin-right: 0.5rem;
	text-align: left;
	font-size: 1.25rem;
	letter-spacing: 2rem;
	min-width: 0;

	:last-child {
		margin-right: 0;
	}

	:focus {
		background-color: #171723 !important;
		border-color: #171723 !important;
	}
`;

export default VerifictionInput;
