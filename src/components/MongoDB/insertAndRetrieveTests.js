const { insertEvalServicio, getAllEvalServicio } = require('./db');

async function insertAndRetrieve() {
    try {
        // Insert a new document
        const document = { cedPaciente: 402580157, aseo: 5, trato: 5, puntualidad: 5, comentarios: "10/10"};
        const insertResult = await insertEvalServicio(document);
        console.log(`Inserted document with _id: ${insertResult.insertedId}`);

        // Retrieve all documents to verify insertion
        const allDocuments = await getAllEvalServicio();
        console.log("All documents after insertion:");
        console.log(allDocuments);
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

insertAndRetrieve();
