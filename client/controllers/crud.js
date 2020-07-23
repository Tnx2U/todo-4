import RemoveCard from "../components/modal/removeCard.js";
import Data from "./data.js";

export default class CRUD {
  constructor() {
    this.columnRootElement = document.querySelector(".column_wrap");
    this.setEventListenerToDeleteBtn();
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
