export default class EditColumnTitle {
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
      const note = this.element.querySelector(".edit_column_title").value;
      this.onConfirm(note);
    });
    this.element
      .querySelector(".edit_column_title")
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
    this.element = document.querySelector(".modal_edit_column");
  }

  open() {
    this.element.classList.remove("hidden");
  }

  close = () => {
    this.element.classList.add("hidden");
  };

  setTitle = (title) => {
    this.element.querySelector(".edit_column_title").value = title;
    this.element.querySelector(".modal_title").value = "Edit " + title;
  };

  render() {
    this.element.innerHTML = `
    <div class="header_modal">
    <h3 class="modal_title">Edit note</h3>
    <button class="btn_cancel">
      <img src="/public/images/close.svg" />
    </button>
  </div>
  <div class="wrap_edit_note">
    <h4>Column name</h4>
    <input class="edit_column_title" maxlength="500" placeholder="Enter a Column name"/>
  </div>
  <div class="wrap_btn_edit_note">
    <button class="btn_confirm">Save column</button>
  </div>
    `;
  }
}
