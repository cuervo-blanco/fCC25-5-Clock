import React from "react";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timer: null, // Initialize timer in seconds
      currentClock: "Session",
      intervalId: null // To keep track of the interval
    };
  }

  componentDidMount() {
    this.resetClock();
    this.setState({ timer: this.state.sessionLength * 60 });
  }

  decrementBreak = () => {
    if (this.state.breakLength > 1) {
      this.setState({ breakLength: this.state.breakLength - 1 });
    }
  };

  incrementBreak = () => {
    this.setState({ breakLength: this.state.breakLength + 1 });
  };

  decrementSession = () => {
    if (this.state.sessionLength > 1) {
      this.setState({ sessionLength: this.state.sessionLength - 1 });
    }
  };

  incrementSession = () => {
    this.setState({ sessionLength: this.state.sessionLength + 1 });
  };

  startClock = () => {
    if (!this.state.intervalId) {
      const intervalId = setInterval(this.tick, 1000);
      this.setState({ 
        intervalId,
        timer: this.state.sessionLength * 60 });
    }
  };

  tick = () => {
    if (this.state.timer > 0) {
      this.setState({ timer: this.state.timer - 1 });
    } else {
      this.switchClock();
    }
  };

  switchClock = () => {
    const newClock = this.state.currentClock === "Session" ? "Break" : "Session";
    const newTimer = (newClock === "Session" ? this.state.sessionLength : this.state.breakLength) * 60;
    this.setState({
      currentClock: newClock,
      timer: newTimer
    });
  };

  resetClock = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timer: 25 * 60,
      currentClock: "Session",
      intervalId: null
    });
  };
  pauseClock = () => {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: null });
  };

  render() {
    const minutes = Math.floor(this.state.timer / 60);
    const seconds = this.state.timer % 60;
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return (
      <div id="Clock">
        <div id="title">Pomodoro Clock</div>
        <div id="labels">
            <div id="break-label"> 
                Break Length
                <div className="controls">
                    <button id="break-decrement" onClick={this.decrementBreak}><i class="fa-solid fa-minus"></i></button>
                    <span id="break-length">{this.state.breakLength}</span>
                    <button id="break-increment" onClick={this.incrementBreak}><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div id="session-label">
                Session Length
                <div className="controls">
                    <button id="session-decrement" onClick={this.decrementSession}><i class="fa-solid fa-minus"></i></button>
                    <span id="session-length">{this.state.sessionLength}</span>
                    <button id="session-increment" onClick={this.incrementSession}><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        </div>
        <div id="currentClock">
            <div id="timer-label">{this.state.currentClock}</div>
            <div id="time-left">{formattedTime}</div>
            <div id="playhead">
                <button id="start" onClick={this.startClock}><i class="fa-solid fa-play"></i></button>
                <button id="pause" onClick={this.pauseClock}><i class="fa-solid fa-pause"></i></button>
                <button id="reset" onClick={this.resetClock}><i class="fa-solid fa-arrows-spin"></i></button>
                <audio id="beep" src="https://goo.gl/65cBl1"></audio>
            </div>
        </div>
        
      </div>
    );
  }
}

export default Clock;
