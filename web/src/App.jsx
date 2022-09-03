import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./Dashboard";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const userToken = sessionStorage.getItem('userToken');

        return (
            <div className="Main_Wrapper">
                <Routes>
                    {/* If logged in redirect to dashboard, otherwise to login page */}
                    <Route path="/" element={ <> { !userToken ? <Navigate to={"/login"} replace={true} /> : <Navigate to={"/dashboard"} replace={true} /> } </> } />

                    {/* If logged in redirect to dashboard, otherwise to login page */}
                    <Route path="/login" element={ <> { !userToken ? <Login /> : <Navigate to={"/dashboard"} replace={true} /> } </> } />

                    {/* If not logged in redirect to login, otherwise to dashboard page */}
                    <Route path="/dashboard" element={ <> { !userToken ? <Navigate to={"/login"} replace={true} /> : <Dashboard /> } </> } />
                </Routes>
            </div>
        )
    }
}

export default App;