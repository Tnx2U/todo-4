// const headerDoc = document.querySelector(".header");
// import Component from "../share/component";

export default class Header
// extends Component
{
  constructor(parentDom) {
    // super(parentDom);
    this.parentDom = parentDom;
    this.render();
  }

  render() {
    this.parentDom.innerHTML = `<div class="headerContainer">
        <div class="logo">
            <span class="span-logo">TODO 서비스</span>
        </div>
        <div class="menuBtnDiv">
            <button class="btn-menu" onclick="">menu</button>
        </div>
      </div>`;
  }
}
