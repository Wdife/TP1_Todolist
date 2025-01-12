// Initialisation de l'application
document.addEventListener("DOMContentLoaded", () => {
    // Création de l'interface utilisateur dynamique
    const container = document.createElement("div");
    container.style.padding = "20px";

    const inputTache = document.createElement("input");
    inputTache.id = "inputTache";
    inputTache.placeholder = "Entrez une tâche...";
    inputTache.type = "text";

    const ajouterButton = document.createElement("button");
    ajouterButton.id = "ajouterTache";
    ajouterButton.textContent = "Ajouter une tâche";
    ajouterButton.addEventListener("click", () => ajouterTache());

    // Création du tableau
    const table = document.createElement("table");
    table.id = "todoTable";

    // Ajouter les éléments au conteneur
    container.appendChild(inputTache);
    container.appendChild(ajouterButton);

    // Ajouter un titre sous l'input et le bouton
    const headerTitle = document.createElement("div");
    headerTitle.textContent = "Liste des tâches";
    headerTitle.style.backgroundColor = "#007bff"; // Nouvelle couleur
    headerTitle.style.color = "white";
    headerTitle.style.textAlign = "center";
    headerTitle.style.fontSize = "20px";
    headerTitle.style.padding = "10px";
    headerTitle.style.marginTop = "20px"; // Ajout du margin-top
    headerTitle.style.marginBottom = "10px";
    headerTitle.style.fontWeight = "bold";
    container.appendChild(headerTitle);

    container.appendChild(table);
    document.body.appendChild(container);

    // Variables globales
    let tableauTaches = [];
    let tableauTermine = [];

    // Fonction pour ajouter une tâche
    function ajouterTache() {
        const valeur = inputTache.value.trim();
        if (valeur !== "") {
            tableauTaches.push(valeur);
            tableauTermine.push(false);
            console.log(tableauTaches);
            ajouterTacheHTML(valeur, tableauTaches.length);
            inputTache.value = ""; // Réinitialise le champ
        }
    }

    // Fonction pour mettre à jour l'interface HTML
    function ajouterTacheHTML(item, index) {
        if (!table.querySelector("thead")) {
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            ["Terminée", "Numéro", "Libellé", "Actions"].forEach((titre, idx) => {
                const th = document.createElement("th");
                th.textContent = titre;
                if (idx === 1) th.style.width = "10px";
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");
            table.appendChild(tbody);
        }

        const tbody = table.querySelector("tbody");

        const row = document.createElement("tr");
        const checkboxCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `check-${index}`;
        checkbox.addEventListener("change", () => cocher(index));
        checkboxCell.appendChild(checkbox);

        const numCell = document.createElement("td");
        numCell.textContent = index;
        numCell.style.textAlign = "center";

        const libelleCell = document.createElement("td");
        libelleCell.textContent = item;

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", () => supprimerTache(index));
        actionCell.appendChild(deleteButton);

        row.appendChild(checkboxCell);
        row.appendChild(numCell);
        row.appendChild(libelleCell);
        row.appendChild(actionCell);

        tbody.appendChild(row);
    }

    // Fonction pour gérer les cases à cocher
    function cocher(index) {
        tableauTermine[index - 1] = !tableauTermine[index - 1];
        console.log(`Tâche ${index} est ${tableauTermine[index - 1] ? "terminée" : "non terminée"}`);
        const libelleCell = document.querySelector(`table tbody tr:nth-child(${index}) td:nth-child(3)`);
        if (tableauTermine[index - 1]) {
            libelleCell.innerHTML = `<s>${libelleCell.textContent}</s>`;
        } else {
            libelleCell.innerHTML = libelleCell.textContent;
        }
    }

    // Fonction pour supprimer une tâche
    function supprimerTache(index) {
        tableauTaches.splice(index - 1, 1);
        tableauTermine.splice(index - 1, 1);
        table.querySelector("tbody").deleteRow(index - 1);
        console.log(`Tâche ${index} supprimée`);
        // Réindexation
        Array.from(table.querySelectorAll("tbody tr")).forEach((row, i) => {
            row.querySelector("td:nth-child(2)").textContent = i + 1;
            row.querySelector("input[type='checkbox']").id = `check-${i + 1}`;
            row.querySelector("button").onclick = () => supprimerTache(i + 1);
        });
    }

    // Création de l'élément <select> pour le filtrage
    const selectFilter = document.createElement("select");
    selectFilter.id = "filterTasks";
    selectFilter.addEventListener("change", () => filterTasks(selectFilter.value));

    // Ajout des options au sélecteur
    const options = [
        { value: "all", text: "Toutes les tâches" },
        { value: "completed", text: "Tâches terminées" },
        { value: "uncompleted", text: "Tâches non terminées" }
    ];

    options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        selectFilter.appendChild(opt);
    });

    // Ajouter le sélecteur à l'interface utilisateur
    container.appendChild(selectFilter);

    // Fonction de filtrage
    function filterTasks(filterType) {
        const rows = document.querySelectorAll("table tbody tr");
        rows.forEach((row, index) => {
            const isCompleted = tableauTermine[index];
            if (filterType === "all") {
                row.style.display = "";
            } else if (filterType === "completed" && isCompleted) {
                row.style.display = "";
            } else if (filterType === "uncompleted" && !isCompleted) {
                row.style.display = "none";
            } else {
                row.style.display = "none";
            }
        });
    }
});
