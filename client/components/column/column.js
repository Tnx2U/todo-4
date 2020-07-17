// import Component from "../share/component";
import Card from "../card/card.js";

export default class Column {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.render();
  }

  render() {
    this.parentDom.innerHTML += `<div class="column">
        <div class="column_header">
            <button class="btn float_right">
              <img src="/public/images/more.svg" />
            </button>
            <button class="btn float_right">
              <img src="/public/images/add.svg" />
            </button>
            <span class="num_card">${this.data.cards.length}</span>
            <h3 class="title_column">${this.data.title}</h3>
        </div>
        <div class="column_cards"></div>
    </div>`;

    //to-do : parentDom의 childeNodes수가 경우에 따라 유동적으로 변하므로 코드 리펙토링이 필요
    console.log("parentDoms child in col: ", this.parentDom.childNodes);
    const cardAreaDom = this.parentDom.childNodes[
      this.data.colId - 1
    ].querySelector(".column_cards");

    for (let index = 0; index < this.data.cards.length; index++) {
      const cardData = this.data.cards[index];
      new Card(cardAreaDom, cardData);
    }
  }
}
