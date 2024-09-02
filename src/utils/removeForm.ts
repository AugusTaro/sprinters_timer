// フォームを削除する
const removeForm = (formID: string) => {
  localStorage.removeItem(`savedInputValue_${formID}`); // localStorageからも削除
};
