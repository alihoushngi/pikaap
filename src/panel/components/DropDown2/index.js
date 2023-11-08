import React, { memo, useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const DropDown2 = ({
  style,
  boxStyle,
  isError,
  isLoading,
  data,
  onSelected,
  labelName,
  formData,
  setFormData,
  defaultItem,
  onValueChange,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState({
    label: defaultItem ? defaultItem.label : "",
    value: defaultItem ? defaultItem.value : "",
  });

  useEffect(() => {
    setInput({ label: "انتخاب بر اساس ...", value: "" });
  }, []);

  const ref = useRef();

  useEffect(() => {
    const closeDropDown2 = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.body.addEventListener("click", closeDropDown2);
    return () => {
      document.body.removeEventListener("click", closeDropDown2);
    };
  }, []);

  const onClickHandler = () => {
    setIsActive((pre) => !pre);
  };

  return (
    <div className="menuLink" ref={ref}>
      <div className="itemRow" onClick={onClickHandler}>
        {labelName && (
          <label htmlFor="cart" className="label">
            <span className="required">{labelName}</span>
          </label>
        )}
        <InputWrapper>
          <input
            className="form-input pointer"
            name="province"
            readOnly
            type="text"
            autoComplete="off"
            value={input.label}
          />

          <Icon rot={isActive} id="icon-toggle" style={style}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="15px"
              height="15px"
              viewBox="0 0 52 52"
              enableBackground="new 0 0 52 52"
              fill="#92929F"
            >
              <path d="M8.3,14h35.4c1,0,1.7,1.3,0.9,2.2L27.3,37.4c-0.6,0.8-1.9,0.8-2.5,0L7.3,16.2C6.6,15.3,7.2,14,8.3,14z" />
            </svg>
          </Icon>
        </InputWrapper>
      </div>
      <Select vis={isActive} style={boxStyle} className="selectClass">
        {isError && (
          <List>
            <Item>
              <span>مشکلی پیش اومده</span>
            </Item>
          </List>
        )}
        {isLoading ? (
          <List>
            <Item>
              <span>در حال بارگذاری</span>
            </Item>
          </List>
        ) : (
          data && (
            <>
              <List>
                {data.map((item, i) => {
                  return (
                    <Item
                      onClick={() => {
                        setInput({ value: item.value, label: item.label });
                        onSelected({
                          value: item.value,
                          label: item.label,
                        });
                        setIsActive((prev) => !prev);
                      }}
                      key={i}
                    >
                      {item.label}
                    </Item>
                  );
                })}
              </List>
            </>
          )
        )}
      </Select>
    </div>
  );
};

const Icon = styled.i`
  transition: 0.3s;
  transform: ${(props) => (props.rot ? "rotate(180deg)" : "rotate(0deg)")};
  left: 10px;
  position: absolute;
  top: 14px;
  cursor: pointer;
  @media (max-width: 1314px) {
    position: absolute;
    margin-right: 1rem;
  }
`;

const Select = styled.div`
  transition: 0.3s cubic-bezier(0.25, 0.1, 0.15, 0.64);
  transform-origin: top;
  transform: ${(props) => (props.vis ? "scaleY(1)" : "scaleY(0)")};
  height: ${(props) => (props.vis ? "unset" : "0")};
  position: absolute;
  z-index: 10000;
  box-shadow: 2px 4px 30px #1d1d22;
  width: 30%;

  @media (max-width: 1314px) {
    position: absolute;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const List = styled.ul`
  background-color: #171723;
  overflow-y: scroll;
  max-height: 370px;
  min-width: 200px;
  border-radius: 0.5rem;
  &::-webkit-scrollbar {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #3699ff;
  }
`;

const Item = styled.li`
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

export default memo(DropDown2);
