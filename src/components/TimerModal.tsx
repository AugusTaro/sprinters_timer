import { FC, useEffect, useState } from "react";
import { MyTimer } from "./MyTimer";

type Props = {
  formID: string;
  inputMinute: string;
  inputValue: string;
  isFinished: boolean;
  setIsFinished: (isFinidhed: boolean) => void;
};
export const TimerModal: FC<Props> = ({
  formID,
  inputMinute,
  inputValue,
  isFinished,
  setIsFinished,
}) => {
  const [storedMinute, setStoredMinute] = useState<number>(Number(inputMinute));
  const storedValue = localStorage.getItem(`savedInputValue_${formID}`);
  const [isRunning, setIsRunning] = useState(false);
  //   const storedMinute = Number(
  //     localStorage.getItem(`savedInputMinute_${formID}`)
  //   );
  const onClickOpenModal = () => {
    const modal = document.getElementById(`${formID}`) as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={onClickOpenModal}>
        スタート🔥
      </button>

      <dialog id={formID} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{inputValue}</h3>
          <div className="w-full flex items-center justify-center h-56 px10">
            <MyTimer
              initialMinute={Number(inputMinute)}
              isFinished={isFinished}
              setIsFinished={setIsFinished}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" disabled={isRunning}>
                閉じる
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
