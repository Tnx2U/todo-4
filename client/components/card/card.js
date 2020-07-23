import DragAndDrop from "../../controllers/dragAndDrop.js";
import ModalRander from "../../controllers/modalRander.js";
import Data from "../../controllers/data.js";

export default class Card {
  constructor(parentDom, colId, cardId, orderInColumn) {
    this.parentDom = parentDom;
    //수정 필요
    this.cardId = cardId;
    this.colId = colId;
    this.orderInColumn = orderInColumn;
    this.render();
    this.setEventListener();
  }

  setEventListener() {
    this.setRemoveCardEvent();
  }

  setRemoveCardEvent() {
    console.log("config in card at setEvent :", this.colId);
    this.parentDom
      .querySelector(".btn")
      .addEventListener("click", this.renderDeleteCardModal);
  }

  renderDeleteCardModal = () => {
    ModalRander.renderDeleteCardModal(
      this.colId,
      this.cardId,
      this.orderInColumn + 1
    );
  };

  removeEventListener() {
    this.parentDom
      .querySelector(".btn")
      .removeEventListener("click", this.renderDeleteCardModal);
    this.removeMouseMoveEvent();
  }

  render() {
    const cardInfo = Data.getCardDataById(this.colId, this.cardId);
    this.parentDom.innerHTML += `<div class="card_wrap" id="card_${this.colId}_${this.cardId}">
        <div class="card_content">
            <img class="img_card"/>
            <div class="card_note">
                <span>${cardInfo.note}</span>
            </div>
            <button class="btn" id="btn_${this.cardId}">
              <img src="/public/images/close.svg" />
            </button>
        </div>
        <div class="card_bottom">
            <span class="add_by">Added by</span>
            <span class="span_writer">${cardInfo.writer}</span>
        </div>
      `;
  }
}
