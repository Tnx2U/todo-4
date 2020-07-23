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
      btn.addEventListener("click", (e) => this.setAddCardArea(e));
    });
    this.columnRootElement
      .querySelectorAll(".add_card_content")
      .forEach((btn) => {
        btn.addEventListener("input", (e) => this.onChangeTextArea(e));
      });
  }

  setAddCardArea = (e) => {
    e.target.closest(".column").classList.toggle("on_add_card");
  };

  onChangeTextArea = (e) => {
    const target = e.target;
    const addAreaWrap = target.closest(".add_card_wrap");
    if (target.value.length > 0) {
      addAreaWrap.classList.add("on_enter");
    } else {
      addAreaWrap.classList.remove("on_enter");
    }
  };

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
