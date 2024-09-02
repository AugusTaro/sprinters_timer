import { FC, useEffect, useState } from "react";
import { TimerModal } from "./TimerModal";
import { RangeSlider } from "./RangeSlider";
import { openModal } from "@/utils/openModal";

type Props = {
  formID: string; // ユニークなIDを受け取るためのプロップス
  handleRemove: (formID: string) => void;
  handleTouchEnded: () => void;
};

const MyForm: FC<Props> = ({ formID, handleRemove, handleTouchEnded }) => {
  const [inputValue, setInputValue] = useState<string>(() => {
    return localStorage.getItem(`savedInputValue_${formID}`) || "";
  });

  const [inputMinute, setInputMinute] = useState<string>(() => {
    return localStorage.getItem(`savedInputMinute_${formID}`) || "30";
  });

  const [isFinished, setIsFinished] = useState(false);

  // keybordを閉じる
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // フォームの送信を防ぐ
      (e.target as HTMLInputElement).blur(); // フォーカスを外してキーボードを閉じる
    }
  };
  // ストレージに値を保存
  const handleUpdate = () => {
    localStorage.setItem(`savedInputValue_${formID}`, inputValue);
    localStorage.setItem(`savedInputMinute_${formID}`, inputMinute);
    handleTouchEnded();
  };

  // タイマーが終了した時の動作
  useEffect(() => {
    if (isFinished) {
      openModal("fin_modal");
    }
  }, [isFinished, formID, handleRemove]);
  return (
    <div className="border max-w-md mx-auto  p-8 rounded shadow">
      <div className="mb-4 space-y-3 ">
        <input
          type="text"
          id={`inputField_${formID}`}
          placeholder="任意：目標を記入"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 border rounded"
        />

        <RangeSlider
          inputMinute={inputMinute}
          setInputMinute={setInputMinute}
          handleUpdate={handleUpdate}
        />
      </div>
      <div className="flex space-x-4">
        <TimerModal
          formID={formID}
          inputMinute={inputMinute}
          inputValue={inputValue}
          isFinished={isFinished}
          setIsFinished={setIsFinished}
        />
        <button
          onClick={() => handleRemove(formID)}
          className="btn btn-secondary "
        >
          削除
        </button>
      </div>

      {/* 完了時に開くmodal */}
      <dialog id="fin_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">やったぜ！</h3>
          <p className="py-4">スプリントが終了しました。お疲れ様です。</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={() => handleRemove(formID)}>
                閉じる
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyForm;
