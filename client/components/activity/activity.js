export default class Activity {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.render();
  }

  addTypeActivity() {
    const messageSrc = `
    <div class="act_user">@${this.data.userName}</div>
    <div class="act_type">${this.data.actionType}</div>
    <div class="act_cardId">${this.data.cardNote}</div>
    <span> to </span>
    <div class="act_columnId">${this.data.toColumnTitle}</div>
    `;
    return messageSrc;
  }

  moveTypeActivity() {
    const messageSrc = `
    <div class="act_user">@${this.data.userName}</div>
    <div class="act_type">${this.data.actionType}</div>
    <div class="act_cardId">${this.data.cardNote}</div>
    <span> from </span>
    <div class="act_columnId">${this.data.fromColumnTitle}</div>
    <span> to </span>
    <div class="act_columnId">${this.data.toColumnTitle}</div>
    `;
    return messageSrc;
  }

  deleteTypeActivity() {
    const messageSrc = `
    <div class="act_user">@${this.data.userName}</div>
    <div class="act_type">${this.data.actionType}</div>
    <div class="act_cardId">${this.data.cardNote}</div>
    <span> from </span>
    <div class="act_columnId">${this.data.fromColumnTitle}</div>
    `;
    return messageSrc;
  }

  updateTypeActivity() {
    const messageSrc = `
    <div class="act_user">@${this.data.userName}</div>
    <div class="act_type">${this.data.actionType}</div>
    <div class="act_cardId">${this.data.cardNote}</div>
    `;
    return messageSrc;
  }

  render() {
    var parseTime = this.data.actionTime.split(/[- . T :]/);
    var actionTime = new Date(
      Date.UTC(
        parseTime[0],
        parseTime[1] - 1,
        parseTime[2],
        parseTime[3],
        parseTime[4],
        parseTime[5]
      )
    );

    const nowTime = new Date();
    // let timeDiff = (new Date().getTime() - actionTime.getTime()) / 10000;
    console.log(
      actionTime.getMonth(),
      actionTime.getDate(),
      actionTime.getHours(),
      actionTime.getMinutes()
    );
    let timeType;
    let timeDiff;

    if (nowTime.getDate() - actionTime.getDate() > 0) {
      timeDiff = nowTime.getDate() - actionTime.getDate();
      timeType = "days";
    } else if (nowTime.getHours() - actionTime.getDate() > 0) {
      timeDiff = nowTime.getHours() - actionTime.getHours();
      timeType = "hours";
    } else if (nowTime.getMinutes() - actionTime.getMinutes() > 0) {
      timeDiff = nowTime.getMinutes() - actionTime.getMinutes();
      timeType = "minutes";
    } else {
      timeDiff = nowTime.getSeconds() - actionTime.getSeconds();
      timeType = "seconds";
    }

    let messageSrc;

    switch (this.data.actionType) {
      case "add":
        messageSrc = this.addTypeActivity();
        break;
      case "move":
        messageSrc = this.moveTypeActivity();
        break;
      case "delete":
        messageSrc = this.deleteTypeActivity();
        break;
      case "update":
        messageSrc = this.updateTypeActivity();
        break;
    }

    this.parentDom.innerHTML +=
      `
        <div class="activity_card">
            <div>
                <img class="img_user"/>
            </div>
            <div class="act_content">
                <div class="message">` +
      messageSrc +
      `</div>
                <div class="update_time">${timeDiff} ${timeType} ago</div>
            </div>
        </div>
    `;
  }
}
