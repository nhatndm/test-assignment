import React, { Component, Fragment } from "react";
import "./App.scss";
import Data from "./data/data.json";
import moment from "moment";
import Header from "./Component/Layout/Header";
import Footer from "./Component/Layout/Footer";
import Title from "./Component/Title";
import Message from "./Component/Message";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.time = null;
    this.groupName = null;
    this.state = {
      data: [],
      myId: 2
    };
    this.renderListMessages = this.renderListMessages.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.handleAddMessage = this.handleAddMessage.bind(this);
  }

  componentDidMount() {
    const data = Data.messages;
    data.sort((a, b) => a.position - b.position);
    this.time = data[0].createdAt;
    this.groupName = data[0].content.i18n.parameters.groupName;
    this.setState({ data: data });
  }

  renderMessage(currentItem, key) {
    const { data, myId } = this.state;
    const previousItem = data[key - 1];
    if (currentItem.content.subType === "GROUP_CREATED") {
      return (
        <Fragment key={key}>
          <Title
            title={moment(currentItem.createdAt)
              .format("ddd, MMM DD")
              .toUpperCase()}
            type="main"
          />
          <Title title={currentItem.content.text} type="sub" />
        </Fragment>
      );
    }

    if (
      previousItem &&
      !moment(currentItem.createdAt).isSame(previousItem.createdAt, "days")
    ) {
      return (
        <Fragment key={key}>
          <Title
            title={moment(currentItem.createdAt)
              .format("ddd, MMM DD")
              .toUpperCase()}
            type="main"
          />
          <Title title={currentItem.content.text} type="sub" />
        </Fragment>
      );
    }

    if (
      previousItem &&
      moment(currentItem.createdAt).isSame(previousItem.createdAt, "days")
    ) {
      return (
        <Fragment key={key}>
          <Message
            isMySeeder={currentItem.senderId === myId}
            message={currentItem.content.text}
            photo={currentItem.content.url}
            type={currentItem.type}
            sender={currentItem.sender}
            isSameUser={currentItem.senderId === previousItem.senderId}
          />
        </Fragment>
      );
    }

    if (!moment(currentItem.createdAt).isSame(this.time, "days")) {
      this.time = currentItem.createdAt;
      return this.renderMessage(currentItem, key);
    }
  }

  renderListMessages() {
    const { data } = this.state;
    if (data.length > 0) {
      return data.map((item, index) => {
        return this.renderMessage(item, index);
      });
    }

    return null;
  }

  handleAddMessage(message) {
    console.log(message);
  }

  render() {
    return (
      <div className="test-assignment">
        <Header groupNameTitle={this.groupName} />
        <div className="list-messages">{this.renderListMessages()}</div>
        <Footer callBack={({ message }) => this.handleAddMessage(message)} />
      </div>
    );
  }
}
