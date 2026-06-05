import { db } from "./index.js";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const STORAGE_KEY = "salontech-avaliacoes";
const MAX_VISIBLE = 10;
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const feedbackRow = document.querySelector("#feedback .row");
const feedbackSection = document.querySelector("#feedback");
const avaliacaoForm = document.querySelector(".avaliacao-form");
let allReviews = [];
let visibleCount = MAX_VISIBLE;

function renderReview(review) {
    if (!feedbackRow) return;

    const article = document.createElement("article");
    article.className = "col-md-6";
    article.innerHTML = `
        <div class="testimonial">
            ${review.nota || "⭐"}
            <p>${review.experiencia || ""}</p>
            <h6>${review.nome || "Cliente"}</h6>
            <p class="testimonial-date">${review.data || ""}</p>
        </div>
    `;

    feedbackRow.appendChild(article);
}

function renderVisibleReviews() {
    if (!feedbackRow) return;

    feedbackRow.innerHTML = "";

    const reviewsToShow = allReviews.slice(0, visibleCount);
    reviewsToShow.forEach(renderReview);

    const showMoreButton = document.getElementById("show-more-reviews");
    if (showMoreButton) {
        showMoreButton.style.display = allReviews.length > visibleCount ? "inline-block" : "none";
    }
}

// function loadReviews() {
//     if (!feedbackRow) return;

//     allReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//     renderVisibleReviews();
// }

async function loadReviews() {

    try {

        const q = query(
            collection(db, "avaliacoes"),
            orderBy("timestamp", "desc")
        );

        const snapshot = await getDocs(q);

        allReviews = [];

        snapshot.forEach((doc) => {

            allReviews.push({
                id: doc.id,
                ...doc.data()
            });

        });

        renderVisibleReviews();

    } catch (error) {

        console.error(
            "Erro ao carregar avaliações:",
            error
        );

    }

}

// function saveReview(review) {
//     allReviews = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//     allReviews.unshift(review);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(allReviews));
//     visibleCount = MAX_VISIBLE;
//     renderVisibleReviews();
// }

async function saveReview(review) {

    try {

        await addDoc(
            collection(db, "avaliacoes"),
            review
        );

        await loadReviews();

    } catch (error) {

        console.error(
            "Erro ao salvar avaliação:",
            error
        );

    }

}

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

if (avaliacaoForm) {
    avaliacaoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome-avaliacao")?.value.trim() || "Cliente";
        const nota = document.getElementById("nota-avaliacao")?.value || "⭐";
        const experiencia = document.getElementById("experiencia-avaliacao")?.value.trim() || "Atendimento excelente!";
        const data = new Date().toLocaleDateString("pt-BR");

        const review = {
            nome,
            nota,
            experiencia,
            data,
            timestamp: Date.now()
        };

        saveReview(review);
        avaliacaoForm.reset();
    });
}

const showMoreButton = document.getElementById("show-more-reviews");
if (showMoreButton) {
    showMoreButton.addEventListener("click", () => {
        visibleCount += MAX_VISIBLE;
        renderVisibleReviews();
    });
}

loadReviews();