const questions = 
[
    {
        category: "USO DE IA",
        title: "Com que frequência você usa inteligência artificial na semana?",
        options: 
        [
            "Nunca",
            "1 a 2 vezes por semana",
            "3 a 4 vezes por semana",
            "5 a 6 vezes por semana",
            "Todos os dias",
            
        ]
    },
        {
        category: "TEMPO DE USO",
        title: "Quanto tempo você costuma usar IA por vez?",
        options: 
        [
            "Até 10 minutos",
            "Entre 10 e 30 minutos",
            "Entre 30 minutos e 1 hora",
            "Mais de 1 hora"
        ]
    },
    {
        category: "MODELO DE IA",
        title: "Qual modelo de IA você mais utiliza?",
        options: 
        [
            "ChatGPT",
            "Claude",
            "Gemini",
            "Perplexity",
            "Outro"
        ]
    },
    {
        category: "USO DE IA",
        title: "Qual o tamanho médio dos seus prompts?",
        options: 
        [
            "Curto (menos de 10 palavras)",
            "Médio (10-50 palavras)",
            "Longo (mais de 50 palavras)"
        ]
    },
    {
        category: "TIPO DE USO",
        title: "Qual tipo de tarefa você mais realiza com IA?",
        options: 
        [
            "Perguntas simples",
            "Resumos e textos",
            "Programação",
            "geração de vídeos",
            "Geração de imagens"
        ]
    }
];

let currentQuestion = 0;
let answers = [];

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

        label.innerHTML = `
            <input type="radio" name="answer" value="${option}">
            ${option}
        `;

        optionsForm.appendChild(label);
    });
}

nextBtn.addEventListener("click", function() {
    const selected = document.querySelector("input[name='answer']:checked");

    if (!selected) {
        alert("Marque uma opção antes de continuar.");
        return;
    }

    answers.push(selected.value);

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        category.textContent = "RESULTADO";
        
        optionsForm.innerHTML = `
            <p>Seu gasto hídrico estimado com ia é de X litros.</p>
        `;

        nextBtn.style.display = "none";

        console.log(answers);
    }
});

showQuestion();