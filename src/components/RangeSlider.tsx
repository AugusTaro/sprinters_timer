import { FC, useState } from "react";

type Props = {
  inputMinute: string;
  setInputMinute: (number: string) => void;
  handleUpdate: () => void;
};
export const RangeSlider: FC<Props> = (props) => {
  const { inputMinute, setInputMinute, handleUpdate } = props;
  return (
    <>
      <div className="flex flex-row">
        <div>{inputMinute}:m</div>
        <input
          type="range"
          min={0}
          max="120"
          value={inputMinute}
          onChange={(e) => setInputMinute(e.target.value)}
          onTouchEnd={handleUpdate}
          onMouseUp={handleUpdate}
          className="range range-accent"
        />
      </div>
    </>
  );
};
