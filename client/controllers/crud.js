import RemoveCard from "../components/modal/removeCard.js";
import Data from "./data.js";

export default class CRUD {
  constructor() {
    this.columnRootElement = document.querySelector(".column_wrap");
    this.setEventListenerToDeleteBtn();
    this.setEventListenerToAddCard();
    this.removeCard = new RemoveCard(
      this.onClickRemoveCard,
      this.clearModalLayer
    );
    this.selectedBtnId = null;
    this.addCard = this.addCard.bind(this);
  }

  setEventListenerToDeleteBtn() {
    this.columnRootElement.querySelectorAll(".rem_card").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.setModalForRemoveCard(e, btn.id)
      );
    });
  }

  setEventListenerToAddCard() {
    this.columnRootElement.querySelectorAll(".add_card_btn").forEach((btn) => {
      btn.addEventListener("click", this.toggleAddCardArea);
    });
    this.columnRootElement
      .querySelectorAll(".add_card_btn_cancel")
      .forEach((btn) => {
        btn.addEventListener("click", this.toggleAddCardArea);
      });
    this.columnRootElement
      .querySelectorAll(".add_card_content")
      .forEach((btn) => {
        btn.addEventListener("input", this.onChangeTextArea);
      });
    this.columnRootElement
      .querySelectorAll(".add_card_btn_confirm")
      .forEach((btn) => {
        btn.addEventListener("click", this.addCard);
      });
  }

  toggleAddCardArea = (e) => {
    e.target.closest(".column").classList.toggle("on_add_card");
  };

  onChangeTextArea = (e) => {
    const target = e.target;
    const addAreaWrap = target.closest(".add_card_wrap");
    if (target.value.length > 0) {
      addAreaWrap.querySelector(".add_card_btn_confirm").disabled = false;
    } else {
      addAreaWrap.querySelector(".add_card_btn_confirm").disabled = true;
    }
  };

  async addCard(e) {
    const target = e.target;
    const columnElement = target.closest(".column");
    const cardContent = columnElement.querySelector(".add_card_content");
    const columnCards = columnElement.querySelector(".column_cards");
    const colId = columnElement.id.split("_")[1] - 0;
    const cardId = await Data.addCard(cardContent.value, colId);
    columnCards.insertAdjacentHTML(
      "afterbegin",
      `<div class="card_wrap" id="card_${colId}_${cardId}">
    <div class="card_content">
        <img class="img_card"/>
        <div class="card_note">
            <span>${cardContent.value}</span>
        </div>
        <button class="rem_card" id="btn_rem_${colId}_${cardId}">
          <img src="/public/images/close.svg" />
        </button>
    </div>
    <div class="card_bottom">
        <span class="add_by">Added by</span>
        <span class="span_writer">${Data.user}</span>
    </div>
  `
    );
    e.target.closest(".column").classList.remove("on_add_card");
  }

  setModalForRemoveCard = (e, id) => {
    this.selectedBtnId = id;
    e.stopPropagation();
    this.setModalLayer();
    this.renderModalForRemoveCard();
  };

  renderModalForRemoveCard() {
    this.removeCard.open();
  }

  setModalLayer() {
    document.querySelector(".modal_layer").style.display = "block";
  }

  clearModalLayer = () => {
    document.querySelector(".modal_layer").style.display = "none";
  };
  removeSelectedCard() {
    const splitedBtnId = this.selectedBtnId.split("_");
    const columnId = splitedBtnId[2] - 0;
    const cardId = splitedBtnId[3] - 0;
    const order = Data.getOrderInColumnByCardId(columnId, cardId);
    Data.removeCard(columnId, cardId, order);
    const selectedCardElement = document.querySelector(
      `#card_${columnId}_${cardId}`
    );
    selectedCardElement.remove();
  }

  onClickRemoveCard = () => {
    this.removeSelectedCard();
    this.clearModalLayer();
  };
}
