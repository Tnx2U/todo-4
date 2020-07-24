import Data from "../../controllers/data.js";

export default class Card {
  constructor(parentDom, colId, cardId, orderInColumn) {
    this.parentDom = parentDom;
    //수정 필요
    this.cardId = cardId;
    this.colId = colId;
    this.orderInColumn = orderInColumn;
    this.render();
  }

  render() {
    const cardInfo = Data.getCardDataById(this.colId, this.cardId);
    this.parentDom.insertAdjacentHTML(
      "beforeend",
      `<div class="card_wrap" id="card_${this.colId}_${this.cardId}">
    <div class="card_content">
        <img class="img_card"/>
        <div class="card_note">
            <span>${cardInfo.note}</span>
        </div>
        <button class="rem_card" id="btn_rem_${this.colId}_${this.cardId}">
          <img src="/public/images/close.svg" />
        </button>
        <button class="edit_card" id="btn_edit_${this.colId}_${this.cardId}">
          <img src="/public/images/edit.svg" />
        </button>
    </div>
    <div class="card_bottom">
        <span class="add_by">Added by</span>
        <span class="span_writer">${cardInfo.writer}</span>
    </div>
  `
    );
  }
}
