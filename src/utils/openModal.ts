export const openModal = (modalID: string) => {
  const modal = document.getElementById("fin_modal") as HTMLDialogElement;
  if (modal) {
    modal.showModal();
  }
};
