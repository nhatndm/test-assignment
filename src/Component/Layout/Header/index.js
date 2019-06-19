import React, { Component } from "react";
import PropTypes from "prop-types";
import "./index.scss";

export default class Header extends Component {
  render() {
    const { groupNameTitle } = this.props;
    return <div className="header">{groupNameTitle}</div>;
  }
}

Header.propTypes = {
  groupNameTitle: PropTypes.string
};

Header.defaultProps = {
  groupNameTitle: "Group"
};
