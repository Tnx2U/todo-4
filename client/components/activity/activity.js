export default class Activity {
  constructor(parentDom, data) {
    this.parentDom = parentDom;
    this.data = data;
    this.timeDiff;
    this.timeType;
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
    <div> from </div>
    <div class="act_columnId">${this.data.fromColumnTitle}</div>
    <div> to </div>
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

  setTimeDiff() {
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
    const timeZoneDiff = 32412;
    this.timeDiff =
      Math.round((nowTime.getTime() - actionTime.getTime()) / 1000) -
      timeZoneDiff;

    if (this.timeDiff > 60 * 60 * 24) {
      this.timeDiff = Math.round(this.timeDiff / (60 * 60 * 24));
      this.timeType = "days";
    } else if (this.timeDiff > 60 * 60) {
      this.timeDiff = Math.round(this.timeDiff / (60 * 60));
      this.timeType = "hours";
    } else if (this.timeDiff > 60) {
      this.timeDiff = Math.round(this.timeDiff / 60);
      this.timeType = "minutes";
    } else {
      this.timeType = "seconds";
    }
  }

  render() {
    this.setTimeDiff();

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
          <div class="update_time">${this.timeDiff} ${this.timeType} ago</div>
      </div>
  </div>
    `;
  }
}
