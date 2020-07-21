import Data from "./data.js";

export default class DragAndDrop {
  static draggedCard = null;
  static enteredCard = null;
  static enteredColumn = null;
  static relativeTopInCard = 0;
  static relativeLeftInCard = 0;
  static dummyCardDirection = true;

  static updateDummyCardDirection(e, card) {
    const element = card.element;
    if (this.isLocatedUp(e, element) !== this.dummyCardDirection) {
      this.popCardInfo();
      this.setDummyCardDirection(e, element);
      this.pushCardInfo();
      this.enteredColumn.update();
      this.addClassToDummyCard(card);
    }
  }

  static addClassToDummyCard(card) {
    const dummyCardElement = document.querySelector(
      `#card_${card.colId}_${
        this.dummyCardDirection ? card.orderInColumn : card.orderInColumn + 1
      }`
    );
    dummyCardElement.classList.add("dummy");
  }

  static removeClassToDummyCard() {
    const dummyCardElement = document.querySelector(".dummy");
    dummyCardElement.classList.remove("dummy");
  }
  static isEnteredColumn() {
    return this.enteredCard !== null;
  }
  static onEnterColumn(e, column) {
    this.enteredColumn = column;
  }

  static isDragging() {
    return this.draggedCard !== null;
  }

  static isEnteredCard() {
    return this.enteredCard !== null;
  }

  static onMouseLeave(e) {
    this.clearEnteredCard();
  }
  static clearEnteredCard() {
    this.popCardInfo();
    this.enteredCard = null;
    this.removeClassToDummyCard();
    this.enteredColumn.update();
  }

  static popCardInfo() {
    Data.popCardByColIdAndCardOrder(
      this.enteredCard.colId,
      this.dummyCardDirection
        ? this.enteredCard.orderInColumn
        : this.enteredCard.orderInColumn + 1
    );
  }

  static pushCardInfo() {
    Data.pushCardByColIdAndCardOrder(
      this.enteredCard.colId,
      this.dummyCardDirection
        ? this.enteredCard.orderInColumn
        : this.enteredCard.orderInColumn + 1,
      this.draggedCard.getCardInfo()
    );
  }

  static onEnterOtherCard(e, card) {
    this.setEnteredCard(card);
    this.setDummyCardDirection(e, card.element);
    this.pushCardInfo();
    this.enteredColumn.update();
    this.addClassToDummyCard(card);
  }
  static setEnteredCard(card) {
    this.enteredCard = card;
  }
  static setDummyCardDirection(e, cardElement) {
    this.dummyCardDirection = this.isLocatedUp(e, cardElement);
  }
  static isLocatedUp(e, element) {
    const bounds = element.getBoundingClientRect();
    const midOfYInEnteredCard = bounds.top + bounds.height / 2;
    const mouseY = e.clientY;
    return midOfYInEnteredCard > mouseY;
  }

  static setDraggedCard(e, card) {
    this.draggedCard = card;
    this.setCaptureImage(e);
    this.setEventListener();
  }

  static onMouseMove = (e) => {
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
    this.isEnteredColumn() && this.removeClassToDummyCard();
    this.toggleCaptureImageVisible();
    this.draggedCard = null;
    this.enteredCard = null;
    this.enteredColumn = null;
  };
  static setMouseUpEvent() {
    window.addEventListener("mouseup", this.onMouseUp);
  }

  static setCaptureImage(e) {
    this.toggleCaptureImageVisible();
    this.setCaptureImageInfo();
    this.setRelativePositionInCard(e);
  }

  static toggleCaptureImageVisible() {
    const cardElement = document.querySelector(".ondrag");
    cardElement.classList.toggle("hidden");
  }

  static setCaptureImageInfo() {
    const cardElement = document.querySelector(".ondrag");
    cardElement.innerHTML = this.draggedCard.getInnerHtml();
  }

  static setRelativePositionInCard(e) {
    const bounds = this.draggedCard.element.getBoundingClientRect();
    this.relativeLeftInCard = e.clientX - bounds.left;
    this.relativeTopInCard = e.clientY - bounds.top;
    document.querySelector(".ondrag").style.left = bounds.left - 17 + "px";
    document.querySelector(".ondrag").style.top = bounds.top - 17 + "px";
  }
}
