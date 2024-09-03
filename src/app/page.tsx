"use client";
import MyForm from "@/components/MyForm";

// pages/index.tsx
import { useEffect, useState } from "react";

type Form = {
  formID: string;
  inputValue: string;
  inputMinute: string;
};

const Home = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const date = new Date();
  // フォームリストの作成（このコードの理解が乏しい）
  // useStateに関数（初期化関数）を渡すと、その返却値が初期値として設定される。
  const [formList, setFormList] = useState<string[]>([]); // 初期値は空の配列

  useEffect(() => {
    // コンポーネントがマウントされたときにlocalStorageから値を取得
    const storedValue = localStorage.getItem(`savedInputValue_home`);
    if (storedValue) {
      setInputValue(storedValue);
    }

    const storedFormList = localStorage.getItem("formList");
    if (storedFormList) {
      setFormList(JSON.parse(storedFormList));
    } else {
      addForm(); // もし保存されたリストがなければ、デフォルトでフォームを1つ追加
    }
  }, []);

  // タッチエンドイベントを検知するためのステート
  const [touchEnded, setTouchEnded] = useState(false);
  const handleTouchEnd = () => {
    setTouchEnded((prevState) => !prevState); // 状態をトグルして再レンダリングをトリガー
  };

  // ページロード時にlocalStorageから値を取得
  useEffect(() => {
    const storedValue = localStorage.getItem(`savedInputValue_home`);
    if (storedValue) {
      setInputValue(storedValue);
    }
  }, []);

  // フォームを追加する
  const addForm = () => {
    const newformID = `form_${Date.now()}`; // ユニークなIDを生成
    if (formList.length < 5) {
      const updatedFormList = [...formList, newformID];
      setFormList(updatedFormList);
      localStorage.setItem("formList", JSON.stringify(updatedFormList));
    }
  };

  // フォームを削除する
  const removeForm = (formID: string) => {
    setFormList(formList.filter((id) => id !== formID));
    localStorage.removeItem(`savedInputValue_${formID}`); // localStorageからも削除
  };

  const clearLocalStorage = () => {
    localStorage.clear(); // ローカルストレージの全データを削除
    setFormList([]); // formListの状態を空にリセット
    setInputValue("");
  };

  const calculateTotalMinutes = () => {
    return formList.reduce((total, formID) => {
      const savedMinute = localStorage.getItem(`savedInputMinute_${formID}`);
      return total + (savedMinute ? parseInt(savedMinute) : 0);
    }, 0);
  };

  const handleBlur = () => {
    localStorage.setItem(`savedInputValue_home`, inputValue);
  };

  const totalMinutes = calculateTotalMinutes();
  const now = new Date(); // 現在時刻を取得
  const futureTime = new Date(now.getTime() + totalMinutes * 60000); // 分をミリ秒に変換して加算

  const hours = futureTime.getHours();
  const minutes = futureTime.getMinutes().toString().padStart(2, "0"); // 分を2桁にフォーマット

  return (
    <>
      <div className="min-h-screen flex flex-col items-center  bg-base-200 py-8 px-2">
        <div className="w-full max-w-md p-6 border rounded-lg shadow-md ">
          <input
            type="text"
            id={`inputField_home`}
            placeholder="目標を記入"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleBlur}
            className="text-2xl font-bold text-center mb-4 w-full border "
          />
          所要時間：{totalMinutes}分 推定終了時刻{hours}:{minutes}
          <div className="flex flex-row">
            <div className="flex items-center my-4 space-x-2">
              <h2 className="text-xl font-semibold mb-2">タイマーの追加</h2>
              <button onClick={addForm} className="btn btn-primary ">
                ＋
              </button>
            </div>
          </div>
          <div className="max-w-lg mx-auto overflow-y-auto max-h-96">
            <ul className="list-disc pl-5">
              {formList.map((formID, index) => (
                <li key={formID} className="mb-2">
                  <MyForm
                    formID={formID}
                    key={formID}
                    handleRemove={removeForm}
                    handleTouchEnded={handleTouchEnd}
                  />
                </li>
              ))}
            </ul>
            <button onClick={clearLocalStorage} className="btn btn-info mt-2">
              リセット
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
