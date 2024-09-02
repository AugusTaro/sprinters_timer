import React, { useState, useEffect, FC, CSSProperties, useRef } from "react";
import { startAlarm } from "../utils/startAlarm";
import { startMutedAlarm } from "@/utils/startMutedAlarm";
type Props = {
  initialMinute: number;
  isRunning: boolean;
  setIsRunning: (isFinidhed: boolean) => void;
  isFinished: boolean;
  setIsFinished: (isFinidhed: boolean) => void;
};

// 分と秒をフォーマットする関数

export const MyTimer: FC<Props> = (props) => {
  const { initialMinute, isFinished, setIsFinished, isRunning, setIsRunning } =
    props;
  const initialSeconds: number = initialMinute * 60;
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);

  const audioContextRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    setTotalSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    setTotalSeconds(initialSeconds);
    if (totalSeconds > 0 && isRunning) {
      const intervalId = setInterval(() => {
        if (isRunning) {
          // setMinuteの引数に関数を渡すと、その引数としてstateの以前の状態を渡せる
          setTotalSeconds((prevTotalSeconds) => {
            return prevTotalSeconds - 1;
          });
        }
      }, 1000);

      // クリーンアップ関数でインターバルをクリア
      return () => clearInterval(intervalId);
    }
  }, [isRunning]);

  useEffect(() => {
    if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      startAlarm(audioContextRef.current);
    }
  });
  const OnClickStart = () => {
    if (!audioContextRef.current) {
      // AudioContextをユーザーの操作で初期化
      audioContextRef.current = new window.AudioContext();
      startMutedAlarm(audioContextRef.current);
    }
    setIsRunning(!isRunning);
  };

  return (
    <div>
      <div>
        <h1>残り時間</h1>
        <span className="countdown font-mono text-7xl">
          <span
            style={{ ["--value" as string]: Math.floor(totalSeconds / 60) }}
          ></span>
          :
          {totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60}
        </span>
      </div>
      <button
        className="btn btn-primary"
        onClick={OnClickStart}
        disabled={isRunning}
      >
        スタート
      </button>
    </div>
  );
};
