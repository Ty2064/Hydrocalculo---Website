// parte das perguntas
const questions = [
    {
        id: "frequencia",
        category: "USO DE IA",
        title: "Com que frequência você usa inteligência artificial na semana?",
        options: [
            { label: "Nunca", value: "nunca" },
            { label: "1 a 2 vezes por semana", value: "umaDuas" },
            { label: "3 a 4 vezes por semana", value: "tresQuatro" },
            { label: "5 a 6 vezes por semana", value: "cincoSeis" },
            { label: "Todos os dias", value: "todosDias" }
        ]
    },
    {
        id: "tempo",
        category: "TEMPO DE USO",
        title: "Por quanto tempo você costuma usar a IA ?",
        options: [
            { label: "Até 10 minutos", value: "ate10" },
            { label: "Entre 10 e 30 minutos", value: "dezTrinta" },
            { label: "Entre 30 minutos e 1 hora", value: "trintaSessenta" },
            { label: "Mais de 1 hora", value: "maisUmaHora" },
            { label: "Uso contínuo ao longo do dia", value: "continuo" },
        ]
    },
    {
        id: "modelo",
        category: "MODELO DE IA",
        title: "Qual modelo de IA você mais utiliza?",
        options: [
            { label: "ChatGPT", value: "chatgpt" },
            { label: "Claude", value: "claude" },
            { label: "Gemini", value: "gemini" },
            { label: "Perplexity", value: "perplexity" },
            { label: "Outro", value: "outro" }
        ]
    },
    {
        id: "prompt",
        category: "PROMPTS",
        title: "Qual o tamanho médio dos seus prompts?",
        options: [
            { label: "Curto: menos de 10 palavras", value: "curto" },
            { label: "Médio: entre 10 e 50 palavras", value: "medio" },
            { label: "Longo: mais de 50 palavras", value: "longo" }
        ]
    },
    {
        id: "tarefa",
        category: "TIPO DE USO",
        title: "Qual tipo de tarefa você mais realiza com IA?",
        options: [
            { label: "Perguntas simples", value: "simples" },
            { label: "Resumos e textos", value: "textos" },
            { label: "Programação", value: "programacao" },
            { label: "Geração de vídeos", value: "video" },
            { label: "Geração de imagens", value: "imagem" }
        ]
    }
];

// funciopnalidades para o quiz

let currentQuestion = 0;
const answers = {};

const category = document.getElementById("category");
const questionTitle = document.getElementById("question-title");
const optionsForm = document.getElementById("options-form");
const nextBtn = document.getElementById("next-btn");

function showQuestion() {
    const question = questions[currentQuestion];

    category.textContent = question.category;
    questionTitle.textContent = question.title;
    optionsForm.innerHTML = "";

    question.options.forEach(function(option) {
        const label = document.createElement("label");
        const checked = answers[question.id] === option.value ? "checked" : "";

        label.innerHTML = `
            <input type="radio" name="answer" value="${option.value}" ${checked}>
            ${option.label}
        `;

        optionsForm.appendChild(label);
    });

    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Calcular" : "Próxima";
}

function calcularGastoHidrico() {
    const t = TABELAS_HYDRO;

    const usosSemana = t.frequenciaSemanal[answers.frequencia];
    const minutosUso = t.tempoPorUsoMinutos[answers.tempo];
    const modelo = t.modelos[answers.modelo] || t.modelos.outro;
    const tokensBase = t.tokensPorPrompt[answers.prompt];
    const multiplicadorTarefa = t.multiplicadorTarefa[answers.tarefa];
    const consultasPorMinuto = t.consultasPorMinuto[answers.tarefa];
    const cenario = t.cenariosGeograficos[answers.cenario];

    const consultasSemana = usosSemana * minutosUso * consultasPorMinuto;
    const tokensPorConsulta = tokensBase * multiplicadorTarefa;
    const energiaKwhPorConsulta = (tokensPorConsulta / 1000) * (modelo.whPorMilTokens / 1000) * cenario.pue;
    const aguaLitrosPorConsulta = energiaKwhPorConsulta * cenario.wueLitrosPorKwh;
    const aguaLitrosPorMes = consultasSemana * aguaLitrosPorConsulta * t.semanasPorMes;

    return {
        consultasSemana,
        tokensPorConsulta,
        energiaKwhPorConsulta,
        aguaLitrosPorConsulta,
        aguaLitrosPorMes,
        modelo: modelo.nome,
        cenario: cenario.nome
    };
}

function showResult() {
    const resultado = calcularGastoHidrico();

    category.textContent = "RESULTADO";
    questionTitle.textContent = "Estimativa de gasto hídrico mensal";

    optionsForm.innerHTML = `
        <div class="result-card">
            <p><strong>${resultado.aguaLitrosPorMes.toFixed(4)} litros de água por mês</strong></p>
            <p>Cenário usado: ${resultado.cenario}</p>
            <p>Modelo considerado: ${resultado.modelo}</p>
            <p>Consultas estimadas por semana: ${resultado.consultasSemana.toFixed(1)}</p>
            <p>Água estimada por consulta: ${resultado.aguaLitrosPorConsulta.toFixed(6)} L</p>
            <p>Esta é uma estimativa didática. Os valores podem mudar conforme data center, matriz energética, tipo de resfriamento, modelo e carga real dos servidores.</p>
        </div>
    `;

    nextBtn.textContent = "Refazer";
    nextBtn.onclick = restartQuiz;
}

function restartQuiz() {
    currentQuestion = 0;
    Object.keys(answers).forEach(key => delete answers[key]);
    nextBtn.onclick = handleNext;
    showQuestion();
}

function handleNext() {
    const selected = document.querySelector("input[name='answer']:checked");

    if (!selected) {
        alert("Marque uma opção antes de continuar.");
        return;
    }

    const question = questions[currentQuestion];
    answers[question.id] = selected.value;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

nextBtn.addEventListener("click", handleNext);
showQuestion();
