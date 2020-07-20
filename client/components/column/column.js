// import Component from "../share/component";
import Card from "../card/card.js";
import Data from "../../controllers/data.js";

export default class Column {
  constructor(element, colId) {
    this.element = element;
    this.colId = colId;
    this.render();
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
    columnInfo.cards.forEach((card) => {
      cardWrapElement.insertAdjacentHTML(
        "beforeend",
        `<div class="card_wrap" id="card_${card.cardId}">
        </div>`
      );
      const cardElement = this.element.querySelector(`#card_${card.cardId}`);
      new Card(cardElement, this.colId, card.cardId);
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
    var child = this.element.lastElementChild;
    while (child) {
      this.element.removeChild(child);
      child = e.lastElementChild;
    }
  }
}
