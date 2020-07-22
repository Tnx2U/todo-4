// import Component from "../share/component";
import Card from "../card/card.js";
import Data from "../../controllers/data.js";
import DragAndDrop from "../../controllers/dragAndDrop.js";

export default class Column {
  constructor(element, colId) {
    this.element = element;
    this.colId = colId;
    this.cards = [];
    this.render();
    this.setEventListener();
  }

  setEventListener() {
    this.setMouseEnterEvent();
    this.setMouseDownEvent();
    this.setMouseLeaveEvent();
  }

  onMouseLeave = (e) => {
    DragAndDrop.isDragging() && console.log("떠났는뎅");
    DragAndDrop.isDragging() && DragAndDrop.onEnterOtherColumn();
  };

  setMouseLeaveEvent() {
    this.element.addEventListener("mouseleave", this.onMouseLeave);
  }

  onMouseEnter = (e) => {
    //DragAndDrop.isDragging() && DragAndDrop.setEnteredColumn(this);
    //DragAndDrop.isDragging() && DragAndDrop.onEnterColumn(this);
    DragAndDrop.isDragging() && console.log("들어왔는뎅");
  };

  setMouseEnterEvent() {
    this.element.addEventListener("mouseenter", this.onMouseEnter);
  }

  onMouseDown = (e) => {
    DragAndDrop.onEnterColumn(this);
  };

  setMouseDownEvent() {
    this.element.addEventListener("mousedown", this.onMouseDown);
  }

  renderColumInfo() {
    const columnInfo = Data.getColumnDataById(this.colId);
    this.element.insertAdjacentHTML(
      "beforeend",
      `
        <div class="column_header">
            <button class="btn float_right">
              <img src="/public/images/more.svg" />
            </button>
            <button class="btn float_right">
              <img src="/public/images/add.svg" />
            </button>
            <span class="num_card">${columnInfo.cards.length}</span>
            <h3 class="title_column">${columnInfo.title}</h3>
        </div>
        <div class="column_cards"></div>
    `
    );
  }

  renderCards() {
    const columnInfo = Data.getColumnDataById(this.colId);
    const cardWrapElement = this.element.querySelector(".column_cards");
    columnInfo.cards.forEach((card, index) => {
      cardWrapElement.insertAdjacentHTML(
        "beforeend",
        `<div class="card_wrap" id="card_${this.colId}_${index}">
        </div>`
      );
      const cardElement = this.element.querySelector(
        `#card_${this.colId}_${index}`
      );
      this.cards.push(new Card(cardElement, this.colId, card.cardId, index));
    });
  }

  render() {
    this.renderColumInfo();
    this.renderCards();
  }

  update() {
    this.remove();
    this.render();
  }

  setCards(cards) {
    this.cards = cards;
  }

  remove() {
    this.cards.forEach((card) => {
      card.remove();
    });
    this.cards = [];
    var child = this.element.lastElementChild;
    while (child) {
      this.element.removeChild(child);
      child = this.element.lastElementChild;
    }
  }
}
