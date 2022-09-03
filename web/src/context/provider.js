import Context from './context';
import React from 'react';
import uuid from 'react-uuid';

class Provider extends React.Component {
    state = {
        user: false,
        clockTimes: [],
        clockWeeks: [],
        currentTab: "overview",
    };

    apiReq = (path, body, method) => {
        return fetch(`http://localhost:5000/api/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }).then(res => res.json()).then(data => {
            return data
        }).catch(error => {
            console.log(error.message);
            return null;
        });
    }

    clockIn = (weekNum) => {
        const clockData = {
            token: this.state.user.token,
            date: new Date(),
            week: weekNum,
            id: uuid(),
        }

        this.apiReq("clockInUser", { data: clockData }).then(res => {
            if (res.message === "ok")
            {
                this.refreshUser(this.state.user.token);
                this.getClockTimes(this.state.user.token);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    clockOut = () => {
        const clockData = {
            token: this.state.user.token,
            id: this.state.user.last_clock,
            date: new Date(),
        }

        this.apiReq("clockOutUser", { data: clockData }).then(res => {
            if (res.message === "ok")
            {
                this.refreshUser(this.state.user.token);
                this.getClockTimes(this.state.user.token);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    Clear = () => {
        this.apiReq("clearList", { token: this.state.user.token }).then(res => {
            if (res.message === "ok")
            {
                this.refreshUser(this.state.user.token);
                this.getClockTimes(this.state.user.token);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    refreshUser = (userToken) => {
        this.apiReq("getUserFromToken", { token: userToken }).then(res => {
            const foundUser = res.user;
            if (foundUser) {
                this.setState({ user: foundUser });
            } else {
                console.log("No user found..")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getClockTimes = (userToken) => {
        this.apiReq("getClockTimes", { token: userToken }).then(res => {
            if (res)
            {
                const rows = res.data;
                if (rows) {
                    this.setState({ clockTimes: rows });
                }
            }
        }).catch(err => {
            console.log(err)
        })
    }

    getWeeks = (userToken) => {
        const GetTotalTime = (startTime, endTime) => {
            var diffMs = (new Date(endTime) - new Date(startTime)); // milliseconds between now & Christmas
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

            console.log(diffMs)

            return {
                hours: diffHrs,
                minutes: diffMins,
            };
        }

        const GetTotalMoney = (startTime, endTime) => {
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            const totalSeconds = ((endDate - startDate) / 1000);
            const moneyPerHour = (10 / 3600)
            return totalSeconds * moneyPerHour;
        }

        this.apiReq("getClockTimes", { token: userToken }).then(res => {
            if (res)
            {
                let retval = [];
                const rows = res.data;
                let weeks = {};

                // Sort clock times per week
                rows.forEach(value => {
                    weeks[value.week] = weeks[value.week] ? weeks[value.week] : [];
                    weeks[value.week].push(value);
                });

                Object.keys(weeks).forEach((value, index) => {
                    const weekNumber = value;
                    
                    let data = {}
                    data.id = index;
                    data.week = weekNumber;
                    data.totalHours = { hours: 0, minutes: 0 };
                    data.totalSalary = 0;
                    
                    weeks[weekNumber].forEach(clock => {
                        const totalTime = GetTotalTime(clock.starttime, clock.endtime ? clock.endtime : new Date());

                        data.totalHours.hours += totalTime.hours;
                        data.totalHours.minutes += totalTime.minutes;
                        data.totalSalary += GetTotalMoney(clock.starttime, clock.endtime ? clock.endtime : new Date());
                    });

                    retval.push(data);
                });

                this.setState({ clockWeeks: retval });
            }
        }).catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        const userToken = sessionStorage.getItem('userToken');
    
        if (userToken)
        {
            this.refreshUser(userToken);
            this.getClockTimes(userToken);
        }
    }

    setCurrentTab = (tab) => {
        const userToken = sessionStorage.getItem('userToken');
        this.setState({ currentTab: tab });
        if (tab === "profile") {
            this.getWeeks(userToken);
        }
    }

    render() {
        return (
            <Context.Provider
                value={{
                    user: this.state.user,
                    clockTimes: this.state.clockTimes,
                    clockWeeks: this.state.clockWeeks,
                    currentTab: this.state.currentTab,
                    SetCurrentTab: this.setCurrentTab,
                    ClockIn: this.clockIn,
                    ClockOut: this.clockOut,
                    Clear: this.Clear,
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default Provider;