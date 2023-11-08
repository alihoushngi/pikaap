import React, { memo } from "react";
import styled from "styled-components";

const ProgressBar = ({ style }) => {
	return (
		<ProgressWrapepr>
			<ProgressData style={style}></ProgressData>
		</ProgressWrapepr>
	);
};

const ProgressWrapepr = styled.div`
	width: 100%;
	height: 6px;
	margin-bottom: 0.5rem;
	border-radius: 5px;
	background-color: #1b1b29;
	position: relative;
`;
const ProgressData = styled.div`
	height: 100%;
	background-color: #3699ff;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	position: absolute;
`;

export default memo(ProgressBar);
