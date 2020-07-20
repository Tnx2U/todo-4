import Card from "../components/card/card.js";

export default class DragAndDrop {
  static draggedCard = null;
  static enteredCard = null;
  static relativeTopInCard = 0;
  static relativeLeftInCard = 0;

  static setDraggedCard(e, card) {
    this.draggedCard = card;
    this.setCaptureImage(e);
    this.setEventListener();
  }

  static onMouseMove = (e) => {
    e.preventDefault();
    document.querySelector(".ondrag").style.left =
      e.clientX - 17 - this.relativeLeftInCard + "px";
    document.querySelector(".ondrag").style.top =
      e.clientY - 17 - this.relativeTopInCard + "px";
  };

  static setEventListener() {
    this.setMouseMoveEvent();
    this.setMouseUpEvent();
  }

  static setMouseMoveEvent() {
    window.addEventListener("mousemove", this.onMouseMove);
  }
  static onMouseUp = (e) => {
    e.preventDefault();
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  };
  static setMouseUpEvent() {
    window.addEventListener("mouseup", this.onMouseUp);
  }

  static setCaptureImage(e) {
    const cardElement = document.querySelector(".ondrag");
    cardElement.innerHTML = this.draggedCard.getInnerHtml();
    const bounds = this.draggedCard.element.getBoundingClientRect();
    this.relativeLeftInCard = e.clientX - bounds.left;
    this.relativeTopInCard = e.clientY - bounds.top;
    document.querySelector(".ondrag").style.left = bounds.left - 17 + "px";
    document.querySelector(".ondrag").style.top = bounds.top - 17 + "px";
  }
}
