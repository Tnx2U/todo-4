import Modal from "../components/modal/modal.js";

export default class ModalRander {
  static modalType = null;

  static renderDeleteCardModal(colId, cardId, order) {
    //1. 모달 wrapper 활성화 및 배경 불투명
    this.showModal();

    //2. 모달 wrapper에 파라미터와 함께 htmladject
    this.modalType = "deleteCard";
    let config = { colId: colId, cardId: cardId, order: order };
    new Modal(this.modalType, config);
  }

  static hideModal() {
    document.querySelector(".modal_wrap").style.display = "none";
  }

  static showModal() {
    document.querySelector(".modal_wrap").style.display = "block";
  }
}
