import React, { Component } from "react";
import "./index.scss";

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.generateMessage = this.generateMessage.bind(this);
    this.generateSenderName = this.generateSenderName.bind(this);
    this.generateAvatar = this.generateAvatar.bind(this);
  }

  generateMessage() {
    const { type, photo, message } = this.props;

    if (type === "TEXT") {
      return <p>{message}</p>;
    }

    if (type === "PHOTO") {
      return <img src={photo} width="200px" height="200px" />;
    }
  }

  generateSenderName() {
    const { sender, isSameUser } = this.props;
    if (!isSameUser) {
      return <p className="sender-name">{sender.firstName}</p>;
    }

    return null;
  }

  generateAvatar() {
    const { sender, isSameUser } = this.props;
    if (!isSameUser) {
      return <img src={sender.picture} width="50px" height="50px" />;
    }

    return null;
  }

  render() {
    const { isMySeeder, isSameUser } = this.props;

    if (isMySeeder) {
      return (
        <div className="message-wrapper ismysender">
          <div className="message-mysender">{this.generateMessage()}</div>
        </div>
      );
    }

    return (
      <div className="message-wrapper friends">
        {this.generateAvatar()}
        <div className={`message-friends ${isSameUser ? "sameuser" : ""}`}>
          {this.generateSenderName()}
          {this.generateMessage()}
        </div>
      </div>
    );
  }
}
