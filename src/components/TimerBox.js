import React, {Component} from "react";
import TimerState from "../TimerState"

class TimerBox extends Component {
    componentWillReceiveProps(newProps) {
        if(this.state.timerState !== TimerState.Running && newProps.timerState === TimerState.Running) {
            this.startTicking()
        }
        if(this.state.timerState === TimerState.Running && newProps.timerState === TimerState.Paused) {
            this.stopTimer()
        }
        if(this.props.sessionTime !== newProps.sessionTime && this.props.sessionName !== newProps.sessionName) {
            this.setState({
                timeInSeconds: newProps.sessionTime
            })
        }
        this.setState({
            timerState: newProps.timerState
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            timeInSeconds: props.sessionTime,
            timerState: props.timerState
        };
        this.timer = null
    }

    get minutes() {
        let minutes = parseInt(this.state.timeInSeconds / 60);
        return minutes > 9 ? `${minutes}` : `0${minutes}`;
    }

    get seconds() {
        let seconds = parseInt(this.state.timeInSeconds % 60);
        return seconds > 9 ? `${seconds}` : `0${seconds}`;
    }

    stopTimer() {
        this.timer && clearInterval(this.timer)
    }

    onTimerComplete() {
        this.stopTimer()
        this.props.onTimerComplete && this.props.onTimerComplete()
    }

    startTicking = () => {
        this.timer = setInterval(() => {
            if (this.state.timeInSeconds === 0) {
                this.onTimerComplete()
            } else {
                this.setState((state, props) => ({
                    timeInSeconds: state.timeInSeconds - 1
                }));
            }
        }, 1000);
    }

    render() {
        return (
            <div>
                <span id="timer-box-name">{this.props.sessionName}</span>
                <span id="timer-box-time">{`${this.minutes} : ${this.seconds}`}</span>
            </div>
        );
    }
}

export default TimerBox;
