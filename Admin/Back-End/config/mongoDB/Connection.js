const mongoose = require("mongoose");
require("dotenv").config();

//Function create new connection
function makeNewConnection(uri) {
    const db = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db.on("error", function (error) {
        console.log(
            `MongoDB :: connection ${this.name} ${JSON.stringify(error)}`
        );
        db.close().catch(() =>
            console.log(`MongoDB :: failed to close connection ${this.name}`)
        );
    });

    db.on("connected", function () {
        mongoose.set("debug", function (col, method, query, doc) {
            console.log(
                `MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
                    query
                )},${JSON.stringify(doc)})`
            );
        });
        console.log(`MongoDB :: connected ${this.name} successfully`);
    });

    db.on("disconnected", function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });

    return db;
}

const publicConnection = makeNewConnection(process.env.DB_LIST_PUBLIC);
const list4MConnection = makeNewConnection(process.env.DB_List_4M);

module.exports = {
    publicConnection,
    list4MConnection,
};
