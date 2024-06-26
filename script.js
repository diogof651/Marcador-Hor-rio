document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-button");
    const resultDiv = document.getElementById("result");

    generateButton.addEventListener("click", function (e) {
        e.preventDefault(); // Evita que o formulário seja enviado
        const selectedCompanies = Array.from(document.querySelectorAll('input[name="company"]:checked')).map(checkbox => checkbox.value);
        const selectedCommunication = Array.from(document.querySelectorAll('input[name="communication"]:checked')).map(checkbox => checkbox.value);
        const isCompilation = selectedCommunication.includes("Compilation");
        // const user = document.getElementById("user").value;
        const user2 = document.getElementById("select").value;

        const description = document.getElementById("description").value;

        let result = "";

        if (isCompilation) {
            const projects = description.split(',').map(project => project.trim());
            let compilationMessage = "Compilação";
            if (projects.length > 1) {
                compilationMessage += " e atualização de projetos: " + projects.join(", ") + ".";
            } else {
                compilationMessage += ` e atualização do projeto: ${description}.`;
            }
            result += compilationMessage;
        } else {
            // if (description == "") {
            //     // alert("Descrição está em branco")
            //     document.getElementById("description").focus()//setando o foco
            //     return;//saindo da função
            // }
            selectedCompanies.forEach(company => {
                selectedCommunication.forEach(communication => {
                    if ((company === "Lontano" || company === "Copas") && communication !== "E-mail" && communication !== "WhatsApp") {
                        const match = description.match(/^#(\d{5})/);
                        const ticket = match ? `#${match[1]}` : "";

                        const descriptionWithoutPrefix = description.substring(9);

                        result += `Atendimento a usuário(a): ${user2} com chamado no ${communication} ${ticket ? ticket + ' ' : ''}sobre: ${descriptionWithoutPrefix}.\n`;
                    } else if (company === "Lontano" || company === "Copas") {
                        const descriptionWithoutPrefix = description.split('-')[1].trim();
                        result += `Atendimento a usuário(a): ${user2} com chamado no ${communication} sobre: ${descriptionWithoutPrefix}.\n`;
                    } else if (company === "Rodomaior" || company === "Mademaior") {
                        if (communication === "E-mail") {
                            result += `Atendimento a usuário(a): ${user2} com e-mail encaminhado a GS sobre: ${description}.\n`;
                        } else {
                            result += `Atendimento a usuário(a): ${user2} com chamado no grupo do WhatsApp sobre: ${description}.\n`;
                        }
                    }
                });
            });
        }

        resultDiv.textContent = result;
    });

    // Desmarca outros checkboxes de empresa quando um é selecionado
    const companyCheckboxes = document.querySelectorAll('input[name="company"]');
    const empresaChkbox = document.querySelectorAll('input[name="communication"]');
    companyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                companyCheckboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
            // const checkboxAlerts = {
            //     "Lontano": "Lontano",
            //     "Rodomaior": "Rodomaior",
            //     "Mademaior": "Mademaior",
            //     "Copas": "Copas",
            //     "Agrogrande": "Agrogrande"
            // };
            // if (checkbox.value in checkboxAlerts) {
            //     alert(checkboxAlerts[checkbox.value]);
            // }
            const LontanoCbobox = {
                "Thiago": "Thiago",
                "Marilene": "Marilene",
                "Arlete": "Arlete",
                "Klark": "Klark",
                "Odair": "Odair",
                "Magno": "Magno",
                "Odeir": "Odeir",
                "Simara": "Simara",
                "Larissa": "Larissa",
                "Fagner": "Fagner",
                "Laércio": "Laércio",

            }
            const OrdenadoLontanoCbobox = sortObjectKeys(LontanoCbobox);

            const CopasCbobox = {
                "Adriana": "Adriana",
                "Larissa": "Larissa",
                "Fagner": "Fagner",
                "Laércio": "Laércio"
            }
            const OrdenadoCopasCbobox = sortObjectKeys(CopasCbobox);

            const RodomaiorCbobox = {
                "Sandra": "Sandra",
                "Laércio": "Laércio",
                "Nájila": "Nájila",
                "Vanessa": "Vanessa",
                "Emerson": "Emerson",
                "Eni": "Eni",
                "Joílson": "Joílson",
                "Adriano": "Adriano",
                "Laércio": "Laércio"
            }
            const OrdenadoRodomaiorCbobox = sortObjectKeys(RodomaiorCbobox);
            const AgrograndeCbobox = {
                "Guto": "Guto",
                "Laércio": "Laércio"
            }
            const OrdenadoAgrograndeCbobox = sortObjectKeys(AgrograndeCbobox);
            const MademaiorCbobox = {
                "Sandra": "Sandra",
                "Nájila": "Nájila",
                "Elisângela": "Elisângela",
                "Laércio": "Laércio"
            }
            const OrdenadoMademaiorCbobox = sortObjectKeys(MademaiorCbobox);

            const pegarelemento = document.getElementById("select");
            const empresaChkbox = document.querySelectorAll('input[name="company"]');
            empresaChkbox.forEach(chkbox => {
                chkbox.addEventListener("change", function () {
                    const empresaselecionada = chkbox.value;
                    pegarelemento.innerHTML = ""; // Limpar o combobox

                    // Preencher o combobox com os novos atributos
                    const comboselecionado = empresaselecionada === "Lontano" ? OrdenadoLontanoCbobox :
                        empresaselecionada === "Rodomaior" ? OrdenadoRodomaiorCbobox :
                            empresaselecionada === "Copas" ? OrdenadoCopasCbobox :
                                empresaselecionada === "Mademaior" ? OrdenadoMademaiorCbobox :
                                    empresaselecionada === "Agrogrande" ? OrdenadoAgrograndeCbobox : null;

                    for (const key in comboselecionado) {
                        const option = document.createElement("option");
                        option.value = key;
                        option.textContent = comboselecionado[key];
                        pegarelemento.appendChild(option);
                    }
                });
            });
        });
    });

    // Desmarca outros checkboxes de comunicação quando um é selecionado
    const communicationCheckboxes = document.querySelectorAll('input[name="communication"]');
    communicationCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("click", function () {
            if (checkbox.checked) {
                communicationCheckboxes.forEach(otherCheckbox => {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});

function sortObjectKeys(obj) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObject = {};

    sortedKeys.forEach(key => {
        sortedObject[key] = obj[key];
    });

    return sortedObject;
}
