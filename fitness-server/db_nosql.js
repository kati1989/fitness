const { MongoClient } = require('mongodb');

let connection;
const uri = "mongodb+srv://kkovacskati89:FQVAxY14vl3xlyR0@fitnessdb.whzuomm.mongodb.net/?retryWrites=true&w=majority&appName=fitnessdb";

async function connect() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    connection = client.db('fitness_db');
    console.log('Connected to MongoDB');
    return connection;  // Add this line
}

module.exports = { connection, connect };
