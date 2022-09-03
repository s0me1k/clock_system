const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mrp_clocking",

    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

async function GetUserFromCreds(userName, password) {
    let query = `SELECT * FROM users WHERE username = ?`;
    let retval = await pool.query(query, userName).then(result => result[0][0]).catch((error) => console.log(error));
    return retval;
}

async function GetUserFromToken(token) {
    let query = `SELECT * FROM users WHERE token = ?`;
    let retval = await pool.query(query, token).then(result => result[0][0]).catch((error) => console.log(error));
    return retval;
}

async function GetClockTimes(token) {
    let query = `SELECT * FROM clock_times WHERE token = ?`;
    let retval = await pool.query(query, [token]).then(result => result[0]).catch((error) => console.log(error));
    return retval;
}

async function ClockInUser(data) {
    await pool.query("INSERT INTO clock_times (`token`, `id`, `starttime`, `week`) VALUES (?, ?, ?, ?)", [data.token, data.id, data.date, data.week]).then(result => result[0][0]).catch((error) => console.log(error));
    await pool.query("UPDATE users SET last_clock = ? WHERE token = ?", [data.id, data.token]).then(result => result[0][0]).catch((error) => console.log(error));
}

async function ClockOutUser(data) {
    await pool.query("UPDATE clock_times SET endtime = ? WHERE id = ?", [data.date, data.id]).then(result => result[0][0]).catch((error) => console.log(error));
    await pool.query("UPDATE users SET last_clock = ? WHERE token = ?", [null, data.token]).then(result => result[0][0]).catch((error) => console.log(error));
}

async function ClearList(token) {
    await pool.query("DELETE FROM clock_times WHERE token = ?", [token]).then(result => result[0][0]).catch((error) => console.log(error));
    await pool.query("UPDATE users SET last_clock = ? WHERE token = ?", [null, token]).then(result => result[0][0]).catch((error) => console.log(error));
}

exports.GetUserFromCreds = GetUserFromCreds;
exports.GetUserFromToken = GetUserFromToken;
exports.ClockInUser = ClockInUser;
exports.GetClockTimes = GetClockTimes;
exports.ClockOutUser = ClockOutUser;
exports.ClearList = ClearList;