import ModalRander from "../../controllers/modalRander.js";
import { deleteCard } from "../../apis/card.js";

export default class Modal {
  constructor(type, config) {
    this.element = document.querySelector(".modal_wrap");
    this.type = type;
    this.config = config;
    this.render(type);
    this.setEventListener();
  }

  setEventListener() {
    this.setClickConfirmEvent();
    this.setClickCancelEvent();
  }

  removeEventListener() {
    this.element
      .querySelector(".btn_deletecard_cancel")
      .removeEventListener("click", this.cancelRemoveCard);
    this.element
      .querySelector(".btn_deletecard_confirm")
      .removeEventListener("click", this.removeCard);
  }

  setClickConfirmEvent() {
    this.element
      .querySelector(".btn_deletecard_cancel")
      .addEventListener("click", this.cancelRemoveCard);
  }

  setClickCancelEvent() {
    this.element
      .querySelector(".btn_deletecard_confirm")
      .addEventListener("click", this.removeCard);
  }

  cancelRemoveCard = () => {
    this.remove();
    ModalRander.hideModal();
  };

  removeCard = () => {
    //card api를 통해 카드 삭제 요청
    //해당 컬럼 리랜더링은 어디서 할지 생각
    deleteCard(this.config.colId, this.config.cardId, this.config.order);
    ModalRander.hideModal();
  };

  remove() {
    this.removeEventListener();
    var child = this.element.lastElementChild;
    while (child) {
      this.element.removeChild(child);
      child = this.element.lastElementChild;
    }
  }

  render(type) {
    let htmlSrc;
    if (type == "editNote") {
      htmlSrc = ``;
    } else if (type == "editTitle") {
      htmlSrc = ``;
    } else if (type == "deleteCard") {
      htmlSrc = `
      <div class="modal_content">
        <div class="modal_text_area">
            <span>선택하신 카드를 삭제하시겠습니까?</span>
        </div>
        <div class="modal_button_area">
            <button class="btn_deletecard_cancel">취소</button>
            <button class="btn_deletecard_confirm">확인</button>
        </div>
      </div>
      <div class="modal_layer">
      </div>
      `;
    }
    this.element.insertAdjacentHTML("beforeend", htmlSrc);
  }
}
