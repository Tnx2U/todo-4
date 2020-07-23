import Card from "../card/card.js";
import Data from "../../controllers/data.js";

export default class Column {
  constructor(parentDom, colId) {
    this.parentDom = parentDom;
    this.colId = colId;
    this.cards = [];
    this.render();
  }

  renderColumInfo() {
    const columnInfo = Data.getColumnDataById(this.colId);
    this.parentDom.insertAdjacentHTML(
      "beforeend",
      `<div class="column" id="column_${this.colId}">
    <div class="column_header">
        <button class="btn float_right">
          <img src="/public/images/more.svg" />
        </button>
        <button class="btn float_right add_card_btn">
          <img src="/public/images/add.svg" />
        </button>
        <span class="num_card">${columnInfo.cards.length}</span>
        <h3 class="title_column">${columnInfo.title}</h3>
    </div>
    <div class="add_card_wrap">
      <textarea class="add_card_content" maxlength="500" placeholder="Enter a note"></textarea>
      <div class="add_card_btn_wrap">
        <button class="add_card_btn_confirm">Add</button>
        <button class="add_card_btn_cancel">Cancel</button>
      </div>
    </div>
    <div class="column_cards"></div>
`
    );
  }

  renderCards() {
    const columnInfo = Data.getColumnDataById(this.colId);
    columnInfo.cards.forEach((card, order) => {
      const cardWrapElement = this.parentDom.querySelector(
        `#column_${this.colId} .column_cards`
      );
      new Card(cardWrapElement, this.colId, card.cardId, order);
    });
  }

  render() {
    this.renderColumInfo();
    this.renderCards();
  }
}
