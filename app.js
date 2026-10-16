let s = 7;
const R = () => (s = (s * 9301 + 49297) % 233280) / 233280;

const CARGOS = [
  "Colocador",
  "Asesor comercial",
  "Auxiliar administrativo",
  "Analista de datos",
  "Coordinador de zona",
  "Administrador de empresas"
];

const COMP = [
  "Orientación al cliente",
  "Comunicación",
  "Trabajo en equipo",
  "Adaptabilidad",
  "Orientación a resultados",
  "Liderazgo",
  "Planeación",
  "Resolución de problemas",
  "Iniciativa",
  "Responsabilidad",
  "Aprendizaje continuo",
  "Integridad"
];

const DISC = [
  "D", "I", "S", "C", 
  "DI", "DC", "ID", "IS", 
  "SI", "SC", "CD", "CS", 
  "DS", "IC", "SD", "CI"
];

const seeded = (k, a, b) => {
  s = k * 131 + 11;
  return Math.round(a + R() * (b - a));
};

const bars = (arr, cls) =>
  arr
    .map(
      ([l, v, t]) =>
        `<div class="row"><span>${l}</span><div class="bar"><i class="${
          cls || ""
        }" style="width:${Math.min(v, 100)}%"></i></div><span class="num">${
          t ?? v + "%"
        }</span></div>`
    )
    .join("");

const note = `<div class="note"><b>Datos ficticios de demostración.</b> No corresponden a colaboradores reales de GELSA. Las 12 competencias y los 16 perfiles se muestran con nombres ilustrativos hasta recibir el diccionario real de ID Talento.</div>`;

const sel = (id, opts, fn) =>
  `<select id="${id}" onchange="${fn}">${opts
    .map((o) => `<option>${o}</option>`)
    .join("")}</select>`;

