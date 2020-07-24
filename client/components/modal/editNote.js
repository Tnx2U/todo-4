export default class EditNote {
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
      const note = this.element.querySelector(".edit_note_content").value;
      this.onConfirm(note);
    });
    this.element
      .querySelector(".edit_note_content")
      .addEventListener("input", (e) => {
        const btnConfirm = this.element.querySelector(".btn_confirm");
        if (e.target.value.length > 0) {
          btnConfirm.disabled = false;
        } else {
          btnConfirm.disabled = true;
        }
      });
  }

  setElement() {
    this.element = document.querySelector(".modal_edit_note");
  }

  open() {
    this.element.classList.remove("hidden");
  }

  close = () => {
    this.element.classList.add("hidden");
  };

  setText = (note) => {
    this.element.querySelector(".edit_note_content").value = note;
  };

  render() {
    this.element.innerHTML = `
    <div class="header_modal">
    <h3>Edit note</h3>
    <button class="btn_cancel">
      <img src="/public/images/close.svg" />
    </button>
  </div>
  <div class="wrap_edit_note">
    <h4>Note</h4>
    <textarea class="edit_note_content" maxlength="500" placeholder="Enter a note"></textarea>
  </div>
  <div class="wrap_btn_edit_note">
    <button class="btn_confirm">Save note</button>
  </div>
    `;
  }
}
