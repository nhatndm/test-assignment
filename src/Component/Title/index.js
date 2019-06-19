import React, { Component } from "react";
import "./index.scss";

export default class Title extends Component {
  render() {
    const { type, title } = this.props;
    return <div className={`title ${type}`}>{title}</div>;
  }
}
