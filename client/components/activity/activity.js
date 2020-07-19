export default class Activity {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.render();
  }

  render() {
    const timeDiff = new Date().getTime() - this.data.actionTime.getTime();
    const timeType = "minute";
    this.parentDom.innerHTML += `
        <div class="activity_card">
            <div>
                <img class="img_user"/>
            </div>
            <div class="act_content">
                <div class="message">
                    <div class="act_user">@${this.data.userId}</div>
                    <div class="act_type">${this.data.actionType}</div>
                    <div class="act_columnId">${this.data.fromColumnTitle}</div>
                    <div class="act_cardId">${this.data.card_note}</div>
                </div>
                <div class="update_time">${timeDiff} ${timeType} ago</div>
            </div>
        </div>
    `;
  }
}
