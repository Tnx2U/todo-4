export default class DragAndDrop {
  static columnRootElement = null;
  static initialize() {
    this.columnRootElement = document.querySelector(".column_wrap");
    this.columnRootElement.addEventListener("mousedown", this.onMouseDown);
  }

  static onMouseDown = (e) => {
    this.columnRootElement.addEventListener("mousemove", this.onMouseMove);
    this.columnRootElement.addEventListener("mouseup", this.onMouseUp);
  };

  static onMouseMove = (e) => {
    // document.querySelector(".ondrag").style.left = e.offsetX + "px";
    // document.querySelector(".ondrag").style.top = e.offsetY + "px";
  };

  static onMouseUp = (e) => {
    this.columnRootElement.removeEventListener("mousemove", this.onMouseMove);
    this.columnRootElement.removeEventListener("mouseup", this.onMouseUp);
  };
}
