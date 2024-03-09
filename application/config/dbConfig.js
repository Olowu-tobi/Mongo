const MongoClient = require("mongodb").MongoClient;
// create a mongodb url
const mongoDBUrl =
  "mongodb+srv://tobiolowu2001:xSVc7RlW7wbRDzE8@tobi.oxgd4cz.mongodb.net/?retryWrites=true&w=majority&appName=Tobi";

let _db;
const databaseName = "Tobi";

const connectDB = async () => {
  const client = await MongoClient.connect(mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  _db = client.db(databaseName);
};

const getDB = async () => {
  if (!_db) {
    throw new Error("Databases cannot be found");
  }
  return _db;
};

module.exports = { connectDB, getDB };
