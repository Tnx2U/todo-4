import Activity from "../activity/activity.js";

export default class HiddenMenu {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.render();
  }

  render() {
    this.parentDom.innerHTML = `
    <div class="menu_header vertical_center">
    <button class="btn">
      <img src="/public/images/menu.svg" />
    </button>
    <h3 class="menu_title">Menu</h3>
    <button class="btn flex_right">
      <img src="/public/images/close.svg" />
    </button>
  </div>
  <div class="activity_wrap">
    <div class="activity_header vertical_center">
      <img src="/public/images/noti.svg" />
      <h3 class="menu_title">Activity</h3>
    </div>
    <ul class="activity_content">
    </ul>
    `;
    console.log("dummyactData : ", this.data);
    for (let index = 0; index < this.data.length; index++) {
      new Activity(
        this.parentDom.querySelector(".activity_content"),
        this.data[index]
      );
    }
  }
}
