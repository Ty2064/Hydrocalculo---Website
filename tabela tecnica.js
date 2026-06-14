// Cria e adiciona 5 tabelas ao document.body
function createTable(title, rows, cols) {
	const container = document.createElement('div');
	container.style.margin = '12px 0';

	const heading = document.createElement('h3');
	heading.textContent = title;
	heading.style.fontFamily = 'Arial, sans-serif';
	heading.style.margin = '6px 0';
	container.appendChild(heading);

	const table = document.createElement('table');
	table.style.borderCollapse = 'collapse';
	table.style.minWidth = '320px';
	table.style.fontFamily = 'Arial, sans-serif';

	// header
	const thead = document.createElement('thead');
	const hrow = document.createElement('tr');
	for (let c = 1; c <= cols; c++) {
		const th = document.createElement('th');
		th.textContent = 'Col ' + c;
		th.style.border = '1px solid #666';
		th.style.padding = '6px 10px';
		th.style.background = '#f0f0f0';
		hrow.appendChild(th);
	}
	thead.appendChild(hrow);
	table.appendChild(thead);

	// body
	const tbody = document.createElement('tbody');
	for (let r = 1; r <= rows; r++) {
		const row = document.createElement('tr');
		for (let c = 1; c <= cols; c++) {
			const td = document.createElement('td');
			td.textContent = `R${r}C${c}`;
			td.style.border = '1px solid #ccc';
			td.style.padding = '6px 10px';
			row.appendChild(td);
		}
		tbody.appendChild(row);
	}
	table.appendChild(tbody);

	container.appendChild(table);
	return container;
}

// Gerar 5 tabelas diferentes
const tables = [
	{title: 'Tabela 1 — Dados Básicos', rows: 3, cols: 4},
	{title: 'Tabela 2 — Estatísticas', rows: 4, cols: 3},
	{title: 'Tabela 3 — Plano', rows: 5, cols: 5},
	{title: 'Tabela 4 — Resumo', rows: 2, cols: 6},
	{title: 'Tabela 5 — Extras', rows: 6, cols: 2},
];

window.addEventListener('DOMContentLoaded', () => {
	const root = document.body || document.documentElement;
	tables.forEach(cfg => root.appendChild(createTable(cfg.title, cfg.rows, cfg.cols)));
});
