import DragAndDrop from "../../controllers/dragAndDrop.js";
import Data from "../../controllers/data.js";

export default class Card {
  constructor(element, colId, cardId, orderInColumn) {
    this.element = element;
    this.cardId = cardId;
    this.colId = colId;
    this.orderInColumn = orderInColumn;
    this.render();
    this.setEventListener();
  }

  setEventListener() {
    this.setMouseDownEvent();
    this.setMouseEnterEvent();
    this.setMouseLeaveEvent();
    this.setMouseMoveEvent();
  }

  removeEventListener() {
    this.removeMouseEnterEvent();
    this.element.removeEventListener("mousedown", this.dragStart);
    this.element.removeEventListener("mouseleave", this.onMouseLeave);
    this.removeMouseMoveEvent();
  }

  moveStart = (e) => {
    if (DragAndDrop.isDragging() && DragAndDrop.isEntered()) {
      DragAndDrop.updateDummyCardDirection(e, this.element);
    }
  };

  setMouseMoveEvent() {
    this.element.addEventListener("mousemove", this.moveStart);
  }

  removeMouseMoveEvent() {
    this.element.removeEventListener("mousemove", this.moveStart);
  }

  dragStart = (e) => {
    DragAndDrop.setDraggedCard(e, this);
  };

  setMouseDownEvent() {
    this.element.addEventListener("mousedown", this.dragStart);
  }

  onMouseEnter = (e) => {
    e.preventDefault();
    if (DragAndDrop.isDragging() && !DragAndDrop.isEntered()) {
      DragAndDrop.onEnterOtherCard(e, this);
      this.removeMouseEnterEvent();
    }
  };

  setMouseEnterEvent() {
    this.element.addEventListener("mouseenter", this.onMouseEnter);
  }

  removeMouseEnterEvent() {
    this.element.removeEventListener("mouseenter", this.onMouseEnter);
  }

  onMouseLeave = (e) => {
    if (DragAndDrop.isDragging() && DragAndDrop.isEntered()) {
      DragAndDrop.clearEnteredCard();
      this.setMouseEnterEvent();
    }
  };

  setMouseLeaveEvent() {
    this.element.addEventListener("mouseleave", this.onMouseLeave);
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
    this.removeEventListener();
    var child = this.element.lastElementChild;
    while (child) {
      this.element.removeChild(child);
      child = this.element.lastElementChild;
    }
  }
}
