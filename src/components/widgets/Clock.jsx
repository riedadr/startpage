import React, { Component } from "react";

export default class Clock extends Component {
    constructor(props) {
        super(props);
        const show = () => {
            if (!localStorage.widgets) return false;
            let widlist = localStorage.widgets.split(",");
            if (widlist.includes("clock")) return true;
            return false;
        };
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            day: "Noday",
            date: 0,
            month: 0,
            year: 0,
            showClock: show(),
        };
    }

    componentDidMount() {
        if (this.state.showClock) {
            const startTime = () => {
                const today = new Date();
                let h = today.getHours();
                let m = today.getMinutes();
                let s = today.getSeconds();
                h = checkTime(h);
                m = checkTime(m);
                s = checkTime(s);

                let week = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                ];

                let months = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "September",
                    "October",
                    "November",
                    "December",
                ];

                let day = week[today.getDay()];

                let date = today.getDate();
                let month = months[today.getMonth()];
                let year = today.getFullYear();

                this.setState({
                    hours: h,
                    minutes: m,
                    seconds: s,
                    day: day,
                    date: date,
                    month: month,
                    year: year,
                });
                setTimeout(startTime, 1000);
            };
            function checkTime(i) {
                if (i < 10) i = "0" + i;
                return i;
            }
            startTime();
        }
    }

    render() {
        if (this.state.showClock) {
            return (
                <>
                    <div
                        className="Clock widget text-center"
                        id={localStorage.blur ? "blurred" : ""}
                    >
                        <p className="text-5xl text-accent">
                            {this.state.hours}:{this.state.minutes}:
                            {this.state.seconds}
                        </p>
                        <p>
                            It's{" "}
                            <span className="text-accent">
                                {this.state.day}
                            </span>
                            .
                        </p>
                        <p>
                            {this.state.date}. {this.state.month}{" "}
                            {this.state.year}
                        </p>
                    </div>
                </>
            );
        } else {
            return <></>;
        }
    }
}
