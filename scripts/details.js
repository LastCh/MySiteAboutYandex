document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = params.get("type");

    fetch("data/content.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");

            let contentNode;
            if (type === "tech") {
                contentNode = Array.from(xmlDoc.getElementsByTagName("tech"))
                    .find(tech => tech.getAttribute("id") === id);
            } else if (type === "case") {
                contentNode = Array.from(xmlDoc.getElementsByTagName("case"))
                    .find(caseItem => caseItem.getAttribute("id") === id);
            }

            if (contentNode) {
                const title = contentNode.getElementsByTagName("title")[0].textContent;
                const description = contentNode.getElementsByTagName("description")[0].textContent;
                const image = contentNode.getElementsByTagName("image")[0].textContent;
                const details = Array.from(contentNode.getElementsByTagName("details")[0].children)
                    .map(child => {
                        if (child.tagName === "h4") {
                            return `<h4>${child.textContent}</h4>`;
                        }
                        return `<p>${child.textContent}</p>`;
                    })
                    .join("");

                const contentDiv = document.getElementById("details-content");
                contentDiv.innerHTML = `
                    <img src="${image}" alt="${title}" class="details-image">
                    <h2>Описание</h2>
                    <p>${description}</p>
                    <h2>Подробности</h2>
                    ${details}
                `;
            } else {
                document.getElementById("details-content").innerHTML = `<p>Данные не найдены.</p>`;
            }
        })
        .catch(error => console.error("Ошибка загрузки XML:", error));
});
