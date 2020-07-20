import DragAndDrop from "../../controllers/dragAndDrop.js";
import Data from "../../controllers/data.js";

export default class Card {
  constructor(element, colId, cardId) {
    this.element = element;
    this.cardId = cardId;
    this.colId = colId;
    this.setMouseDownEvent();
    this.render();
  }

  dragStart(e) {
    DragAndDrop.setDraggedCard(e, this);
  }

  setMouseDownEvent() {
    this.element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this.dragStart(e);
    });
  }

  setMouseEnterEvent() {
    this.element.addEventListener("mouseenter", () => {});
  }

  getCardInfo() {
    return Data.getCardDataById(this.colId, this.cardId);
  }

  getInnerHtml() {
    return this.element.innerHTML;
  }

  render() {
    const cardInfo = this.getCardInfo();
    this.element.insertAdjacentHTML(
      "beforeend",
      ` <div class="card_content">
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
      `
    );
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
