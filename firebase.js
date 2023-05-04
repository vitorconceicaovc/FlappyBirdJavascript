import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, orderBy, limit, query, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXHPJ717Mmg_TnUecDhfvtnHRnG56VTy4",
    authDomain: "flappybirdjs.firebaseapp.com",
    projectId: "flappybirdjs",
    storageBucket: "flappybirdjs.appspot.com",
    messagingSenderId: "458566429620",
    appId: "1:458566429620:web:ca0c5f5b812d24bab120e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const playersCollection = collection(db, "players");
const playersQuery = query(playersCollection, orderBy("score", "desc"), orderBy("name"), limit(10));


getDocs(playersQuery)
.then((querySnapshot) => {
    const playersList = document.getElementById("playersList");
    querySnapshot.forEach((doc) => {
        const player = doc.data();
        const playerElement = document.createElement("article");
        const scoreElement = document.createElement("p");
        const nameElement = document.createElement("p");
        scoreElement.classList.add("score")
        nameElement.classList.add("name")
        scoreElement.textContent = player.score;
        nameElement.textContent = player.name;
        playerElement.appendChild(scoreElement);
        playerElement.appendChild(nameElement);
        playersList.appendChild(playerElement);
    });
})
.catch((error) => {
    console.log("Error getting players:", error);
});

var lastScore = document.querySelector(".score")
var playerScore = parseInt(lastScore)
var playerName = document.querySelector(".name")

