document.addEventListener("DOMContentLoaded", () => {
    fetch("data/content.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            // Секция "О машинном обучении"
            const intro = xmlDoc.querySelector("mainPage > introduction");
            const introTitle = intro.querySelector("title").textContent;
            const introDetails = Array.from(intro.querySelector("details").children)
                .map(p => `<p>${p.textContent}</p>`)
                .join("");

            const aboutMLContainer = document.querySelector("#about-ml .content-block");
            aboutMLContainer.innerHTML = `
                <h1>${introTitle}</h1>
                ${introDetails}
            `;

            // Секция "Технологии"
            const technologiesContainer = document.querySelector("#technologies .content-block");
            const technologies = xmlDoc.getElementsByTagName("tech");

            Array.from(technologies).forEach(tech => {
                const id = tech.getAttribute("id");
                const title = tech.getElementsByTagName("title")[0].textContent;
                const description = tech.getElementsByTagName("description")[0].textContent;
                const image = tech.getElementsByTagName("image")[0].textContent;

                const card = `
                    <a href="details.html?type=tech&id=${id}" class="card">
                        <img src="${image}" alt="${title}" class="card-image">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </a>
                `;
                technologiesContainer.innerHTML += card;
            });

            // Секция "Где применяются технологии"
            const applications = xmlDoc.querySelector("applications");
            const applicationsTitle = applications.querySelector("title").textContent;
            const applicationsDescription = applications.querySelector("description").textContent;
            const points = Array.from(applications.querySelectorAll("points > point"))
                .map(point => point.innerHTML) // Используем innerHTML для обработки разметки
                .join("");

            const applicationsContainer = document.querySelector("#applications .container");
            applicationsContainer.innerHTML = `
                <h2>${applicationsTitle}</h2>
                <p>${applicationsDescription}</p>
                <ul>${points}</ul>
            `;

            // Секция "Кейсы"
            const casesContainer = document.querySelector("#cases .content-block");
            const cases = xmlDoc.getElementsByTagName("case");
            Array.from(cases).forEach(caseItem => {
                const id = caseItem.getAttribute("id");
                const title = caseItem.getElementsByTagName("title")[0].textContent;
                const description = caseItem.getElementsByTagName("description")[0].textContent;
                const image = caseItem.getElementsByTagName("image")[0].textContent;

                const card = `
                    <a href="details.html?type=case&id=${id}" class="card">
                        <img src="${image}" alt="${title}" class="card-image">
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </a>
                `;
                casesContainer.innerHTML += card;
            });
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));
});
