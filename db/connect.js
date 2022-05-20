const dotenv = require('dotenv');
dotenv.config();

// database
const MongoClient = require('mongodb').MongoClient;

let _client;
let _collection;

const initDb = () => {

    MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
        if (err) throw err;
        _client = client;
        _collection = client.db("tdl").collection("todo");
        console.log("Db Connected Successfully")
    });
};
const getCollection = () => {
    return _collection;
};

module.exports = { initDb, getCollection }; 