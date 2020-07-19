export default class DragAndDrop {
  static draggedCard = null;

  static setDraggedCard(card) {
    this.draggedCard = card;
    this.setCaptureImage();
    this.setEventListener();
  }

  static onMouseMove(e) {
    document.querySelector(".ondrag").style.left = e.offsetX + "px";
    document.querySelector(".ondrag").style.top = e.offsetY + "px";
  }

  static setEventListener() {
    this.setMouseMoveEvent();
    this.setMouseUpEvent();
  }

  static setMouseMoveEvent() {
    window.addEventListener("mousemove", this.onMouseMove);
  }
  static onMouceUp(e) {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }
  static setMouseUpEvent() {
    window.addEventListener("mouseup", onMouseUp);
  }

  static setCaptureImage() {}
}
