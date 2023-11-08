import React from "react";
import "./index.scss";
import styled from "styled-components";
//Items
// Background color
// hover color
//on click on each button

function CustomButtonGroup(props) {
  const { items, backgroundColor = "#000", hoverColor = "#44f", onClick, header, selected } = props;

  const itemBackgroundStyle = {
    backgroundColor,
  };
  return (
    <div id="custom-button-group-container">
      {header && <h2>{header}</h2>}
      <div className="cbg-items-holder">
        {items.map((item, index) => (
          <Item
            key={"cbg-" + index}
            onClick={() => onClick(item)}
            style={itemBackgroundStyle}
            hoverColor={hoverColor}
            backgroundColor={backgroundColor}
            className={selected === item && "selected"}
          >
            {item}
          </Item>
        ))}
      </div>
    </div>
  );
}

const Item = styled.p`
  ${({ hoverColor, backgroundColor, isSelected }) => `
   &:hover {
    background-color: ${hoverColor} !important;
    color:${backgroundColor}

  }
  `}
`;
export default CustomButtonGroup;