const V = {
  dash: () =>
    `<div class="bc">Inicio / Panel</div><h1>Panel ejecutivo</h1><p class="sub">Vista general de cobertura, calidad y oportunidades.</p>${note}
<div class="grid"><div class="card kpi"><div class="v">1.240</div><div class="l">Colaboradores caracterizados (demo)</div></div><div class="card kpi"><div class="v">68 %</div><div class="l">Con evaluación ID Talento</div></div><div class="card kpi"><div class="v">3</div><div class="l">Relaciones por validar</div></div><div class="card kpi"><div class="v">5</div><div class="l">Brechas priorizadas</div></div></div>
<div class="grid g2"><div class="card"><div class="h">Cobertura de evaluaciones por cargo</div><div class="b">${bars(
      CARGOS.map((c, i) => [c, seeded(i + 1, 35, 92)])
    )}</div></div>
<div class="card"><div class="h">Distribución de perfiles DISC</div><div class="b">${bars(
      ["D", "I", "S", "C"].map((c, i) => ["Perfil " + c, seeded(i + 20, 12, 38)]),
      "y"
    )}</div></div></div>
<div class="card"><div class="h">Actividad reciente</div><div class="b"><p>• Carga de datos de prueba validada · 0 duplicados</p><p>• Evaluaciones vencidas detectadas en 2 familias de cargo</p><p>• Informe de asociaciones exploratorias pendiente de revisión humana</p></div></div>`,

  carac: () =>
    `<div class="bc">Inicio / Caracterización</div><h1>Caracterización poblacional</h1><p class="sub">Resultados agregados; los grupos con menos de 5 personas se ocultan.</p>${note}
<div class="grid g2"><div class="card"><div class="h">Rangos de edad</div><div class="b">${bars([
      ["18–25", 14],
      ["26–35", 22],
      ["36–45", 20],
      ["46–55", 24],
      ["Más de 55", 20]
    ])}</div></div>
<div class="card"><div class="h">Antigüedad</div><div class="b">${bars(
      [
        ["< 1 año", 18],
        ["1–3 años", 31],
        ["3–5 años", 24],
        ["> 5 años", 27]
      ],
      "y"
    )}</div></div>
<div class="card"><div class="h">Género (voluntario)</div><div class="b">${bars([
      ["Mujeres", 64],
      ["Hombres", 28],
      ["Sin dato", 8]
    ])}<p class="sub">El dato faltante no se interpreta como una calificación.</p></div></div>
<div class="card"><div class="h">Completitud de campos</div><div class="b">${bars([
      ["Cargo", 99],
      ["Ubicación", 94],
      ["Edad", 81],
      ["Discapacidad*", 12],
      ["Otros voluntarios*", 23]
    ])}<p class="sub">*Dato sensible: voluntario, acceso restringido y uso solo agregado.</p></div></div></div>`,

  eval: () =>
    `<div class="bc">Inicio / Evaluaciones</div><h1>Perfil comportamental y competencias</h1><p class="sub">DISC y 12 competencias por cargo.</p>${note}${sel(
      "c1",
      ["Todos los cargos", ...CARGOS],
      "E()"
    )}<div id="ev"></div>`,

  ana: () =>
    `<div class="bc">Inicio / Analítica</div><h1>Analítica por cargo</h1><p class="sub">Asociaciones exploratorias entre competencias y un resultado laboral definido por cargo.</p>${note}${sel(
      "c2",
      CARGOS,
      "A()"
    )}<div id="an"></div>`,

  nine: () =>
    `<div class="bc">Inicio / Nine Box</div><h1>Matriz Nine Box</h1><p class="sub">Potencial (vertical) frente a desempeño (horizontal). Selecciona un cuadrante.</p>${note}
<div class="grid g2"><div class="card"><div class="h">Distribución</div><div class="b"><div class="nb" id="nb"></div></div></div><div class="card"><div class="h">Detalle del cuadrante</div><div class="b" id="nd">Selecciona un cuadrante para ver acciones sugeridas.</div></div></div>`,

  bre: () =>
    `<div class="bc">Inicio / Brechas</div><h1>Brechas e inclusión</h1><p class="sub">Indicadores agregados de acceso. Se usan para revisar barreras, nunca para decidir sobre una persona.</p>${note}
<div class="card"><div class="h">Participación en formación por segmento</div><div class="b scroll"><table><tr><th>Segmento</th><th>Personas</th><th>Participación</th><th>Finalización</th><th>Movilidad interna</th></tr>
${[
  ["Menores de 26", 180],
  ["26–45", 520],
  ["Mayores de 45", 470],
  ["Personas con discapacidad", 3],
  ["Zona rural", 96]
]
  .map(([n, p], i) =>
    p < 5
      ? `<tr><td>${n}</td><td>&lt; 5</td><td colspan=3><span class="tag w">Celda suprimida por tamaño</span></td></tr>`
      : `<tr><td>${n}</td><td>${p}</td><td>${seeded(
          i + 40,
          38,
          81
        )} %</td><td>${seeded(i + 50, 55, 92)} \%</td><td>${seeded(
          i + 60,
          3,
          15
        )} %</td></tr>`
  )
  .join("")}</table></div></div>`,

  pla: () =>
    `<div class="bc">Inicio / Planes</div><h1>Planes de desarrollo</h1><p class="sub">Acciones sugeridas vinculadas a brechas de competencias, con seguimiento.</p>${note}
<div class="grid">${[
      ["Ruta de comunicación", "Auxiliar administrativo", "Formación", 45],
      ["Mentoría de liderazgo", "Coordinador de zona", "Mentoría", 20],
      ["Ajustes de accesibilidad", "Puntos de venta", "Accesibilidad", 60],
      ["Movilidad interna", "Colocador → Asesor", "Movilidad", 10],
      ["Aplicación gradual de pruebas", "Analista de datos", "Cobertura", 75]
    ]
      .map(
        ([t, c, k, p]) =>
          `<div class="card"><div class="h">${t}</div><div class="b"><span class="tag">${k}</span><p>${c}</p><div class="pr"><i style="width:${p}%"></i></div><small class="num">Avance ${p} %</small></div></div>`
      )
      .join("")}</div>`,

  cal: () =>
    `<div class="bc">Inicio / Calidad</div><h1>Calidad y cobertura de datos</h1><p class="sub">La ausencia de una prueba no indica bajo potencial.</p>${note}
<div class="grid g2"><div class="card"><div class="h">Indicadores de calidad</div><div class="b">${bars([
      ["Sin duplicados", 100],
      ["Fechas válidas", 97],
      ["Escalas normalizadas", 88],
      ["Evaluaciones vigentes", 71],
      ["Nine Box comparable", 64]
    ])}</div></div>
<div class="card"><div class="h">Ruta para completar evaluaciones</div><div class="b"><p><span class="tag">1</span> Inventario de fuentes y fechas</p><p><span class="tag">2</span> Priorizar por cargo y necesidad analítica</p><p><span class="tag">3</span> Aplicar con finalidad y permisos claros</p><p><span class="tag">4</span> Actualizar cobertura por periodo</p><p><span class="tag">5</span> Revalidar conclusiones</p></div></div></div>
<div class="card"><div class="h">Gobierno de datos</div><div class="b">ID seudonimizado · acceso por roles · auditoría · agregación de grupos pequeños · Ley 1581 de 2012 · revisión humana de toda recomendación.</div></div>`
};

const items = [
  ["dash", "Panel ejecutivo"],
  ["carac", "Caracterización"],
  ["eval", "Evaluaciones"],
  ["ana", "Analítica por cargo"],
  ["nine", "Nine Box"],
  ["bre", "Brechas e inclusión"],
  ["pla", "Planes de desarrollo"],
  ["cal", "Calidad y cobertura"]
];

