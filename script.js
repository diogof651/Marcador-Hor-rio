document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-button");
    const resultDiv = document.getElementById("result");

    generateButton.addEventListener("click", function (e) {
        e.preventDefault(); // Evita que o formulário seja enviado

        const selectedCompanies = Array.from(document.querySelectorAll('input[name="company"]:checked')).map(checkbox => checkbox.value);
        const selectedCommunication = Array.from(document.querySelectorAll('input[name="communication"]:checked')).map(checkbox => checkbox.value);
        const user = document.getElementById("user").value;
        const description = document.getElementById("description").value;

        let result = "";

        selectedCompanies.forEach(company => {
            selectedCommunication.forEach(communication => {
                if ((company === "Lontano" || company === "Copas" || company === "Agrogrande") && communication !== "E-mail" && communication !== "WhatsApp") {
                    const match = description.match(/^#(\d{5})/);
                    const ticket = match ? `#${match[1]}` : "";

                    const descriptionWithoutPrefix = description.split('-')[1].trim();

                    result += `Atendimento a usuário(a): ${user} com chamado no ${communication} ${ticket ? ticket + ' ' : ''}sobre: ${descriptionWithoutPrefix}\n`;
                } else if (company === "Lontano" || company === "Copas" || company === "Agrogrande") {
                    const descriptionWithoutPrefix = description.split('-')[1].trim();
                    result += `Atendimento a usuário(a): ${user} com chamado no ${communication} sobre: ${descriptionWithoutPrefix}\n`;
                } else if (company === "Rodomaior" || company === "Mademaior") {
                    if (communication === "E-mail") {
                        result += `Atendimento a usuário(a): ${user} com e-mail encaminhado a GS sobre: ${description}\n`;
                    } else {
                        result += `Atendimento a usuário(a): ${user} com chamado no grupo do WhatsApp sobre: ${description}\n`;
                    }
                }
            });
        });

        resultDiv.textContent = result;
    });
});
