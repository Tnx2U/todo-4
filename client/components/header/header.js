// const headerDoc = document.querySelector(".header");
// import Component from "../share/component";

export default class Header {
  constructor(parentDom) {
    this.parentDom = parentDom;
    this.render();
  }

  render() {
    this.parentDom.innerHTML = `<div class="header_container">
    <button class="btn_menu">menu</button>
      <h1 class="header_title">TODO 서비스</h1>
    </div>`;
  }
}
