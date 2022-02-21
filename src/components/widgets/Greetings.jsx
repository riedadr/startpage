import React, { Component } from "react";

export default class Greetings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "Hello",
            user: localStorage.user,
        };
    }

    componentDidMount() {
        const getMsg = () => {
            const today = new Date();
            let h = today.getHours();

            if (h > 21 && h <= 5) return "Good Night";
            if (h > 5 && h <= 12) return "Good Morning";
            if (h > 12 && h <= 17) return "Good Afternoon";
            if (h > 17 && h <= 21) return "Good Evening";
        };

        this.setState({
            msg: getMsg()
        })
    }
    render() {
        return (
            <div className="text-center">
                <p>
                    <span className="text-accent">{this.state.msg}</span>,{" "}
                    {this.state.user}
                </p>
            </div>
        );
    }
}
