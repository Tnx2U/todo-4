// import Component from "../share/component";
import Card from "../card/card.js";

export default class Column {
  constructor(element, columnInfo) {
    this.element = element;
    this.colId = columnInfo.colId;
    this.title = columnInfo.title;
    this.cards = columnInfo.cards;
    this.render();
  }

  renderColumInfo() {
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
            <span class="num_card">${this.cards.length}</span>
            <h3 class="title_column">${this.title}</h3>
        </div>
        <div class="column_cards"></div>
    `
    );
  }

  renderCards() {
    this.cards.forEach((card, index) => {
      const cardWrapElement = this.element.querySelector(".column_cards");
      cardWrapElement.insertAdjacentHTML(
        "beforeend",
        `<div class="card_wrap" id="card_${card.cardId}">
        </div>`
      );
      const cardElement = this.element.querySelector(`#card_${card.cardId}`);
      new Card(cardElement, card, index);
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