function go(k) {
  document.getElementById("nav").innerHTML =
    "<h6>Navegación</h6>" +
    items
      .map(
        ([i, n]) =>
          `<a class="${i == k ? "on" : ""}" onclick="go('${i}')">${n}</a>`
      )
      .join("");

  document.getElementById("nav").classList.remove("open");
  document.getElementById("m").innerHTML = V[k]();
  ({ eval: E, ana: A, nine: N })[k]?.();
  scrollTo(0, 0);
}

function E() {
  const c = document.getElementById("c1").selectedIndex;
  document.getElementById("ev").innerHTML = `<div class="grid g2"><div class="card"><div class="h">Promedio de competencias (0–100)</div><div class="b">${bars(
    COMP.map((n, i) => [
      n,
      seeded(c * 13 + i, 52, 88),
      seeded(c * 13 + i, 52, 88)
    ])
  )}</div></div><div class="card"><div class="h">Perfiles DISC (personas)</div><div class="b"><div class="chips">${DISC.map(
    (d, i) => `<span class="chip">${d} <b>${seeded(c * 7 + i, 6, 60)}</b></span>`
  ).join("")}</div></div></div></div>`;
}

function A() {
  const c = document.getElementById("c2").selectedIndex;
  const rows = COMP.map((n, i) => {
    const r = seeded(c * 17 + i, -5, 62) / 100;
    const n_ = seeded(c * 5 + i, 24, 140);
    const e = 1.96 / Math.sqrt(n_ - 3);
    return { n, r, n_, lo: r - e * 0.9, hi: r + e * 0.9 };
  })
    .sort((a, b) => b.r - a.r)
    .slice(0, 6);

  document.getElementById("an").innerHTML = `<div class="card"><div class="h">Competencias asociadas al indicador de resultado del cargo</div><div class="b scroll"><table><tr><th>Competencia</th><th>r</th><th>IC 95 % aprox.</th><th>n</th><th>Estado</th></tr>${rows
    .map(
      (x) =>
        `<tr><td>${x.n}</td><td>${x.r.toFixed(2)}</td><td>${x.lo.toFixed( 2 )} a${x.hi.toFixed(2)}</td><td>${x.n_}</td><td>${
          x.lo > 0.1 && x.n_ >= 60
            ? '<span class="tag">Requiere validación</span>'
            : '<span class="tag w">Evidencia insuficiente</span>'
        }</td></tr>`
    )
    .join("")}</table></div></div>
<div class="note" style="margin-top:14px">Lectura sugerida: «En ${
    CARGOS[c]
  }, ${
    rows[0].n
  } muestra una asociación positiva con el indicador definido, dentro de la muestra. No demuestra causalidad. No hay evidencia suficiente para recomendar un perfil DISC como criterio de selección.»</div>`;
}

function N() {
  const L = ["Alto", "Medio", "Bajo"];
  const C = ["Bajo", "Medio", "Alto"];
  const t = [
    ["Enigma", 4],
    ["Potencial en crecimiento", 11],
    ["Estrella", 7],
    ["Dilema", 9],
    ["Profesional clave", 32],
    ["Alto desempeño", 16],
    ["Riesgo", 4],
    ["Efectivo", 13],
    ["Experto", 9]
  ];

  let h = "";
  for (let r = 0; r < 3; r++) {
    h += `<div class="ax">${L[r]}</div>`;
    for (let c = 0; c < 3; c++) {
      const [i, v] = [r * 3 + c, t[r * 3 + c]];
      h += `<div class="c" onclick="nd(${i})" id="q${i}"><b>${v[1]} %</b>${v[0]}</div>`;
    }
  }

  h +=
    "<div></div>" +
    C.map((x) => `<div class="ax" style="text-align:center">${x}</div>`).join(
      ""
    );
  document.getElementById("nb").innerHTML = h;

  window.nd = (i) => {
    document
      .querySelectorAll(".nb .c")
      .forEach((e) => e.classList.remove("on"));
    document.getElementById("q" + i).classList.add("on");

    const a = [
      "Revisar ajuste al cargo y claridad de expectativas.",
      "Plan de formación y mentoría dirigida.",
      "Oportunidades de movilidad y proyectos retadores.",
      "Acompañamiento para elevar desempeño.",
      "Desarrollo continuo y reconocimiento.",
      "Rotación de responsabilidades y liderazgo.",
      "Revisar condiciones del cargo y apoyo.",
      "Mantener y reconocer aportes.",
      "Transferencia de conocimiento."
    ];

    document.getElementById("nd").innerHTML = `<h2>${t[i][0]}</h2><p>${a[i]}</p><p class="sub">Revisión humana obligatoria. Verifica que los criterios de Nine Box sean comparables entre áreas.</p>`;
  };
}

function tg() {
  const r = document.documentElement;
  const d = matchMedia("(prefers-color-scheme:dark)").matches;
  const cur = r.dataset.theme || (d ? "dark" : "light");
  r.dataset.theme = cur == "dark" ? "light" : "dark";
}

go("dash");