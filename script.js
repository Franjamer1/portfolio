/* ---------- THEME SWITCH ---------- */
const switcher = document.querySelector(".theme-switch");
if (localStorage.getItem("theme") === "light") {
    document.documentElement.classList.add("light-mode");
}

switcher.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-mode");
    if (document.documentElement.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

/* ---------- DAILY LOGS GRID ---------- */
const dailyContainer = document.getElementById("daily-container");

fetch("./news/news.json")
    .then(res => res.json())
    .then(data => {
        const posts = Array.isArray(data.posts) ? data.posts.slice() : [];
        posts.sort((a, b) => Number(a.day) - Number(b.day));

        posts.forEach(post => {
            const card = document.createElement("div");
            card.classList.add("news-card");

            card.innerHTML = `
                <img src="${post.image}" alt="Day ${post.day}" class="news-img">
                <div class="news-info">
                    <h3 class="news-title">Day ${post.day}: ${post.title}</h3>
                    <p class="news-desc">${post.description}</p>
                    <a href="${post.repo}" target="_blank">View repo</a>
                </div>
            `;
            dailyContainer.appendChild(card);
        });
    })
    .catch(err => {
        console.error(err);
        dailyContainer.innerHTML = "<p style='color:var(--color-text-secondary)'>Error loading daily logs.</p>";
    });

/* ---------- MODAL para imágenes ---------- */
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");

// Abrir el modal al hacer click en cualquier imagen .news-img
document.addEventListener("click", e => {
    if (e.target.classList.contains("news-img")) {
        modalImg.src = e.target.src;
        modal.style.display = "flex";
    }
});

// Cerrar el modal al hacer click afuera
modal.addEventListener("click", () => {
    modal.style.display = "none";
});
