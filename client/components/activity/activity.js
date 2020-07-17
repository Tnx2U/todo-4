export default class Activity {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.render();
  }

  render() {
    console.log("data in activity : ", this.data);
    const timeDiff = new Date().getTime() - this.data.actionTime.getTime();
    const timeType = "minute";
    this.parentDom.innerHTML += `
        <div class="activity_card">
            <div>
                <img class="img_user" src="https://lh3.googleusercontent.com/proxy/g8ePUX7GwtNy1RZ2eRRYIKtFae6Pel6uQz7UwP_CZhexOBtERB11_CWC4TTKWDN3fpRwPzYua-5vozY2L6ZVNfNHMp69Nihv_s-SkTk"/>
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
