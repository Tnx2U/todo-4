import DragAndDrop from "../../controllers/dragAndDrop.js";
import Data from "../../controllers/data.js";

export default class Card {
  constructor(parentDom, colId, cardId) {
    this.parentDom = parentDom;
    this.cardId = cardId;
    this.colId = colId;
    this.render();
  }

  dragStart() {
    DragAndDrop.setDraggedCard(this);
  }

  setMouseDownEvent() {
    this.element.addEventListener("mousedown", () => this.dragStart());
  }

  setMouseEnterEvent() {
    this.element.addEventListener("mouseenter", () => {});
  }

  render() {
    const cardInfo = Data.getCardDataById(this.colId, this.cardId);
    this.parentDom.innerHTML += `<div class="card_wrap" id="card_${this.cardId}">
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

  update() {
    this.remove();
    this.render();
  }

  remove() {
    var child = this.element.lastElementChild;
    while (child) {
      this.element.removeChild(child);
      child = e.lastElementChild;
    }
  }
}
