require("dotenv").config();

function main() {
  if (!process.env.API_KEY) {
    console.error("Missing configuration inside .env file");
    process.exit(1);
    return;
  }

  const databaseName = process.argv[2];

  if (!databaseName) {
    console.error("Please pass collection name to udpate");
    process.exit(1);
    return;
  }

  const data = require("./data.json");

  const firebase = require("firebase");
  // Required for side-effects
  require("firebase/firestore");
  // Initialize Cloud Firestore through Firebase
  firebase.initializeApp({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
  });
  const db = firebase.firestore();
  db.collection(databaseName)
    .add(data)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
      process.exit(1);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
      process.exit(1);
    });
}

main();
