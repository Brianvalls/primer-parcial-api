function renderProjectCard(project) {
  return `
    <article class="card">
      <h2>${project.name}</h2>
      <img src="${project.img}" alt="${project.name}" />
      <p>${project.description}</p>
      <p><strong>Seccion:</strong> ${project.section}</p>
      <p><strong>Tecnologias:</strong> ${(project.technologies || []).join(", ")}</p>
      <p><a href="${project.link}" target="_blank">Ver repositorio</a></p>
    </article>
  `;
}

export function renderSectionPage(section, projects) {
  const content =
    projects.length > 0
      ? projects.map((project) => renderProjectCard(project)).join("")
      : "<p>No hay proyectos para esta seccion.</p>";

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Seccion ${section}</title>
        <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <main class="container">
          <a class="back-link" href="/">Volver al menu</a>
          <h1>Seccion: ${section}</h1>
          ${content}
        </main>
      </body>
    </html>
  `;
}
