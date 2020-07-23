import Data from "./data.js";

export default class DragAndDrop {
  static columnRootElement = null;
  static draggedCard = null;
  static enteredColumn = null;
  static enteredCard = null;
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
    this.draggedCard.classList.add("hidden");
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
    const beforeEnteredCard = this.enteredCard;
    const beforeDirection = this.dummyCardDirection;
    this.setCapturedCardPosition(e);
    this.setEnteredColumn(e);
    this.setEnteredCard(e);

    if (!this.isColumnEntered()) {
      return;
    }
    if (this.isCardEntered()) {
      if (this.enteredCard.classList.contains("dummy")) return;
      this.setDummyCardDirection(e);
      if (beforeEnteredCard !== this.enteredCard) {
        this.clearDummyCard();
        this.insertDummyCard();
      } else {
        if (beforeDirection !== this.dummyCardDirection) {
          this.clearDummyCard();
          this.insertDummyCard();
        }
      }
      return;
    }
    this.clearDummyCard();
    this.insertDummyCard();
  };

  static insertDummyCard() {
    const dummyCard = document.createElement("div");
    dummyCard.classList.add("dummy", "card_wrap");
    dummyCard.innerHTML = this.draggedCard.innerHTML;
    let referenceNode = this.isCardEntered()
      ? this.dummyCardDirection
        ? this.enteredCard
        : this.enteredCard.nextSibling
      : null;
    const columnCards = this.enteredColumn.querySelector(".column_cards");
    columnCards.insertBefore(dummyCard, referenceNode);
  }

  static insertDraggedCard() {
    let referenceNode = this.isCardEntered()
      ? this.dummyCardDirection
        ? this.enteredCard
        : this.enteredCard.nextSibling
      : null;
    const columnCards = this.enteredColumn.querySelector(".column_cards");
    columnCards.insertBefore(this.draggedCard, referenceNode);
    this.draggedCard.classList.remove("hidden");
  }

  static clearDummyCard() {
    const dummyCard = this.columnRootElement.querySelector(".dummy");
    dummyCard && dummyCard.remove();
  }

  static onMouseUp = (e) => {
    this.columnRootElement.removeEventListener("mousemove", this.onMouseMove);
    this.columnRootElement.removeEventListener("mouseup", this.onMouseUp);
    this.capturedCard.classList.add("hidden");
    this.updateCardOrder();
    this.updateCardElementId();
    this.insertDraggedCard();
    this.clearDraggedCard();
    this.clearDummyCard();
  };

  static setCapturedCard() {
    this.capturedCard = document.querySelector("#card_capture");
    this.capturedCard.innerHTML = this.draggedCard.innerHTML;
    this.capturedCard.classList.remove("hidden");
  }

  static setCapturedCardPosition(e) {
    this.capturedCard.style.left =
      e.clientX - 17 - this.relativeLeftInCard + "px";
    this.capturedCard.style.top =
      e.clientY - 17 - this.relativeTopInCard + "px";
  }

  static setRelativePositionInCard(e) {
    const bounds = this.draggedCard.getBoundingClientRect();
    this.relativeLeftInCard = e.clientX - bounds.left;
    this.relativeTopInCard = e.clientY - bounds.top;
    this.capturedCard.style.left = bounds.left - 17 + "px";
    this.capturedCard.style.top = bounds.top - 17 + "px";
  }

  static getOrderInColumnByCardId(colId, cardId) {
    return Data.getOrderInColumnByCardId(colId, cardId);
  }

  static updateCardOrder() {
    const fromId = this.draggedCard.id;
    const splitedFromId = fromId.split("_");
    const fromColumnId = splitedFromId[1] - 0;
    const fromCardId = splitedFromId[2] - 0;
    const fromCardIndex = this.getOrderInColumnByCardId(
      fromColumnId,
      fromCardId
    );
    const toColumnId = this.enteredColumn.id.split("_")[1] - 0;
    const toCardIndex = this.getIndexOfDummyCard();
    if (fromColumnId === toColumnId && fromCardIndex === toCardIndex) return;
    Data.updateCardOrder(
      fromColumnId,
      toColumnId,
      fromCardIndex,
      toCardIndex,
      fromCardId
    );
  }

  static updateCardElementId() {
    const fromId = this.draggedCard.id;
    const splitedFromId = fromId.split("_");
    const toColumnId = this.enteredColumn.id.split("_")[1] - 0;
    const fromCardId = splitedFromId[2] - 0;
    this.draggedCard.id = ["card", toColumnId, fromCardId].join("_");
  }

  static getIndexOfDummyCard() {
    const columnCards = this.enteredColumn.querySelector(".column_cards");
    const childrenNodeList = columnCards.children;
    const childrenArray = Array.prototype.slice.call(childrenNodeList);

    return childrenArray
      .filter((child) => !child.classList.contains("hidden"))
      .findIndex((card) => card.classList.contains("dummy"));
  }

  static setEnteredColumn(e) {
    const enteredColumn = e.target.closest(".column");

    if (enteredColumn) this.enteredColumn = enteredColumn;
  }

  static setEnteredCard(e) {
    const enteredCard = e.target.closest(".card_wrap");

    this.enteredCard = enteredCard || null;
  }

  static isColumnEntered() {
    return this.enteredColumn !== null;
  }

  static isCardEntered() {
    return this.enteredCard !== null;
  }

  static setDummyCardDirection(e) {
    const bounds = this.enteredCard.getBoundingClientRect();
    const midOfYInEnteredCard = bounds.top + bounds.height / 2;
    const mouseY = e.clientY;
    this.dummyCardDirection = midOfYInEnteredCard > mouseY;
  }
}
