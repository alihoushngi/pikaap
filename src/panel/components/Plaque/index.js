import React, { useEffect, useState } from "react";
import { useFocus } from "../../hooks";
import "./index.scss";

const Plaque = ({ onChange }) => {
  const [two, setTwo] = useState();
  const [three, setThree] = useState();
  const [letter, setLetter] = useState();
  const [iran, setIran] = useState();

  const [iranRef, setFocusIran] = useFocus();
  const [threeRef, setThreeFocus] = useFocus();
  const [letterRef, setLetterFocus] = useFocus();
  const [twoRef, setTwoFocus] = useFocus();

  useEffect(() => {
    onChange({
      twoDigit: two,
      letter,
      threeDigit: three,
      iran,
    });
  }, [two, three, letter, iran]);

  function onlyPersianLetter(str) {
    return /^[ آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیئ\s]+$/.test(str);
  }

  return (
    <div id="plaque-container">
      <div className="right">
        <input
          ref={iranRef}
          value={iran}
          onChange={(val) => {
            if (val.currentTarget.value.length < 3) setIran(parseInt(val.currentTarget.value));
          }}
        />
      </div>
      <div className="left">
        <div className="three">
          <input
            ref={threeRef}
            value={three}
            onChange={(val) => {
              if (val.currentTarget.value.length === 3) setFocusIran();
              if (val.currentTarget.value.length < 4) setThree(parseInt(val.currentTarget.value));
            }}
          />
        </div>
        <div className="letter">
          <input
            ref={letterRef}
            value={letter}
            onChange={(val) => {
              if (val.currentTarget.value.length === 1 && onlyPersianLetter(val.currentTarget.value)) setThreeFocus();
              if (val.currentTarget.value.length < 2) {
                if (onlyPersianLetter(val.currentTarget.value)) setLetter(val.currentTarget.value);
                else setLetter("");
              }
            }}
          />
        </div>
        <div className="two">
          <input
            autoFocus
            ref={twoRef}
            value={two}
            onChange={(val) => {
              if (val.currentTarget.value.length === 2) setLetterFocus();
              if (val.currentTarget.value.length < 3) setTwo(parseInt(val.currentTarget.value));
            }}
          />
        </div>
      </div>
      <div className="left-plaque" />
    </div>
  );
};

export default Plaque;
