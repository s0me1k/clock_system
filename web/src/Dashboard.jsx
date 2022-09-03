import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import Provider from "./context/provider";
import Context from "./context/context";

import Overview from "./components/Overview";
import Profile from "./components/Profile";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    NavItem = (props) => {
        return (
            <div className={`Nav_Item ${props.name === props.tab ? "Nav_Item_Current" : ""}`} onClick={() => { props.onClick(props.name) }}>{props.label}</div>)
    }

    SwitchNav = (props) => {
        switch(props.tab) {
            case "overview":
                return <Overview />;
            case "profile":
                return <Profile />;
            default:
                return null;
        }
    }

    render() {
        return (
            <Provider>
                <Context.Consumer>
                    {value => (
                        <div className="Main_Wrapper">
                            <div className="Main_Header">
                                <span className="Header_Title">MRP</span>
                                <span className="Header_User">{value.user?.username}</span>

                                <div className="Header_Nav">
                                    <this.NavItem onClick={value.SetCurrentTab} tab={value.currentTab} name="overview" label="Uren Registratie" />
                                    <this.NavItem onClick={value.SetCurrentTab} tab={value.currentTab} name="profile" label="Mijn Profiel" />
                                </div>
                            </div>

                            <this.SwitchNav tab={value.currentTab} />
                        </div>
                    )}
                </Context.Consumer>
            </Provider>
        )
    }
}

export default Main;