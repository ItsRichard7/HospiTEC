const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://alerodcas:%40le123456@hospitec.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000";

const client = new MongoClient(uri);

const dbName = 'HospiTEC'; 
const collectionName = 'evalServicio';

async function connectToDatabase() {
    await client.connect();
    console.log("Connected to the database!");
    return client.db(dbName).collection(collectionName);
}

async function insertEvalServicio(document) {
    const collection = await connectToDatabase();
    const result = await collection.insertOne(document);
    console.log(`Inserted document with _id: ${result.insertedId}`);
    return result;
}

async function getAllEvalServicio() {
    const collection = await connectToDatabase();
    const documents = await collection.find({}).toArray();
    console.log("All documents in evalServicio collection:");
    console.log(documents);
    return documents;
}

module.exports = {
    insertEvalServicio,
    getAllEvalServicio
};
