const db = require("./database");

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.authUser = async function (req, res) {
    let data = req.body;

    const userName = data?.username;
    const password = data?.password;

    if (!userName && !password) {
        return res.send({ msg: "no_creds" });
    };

    const foundUser = db.GetUserFromCreds(userName);

    return foundUser.then(async (user) => {
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return res.send({ message: "match", user: user });
            } else {
                return res.send({ message: "wrong_password" });
            }
        } else {
            return res.send({ message: "no_user_found" });
        }
    }).catch(err => {
        return res.send({ message: "an_error_occured", error: err });
    });
}

exports.getUserFromToken = async function (req, res) {
    let data = req.body;

    const foundUser = db.GetUserFromToken(data.token);

    if (foundUser) {
        foundUser.then(user => {
            if (user)
            {
                return res.send({ user: user });
            }
        })
    } else {
        return res.send({ user: false });
    }
}

exports.clockInUser = async function (req, res) {
    const clockData = req.body?.data;
    const query = db.ClockInUser(clockData);
    return res.send({ message: "ok" });
}

exports.clockOutUser = async function (req, res) {
    const clockData = req.body?.data;
    const query = db.ClockOutUser(clockData);
    return res.send({ message: "ok" });
}

exports.clearList = async function (req, res) {
    const body = req.body;
    const query = db.ClearList(body?.token);
    return res.send({ message: "ok" });
}

exports.getClockTimes = async function (req, res) {
    const data = req.body;
    if (data.token) {
        const query = db.GetClockTimes(data.token);
        query.then(value => {
            return res.send({ data: value });
        }).catch(err => {
            return res.send({ message: err });
        })
    } else {
        return res.send({ data: [] });
    }
}