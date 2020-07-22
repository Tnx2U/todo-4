export default class DragAndDrop {
  static columnRootElement = null;
  static draggedCard = null;
  static enteredColumn = null;
  static initialize() {
    this.columnRootElement = document.querySelector(".column_wrap");
    this.columnRootElement.addEventListener("mousedown", this.onMouseDown);
  }

  static onMouseDown = (e) => {
    this.setDraggedCard(e);
    if (!this.isCardDragged()) return;
    this.setCapturedCard();
    this.setRelativePositionInCard(e);
    this.columnRootElement.addEventListener("mousemove", this.onMouseMove);
    this.columnRootElement.addEventListener("mouseup", this.onMouseUp);
  };

  static setDraggedCard(e) {
    const draggedCard = e.target.closest(".card_wrap");
    if (draggedCard) {
      this.draggedCard = draggedCard;
    }
  }

  static clearDraggedCard() {
    this.draggedCard = null;
  }

  static isCardDragged() {
    return this.draggedCard !== null;
  }

  static onMouseMove = (e) => {
    this.capturedCard.style.left =
      e.clientX - 17 - this.relativeLeftInCard + "px";
    this.capturedCard.style.top =
      e.clientY - 17 - this.relativeTopInCard + "px";
  };

  static onMouseUp = (e) => {
    this.columnRootElement.removeEventListener("mousemove", this.onMouseMove);
    this.columnRootElement.removeEventListener("mouseup", this.onMouseUp);
    this.capturedCard.classList.add("hidden");
    this.clearDraggedCard();
  };

  static setCapturedCard() {
    this.capturedCard = document.querySelector("#card_capture");
    this.capturedCard.innerHTML = this.draggedCard.innerHTML;
    this.capturedCard.classList.remove("hidden");
  }

  static setRelativePositionInCard(e) {
    const bounds = this.draggedCard.getBoundingClientRect();
    this.relativeLeftInCard = e.clientX - bounds.left;
    this.relativeTopInCard = e.clientY - bounds.top;
    this.capturedCard.style.left = bounds.left - 17 + "px";
    this.capturedCard.style.top = bounds.top - 17 + "px";
  }
}
