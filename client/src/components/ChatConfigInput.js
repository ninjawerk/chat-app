import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ChatConfigInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      roomName: ""
    }
  }

  sendConfig = (e) => {
    e.preventDefault();
    const config = {userName: this.state.userName, roomName: this.state.roomName}
    this.props.sendConfig(config);
  }

  handleUsernameChange = (e) => {
    this.setState({ userName: e.target.value });
  }

  handleRoomNameChange = (e) => {
    this.setState({ roomName: e.target.value });
  }

  render() {
    return (
        <form onSubmit={this.sendConfig} className="row w-100 p-2">
          <div className="input-group  col-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="Username" aria-label="Username" 
                   aria-describedby="basic-addon1" value={this.state.message} onChange={this.handleUsernameChange}/>
          </div>
          <div className="input-group col-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="Meeting Name" aria-label="Username" 
                   aria-describedby="basic-addon1" value={this.state.message} onChange={this.handleRoomNameChange} />
          </div>
          <div className="col-2">
            <input type="submit" value="Enter" className="btn btn-info btn-block"/>
          </div>
        </form>   
    )
  }
}

ChatConfigInput.propTypes = {
  sendConfig: PropTypes.func.isRequired,
}

export default ChatConfigInput
