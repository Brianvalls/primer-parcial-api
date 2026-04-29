export function renderHomePage() {
  const sections = [
    { name: "Mobile", slug: "mobile" },
    { name: "Landing Page", slug: "landing" },
    { name: "Web App", slug: "webapp" },
    { name: "E-Commerce", slug: "ecommerce" },
    { name: "Games", slug: "game" },
  ];

  const links = sections
    .map((section) => `<li><a class="section-link" href="/section/${section.slug}">${section.name}</a></li>`)
    .join("");

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Primer Parcial API</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <main class="container">
          <h1>Menu de secciones</h1>
          <p class="subtitle">Selecciona una seccion para ver los proyectos.</p>
          <ul class="section-list">${links}</ul>
        </main>
      </body>
    </html>
  `;
}
