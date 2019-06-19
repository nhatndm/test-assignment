import React, { Component } from "react";
import PropTypes from "prop-types";
import { ReactComponent as SvgGo } from "../../../assets/icon/right-arrow.svg";
import { ReactComponent as SvgCamera } from "../../../assets/icon/photo-camera.svg";

import "./index.scss";

export default class Footer extends Component {
  state = {
    message: ""
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCallBack = this.handleCallBack.bind(this);
  }

  handleChange(e) {
    this.setState({ message: e.target.value });
  }

  handleCallBack() {
    const { callBack } = this.props;
    const { message } = this.state;
    callBack({ message: message });
    this.setState({ message: "" });
  }

  render() {
    const { message } = this.state;
    return (
      <div className="footer container-fluid">
        <div className="row footer-wrapper">
          <div className="col-11 footer--input-wrapper">
            <div className="footer--input">
              <SvgCamera />
              <input
                placeholder="Type message"
                onChange={this.handleChange}
                value={message}
              />
            </div>
          </div>
          <div className="col-1 footer--icon">
            <SvgGo onClick={this.handleCallBack} />
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  callBack: PropTypes.func
};

Footer.defaultProps = {
  callBack: () => null
};
