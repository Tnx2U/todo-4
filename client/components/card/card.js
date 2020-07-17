export default class Card {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.render();
  }

  render() {
    this.parentDom.innerHTML += `<div class="card_wrap">
        <div class="card_content">
            <img class="img_card" src="https://static.thenounproject.com/png/14910-200.png"/>
            <div class="card_note">
                <span>${this.data.note}</span>
            </div>
            <button class="btn">
              <img src="/public/images/close.svg" />
            </button>
        </div>
        <div class="card_bottom">
            <span class="add_by">Added by</span>
            <span class="span_writer">${this.data.writer}</span>
        </div>
      <div>`;
  }
}
