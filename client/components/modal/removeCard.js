export default class RemoveCard {
  constructor(onConfirm, onCancel) {
    this.setElement();
    this.render();
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
    this.setEventLister();
  }

  setEventLister() {
    this.element.querySelector(".btn_cancel").addEventListener("click", () => {
      this.close();
      this.onCancel();
    });
    this.element.querySelector(".btn_confirm").addEventListener("click", () => {
      this.close();
      this.onConfirm();
    });
  }

  setElement() {
    this.element = document.querySelector(".modal_remove_card");
  }

  open() {
    this.element.classList.remove("hidden");
  }

  close = () => {
    this.element.classList.add("hidden");
  };

  render() {
    this.element.innerHTML = `
      <div class="modal_text_area">
          <span>선택하신 카드를 삭제하시겠습니까?</span>
      </div>
      <div class="modal_button_area">
          <button class="btn_cancel">취소</button>
          <button class="btn_confirm">확인</button>
      </div>
    `;
  }
}
