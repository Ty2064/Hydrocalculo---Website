/*
    Tabelas técnicas do HydroCálculo.
    Fórmula aplicada no perguntas.js:
    água mensal (L) = consultas semanais × energia por consulta (kWh) × WUE do cenário × 4,345
*/

const TABELAS_HYDRO = {
    frequenciaSemanal: {
        nunca: 0,
        umaDuas: 1.5,
        tresQuatro: 3.5,
        cincoSeis: 5.5,
        todosDias: 7
    },

    tempoPorUsoMinutos: {
        ate10: 10,
        dezTrinta: 20,
        trintaSessenta: 45,
        maisUmaHora: 75
    },

    consultasPorMinuto: {
        simples: 1.2,
        textos: 0.7,
        programacao: 0.45,
        video: 0.08,
        imagem: 0.12
    },

    tokensPorPrompt: {
        curto: 300,
        medio: 900,
        longo: 1800
    },

    multiplicadorTarefa: {
        simples: 1.0,
        textos: 1.8,
        programacao: 2.4,
        video: 8.0,
        imagem: 5.0
    },

    modelos: {
        chatgpt: { nome: "ChatGPT", whPorMilTokens: 0.8 },
        claude: { nome: "Claude", whPorMilTokens: 0.75 },
        gemini: { nome: "Gemini", whPorMilTokens: 0.7 },
        perplexity: { nome: "Perplexity", whPorMilTokens: 0.85 },
        outro: { nome: "Outro modelo", whPorMilTokens: 0.8 }
    },

    cenariosGeograficos: {
        brasil: { nome: "Brasil", pue: 1.25, wueLitrosPorKwh: 0.30 },
        americaSul: { nome: "América do Sul", pue: 1.35, wueLitrosPorKwh: 0.50 },
        azureGlobal: { nome: "Fora da América do Sul / Azure", pue: 1.45, wueLitrosPorKwh: 0.80 }
    },

    semanasPorMes: 4.345
};
