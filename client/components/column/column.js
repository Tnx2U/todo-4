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

    // this.parentDom.innerHTML += `<div class="ColumnContainer">
    //     <div class="topPanel">
    //         <div class="numOfCards">${this.data.cards.length}</div>
    //         <div class="colTitle">
    //             <span>${this.data.title}</span>
    //         </div>
    //         <div class="addBtn">
    //             <button class="btn-colAdd">+</button>
    //         </div>
    //         <div class="otherBtn">
    //             <button class="btn-other">...</button>
    //         </div>
    //     </div>
    //     <div class="cardArea">
    //     </div>
    // </div>`;
    console.log("parentDoms child in col: ", this.parentDom.childNodes);
    const cardAreaDom = this.parentDom.childNodes[
      this.data.colId + 2
    ].querySelector(".column_cards");

    for (let index = 0; index < this.data.cards.length; index++) {
      const cardData = this.data.cards[index];
      new Card(cardAreaDom, cardData);
    }
  }
}
