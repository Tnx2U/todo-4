import DragAndDrop from "../../controllers/dragAndDrop.js";

export default class Card {
  constructor(element, cardInfo, cardIndex) {
    this.element = element;
    this.note = cardInfo.note;
    this.writer = cardInfo.writer;
    this.cardId = cardInfo.cardId;
    this.cardIndex = cardIndex;
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
    this.element.insertAdjacentHTML(
      "beforeend",
      ` <div class="card_content">
            <img class="img_card"/>
            <div class="card_note">
                <span>${this.note}</span>
            </div>
            <button class="btn" id="btn_${this.cardIndex}">
              <img src="/public/images/close.svg" />
            </button>
        </div>
        <div class="card_bottom">
            <span class="add_by">Added by</span>
            <span class="span_writer">${this.writer}</span>
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
