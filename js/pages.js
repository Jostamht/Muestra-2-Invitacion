/*
  Plantillas de cada página del libro.
  Se construyen con los datos de config.js; aquí solo se cambia el diseño.
  Medidas: 1u = 1% del ancho de la página (la página mide 100u x 136u).
*/
(function () {
  const HEART = "M50 86C20 62 2 44 2 26 2 12 13 3 26 3c10 0 19 5 24 14C55 8 64 3 74 3c13 0 24 9 24 23 0 18-18 36-48 60z";
  const heartSvg = (cls = "") => `<svg class="${cls}" viewBox="0 0 100 90" aria-hidden="true"><path d="${HEART}"/></svg>`;
  const ornament = (cls = "orn") =>
    `<svg class="${cls}" viewBox="0 0 120 12" aria-hidden="true"><path d="M0 6h50M70 6h50" stroke="#c9a24b" stroke-width="1" fill="none"/><path d="M60 1l5 5-5 5-5-5z" fill="#c9a24b"/><circle cx="46" cy="6" r="1.4" fill="#c9a24b"/><circle cx="74" cy="6" r="1.4" fill="#c9a24b"/></svg>`;

  const u = (n) => `calc(var(--u) * ${n})`;
  const box = (l, t, w, h) => `left:${u(l)};top:${u(t)};width:${u(w)};height:${u(h)}`;

  /* Pieza de papel que se levanta. hinge = borde inferior (donde se dobla). */
  const pop = ({ l, t, w, h, lift = -64, d = 0, roll = 0, cls = "" }, inner) =>
    `<div class="pop ${cls}" style="${box(l, t, w, h)};--lift:${lift}deg;--d:${d}s;--roll:${roll}deg">` +
    `<div class="sheet">${inner}</div><i class="pshadow"></i></div>`;

  const archSvg = (fill, inner) =>
    `<svg viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true">
       <path d="M3 120V50a47 47 0 0 1 94 0v70z" fill="${fill}" stroke="#c9a24b" stroke-width="1.6"/>
       <path d="M17 120V52a33 33 0 0 1 66 0v68z" fill="${inner}" stroke="#c9a24b" stroke-width="1" stroke-opacity=".7"/>
       <path d="M50 12l-4 5 4 5 4-5z" fill="#c9a24b"/>
     </svg>`;

  const venueSvg = `
    <svg viewBox="0 0 140 92" preserveAspectRatio="none" aria-hidden="true">
      <path d="M10 36 70 6l60 30z" fill="#a3212f" stroke="#c9a24b" stroke-width="1.6" stroke-linejoin="round"/>
      <rect x="18" y="36" width="104" height="56" fill="#eadfca"/>
      <rect x="18" y="36" width="104" height="5" fill="#c9a24b"/>
      <rect x="18" y="86" width="104" height="6" fill="#d3c3a3"/>
      <path d="M58 92V68a12 12 0 0 1 24 0v24z" fill="#5b0f1d" stroke="#c9a24b" stroke-width="1"/>
      <g fill="#5b0f1d" stroke="#c9a24b" stroke-width=".8">
        <path d="M27 78V60a6 6 0 0 1 12 0v18z"/><path d="M43 78V60a6 6 0 0 1 12 0v18z"/>
        <path d="M85 78V60a6 6 0 0 1 12 0v18z"/><path d="M101 78V60a6 6 0 0 1 12 0v18z"/>
      </g>
      <path d="M70 31c-4.5-3-7-5.5-7-8a3.4 3.4 0 0 1 7-1.2 3.4 3.4 0 0 1 7 1.2c0 2.5-2.5 5-7 8z" fill="#f0d58a"/>
    </svg>`;

  const pillarSvg = `
    <svg viewBox="0 0 20 90" preserveAspectRatio="none" aria-hidden="true">
      <rect x="1" y="0" width="18" height="6" fill="#c9a24b"/>
      <rect x="3" y="6" width="14" height="78" fill="#8a1727" stroke="#c9a24b" stroke-width=".8"/>
      <path d="M8 8v74M12 8v74" stroke="#c9a24b" stroke-opacity=".45" stroke-width=".7"/>
      <rect x="1" y="84" width="18" height="6" fill="#c9a24b"/>
    </svg>`;

  const treeSvg = `
    <svg viewBox="0 0 40 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M20 2c14 14 18 34 18 52 0 8-8 12-18 12S2 62 2 54C2 36 6 16 20 2z" fill="#7c1424" stroke="#c9a24b" stroke-width="1.2"/>
      <path d="M20 10c8 12 11 28 11 42" stroke="#c9a24b" stroke-opacity=".5" fill="none" stroke-width=".8"/>
      <rect x="17" y="64" width="6" height="16" fill="#c9a24b"/>
    </svg>`;

  const envelopeBody = `
    <svg viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="100" height="62" fill="#e9dcc2"/>
      <path d="M0 62 50 26l50 36z" fill="#d8c8a8"/>
      <path d="M0 0l50 38L100 0v62H0z" fill="#efe3cc"/>
      <path d="M0 62 50 30l50 32" fill="none" stroke="#b99a58" stroke-width="1"/>
      <rect x=".5" y=".5" width="99" height="61" fill="none" stroke="#c9a24b" stroke-width="1"/>
    </svg>`;
  const envelopeFlap = `
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h100L50 32z" fill="#a3212f" stroke="#c9a24b" stroke-width="1"/>
      <circle cx="50" cy="26" r="6" fill="#c9a24b"/>
    </svg>`;

  function monthGrid(date, tz) {
    const parts = new Intl.DateTimeFormat("es", { timeZone: tz, year: "numeric", month: "numeric", day: "numeric" }).formatToParts(date);
    const get = (t) => +parts.find((p) => p.type === t).value;
    const y = get("year"), m = get("month"), day = get("day");
    const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay(); // 0 = domingo
    const offset = (first + 6) % 7; // semana que empieza en lunes
    const total = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const wd = ["L", "M", "M", "J", "V", "S", "D"].map((d) => `<span class="wd">${d}</span>`).join("");
    let cells = "";
    for (let i = 0; i < offset; i++) cells += "<span></span>";
    for (let d = 1; d <= total; d++) cells += `<span class="${d === day ? "today" : ""}">${d}</span>`;
    const monthName = new Intl.DateTimeFormat("es", { timeZone: tz, month: "long" }).format(date);
    return `<div class="cal"><h3>${monthName} de ${y}</h3><div class="cal-grid">${wd}${cells}</div></div>`;
  }

  const mapSvg = (nombre) => `
    <div class="map"><svg viewBox="0 0 200 150" aria-hidden="true">
      <rect width="200" height="150" fill="#1d0e15" stroke="#c9a24b" stroke-opacity=".5"/>
      <path d="M-5 112C40 96 70 118 110 100s60-26 100-6" fill="none" stroke="#7c1424" stroke-width="12" stroke-opacity=".55"/>
      <g stroke="#c9a24b" stroke-opacity=".55" stroke-width="1.4" fill="none" stroke-linecap="round">
        <path d="M0 40h200M0 74h200M30 0v150M82 0v150M140 0v150"/>
        <path d="M0 140 200 20" stroke-opacity=".35"/>
      </g>
      <rect x="92" y="10" width="38" height="24" fill="#3a1a22" stroke="#c9a24b" stroke-opacity=".4"/>
      <g transform="translate(111 52)">
        <path d="M0 22C-9 11-12 6-12 0a12 12 0 0 1 24 0c0 6-3 11-12 22z" fill="#a3212f" stroke="#f0d58a" stroke-width="1.4"/>
        <circle cy="0" r="4.2" fill="#f0d58a"/>
      </g>
    </svg></div>
    <p class="p" style="margin-top:${u(5)}">${nombre}</p>`;

  const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  window.buildPages = function (C) {
    const date = new Date(C.fecha);
    const tz = C.zonaHoraria;
    const f = (o) => new Intl.DateTimeFormat("es", { timeZone: tz, ...o }).format(date);
    const weekday = capital(f({ weekday: "long" }));
    const dayNum = f({ day: "numeric" });
    const month = f({ month: "long" });
    const year = f({ year: "numeric" });
    const time = f({ hour: "numeric", minute: "2-digit", hour12: true }).replace(/\s/g, " ");
    const A = C.novios.primero, B = C.novios.segundo;
    const lead = (cls, inner, extra = "") => `<section class="page ${cls}" ${extra}><div class="frame"></div>${inner}</section>`;

    /* ---- Portada ---- */
    const cover = `
      <div class="cover-frame"><i></i><i></i><i></i><i></i></div>
      <div class="cover-copy">
        ${ornament("cover-orn")}
        <span class="cover-name foil">${A}</span>
        <span class="cover-and">${heartSvg()}</span>
        <span class="cover-name foil">${B}</span>
        <span class="cover-date foil">${dayNum} de ${month} de ${year}</span>
      </div>`;

    const coverBack = `<div class="frame"></div><div class="leftpage"><div class="mono foil">${A[0]}&amp;${B[0]}</div></div>`;

    /* ---- Páginas ---- */
    const leaves = [];

    // 1. Bienvenida (su página izquierda es el interior de la portada)
    leaves.push({
      label: "Bienvenida",
      front: lead("pg-welcome", `
        <div class="stage3d">
          ${pop({ l: 12, t: 12, w: 76, h: 52, lift: -58, d: 0 }, archSvg("#8a1727", "#2a0a12"))}
          ${pop({ l: 5, t: 30, w: 8, h: 36, lift: -66, d: .16 }, pillarSvg)}
          ${pop({ l: 87, t: 30, w: 8, h: 36, lift: -66, d: .22 }, pillarSvg)}
          ${pop({ l: 38, t: 46, w: 24, h: 22, lift: -48, d: .4 }, `<div class="art heartfill" style="color:#f0d58a">${heartSvg()}</div>`)}
        </div>
        <div class="copy">
          <h2 class="h">Nos casamos</h2>
          ${ornament()}
          <p class="p">${C.mensaje}</p>
        </div>`),
      back: null
    });

    // 2. Fecha
    leaves.push({
      label: "Fecha",
      front: lead("pg-date", `
        <div class="stage3d">
          ${pop({ l: 17, t: 14, w: 66, h: 50, lift: -60, d: 0 }, `<div class="paper red" style="height:100%"></div>`)}
          ${pop({ l: 22, t: 20, w: 56, h: 46, lift: -66, d: .2, roll: 0 }, `<div class="paper ivory cal-card"><div class="mes">${month}</div><div class="dia">${dayNum}</div><div class="sem">${weekday}</div></div>`)}
          ${pop({ l: 6, t: 40, w: 14, h: 13, lift: -52, d: .45, roll: -14 }, `<div class="art heartfill" style="color:#c9a24b">${heartSvg()}</div>`)}
          ${pop({ l: 80, t: 38, w: 14, h: 13, lift: -52, d: .55, roll: 14 }, `<div class="art heartfill" style="color:#a3212f">${heartSvg()}</div>`)}
        </div>
        <div class="copy" style="top:${u(75)}">
          <h2 class="h sm">${weekday} ${dayNum} de ${month}</h2>
          <p class="p">${time}, en ${C.lugar.nombre}</p>
          <div class="count" id="count" aria-label="Tiempo que falta">
            <div><b data-k="d">0</b><span>días</span></div>
            <div><b data-k="h">0</b><span>horas</span></div>
            <div><b data-k="m">0</b><span>min</span></div>
            <div><b data-k="s">0</b><span>seg</span></div>
          </div>
        </div>`),
      back: `<div class="frame"></div><div class="leftpage">${monthGrid(date, tz)}</div>`
    });

    // 3. Lugar
    leaves.push({
      label: "Lugar",
      front: lead("pg-place", `
        <div class="stage3d">
          ${pop({ l: 8, t: 20, w: 12, h: 26, lift: -72, d: .3, roll: -3 }, treeSvg)}
          ${pop({ l: 80, t: 20, w: 12, h: 26, lift: -72, d: .36, roll: 3 }, treeSvg)}
          ${pop({ l: 15, t: 14, w: 70, h: 50, lift: -56, d: 0 }, venueSvg)}
        </div>
        <div class="copy" style="top:${u(77)}">
          <h2 class="h sm">${C.lugar.nombre}</h2>
          <p class="p">${C.lugar.direccion}</p>
          <a class="btn" href="${C.lugar.mapa}" target="_blank" rel="noopener">Cómo llegar</a>
        </div>`),
      back: `<div class="frame"></div><div class="leftpage"><div style="width:100%">${mapSvg(C.lugar.nombre)}</div></div>`
    });

    // 4. Itinerario
    const rows = C.itinerario.map((r) => `<li><b>${r.hora}</b><span>${r.texto}</span></li>`).join("");
    leaves.push({
      label: "Itinerario",
      front: lead("pg-agenda", `
        <div class="stage3d">
          ${pop({ l: 8, t: 8, w: 84, h: 58, lift: -52, d: 0 }, `<div class="paper red" style="height:100%;clip-path:polygon(0 12%,6% 6%,12% 12%,18% 6%,24% 12%,30% 6%,36% 12%,42% 6%,48% 12%,54% 6%,60% 12%,66% 6%,72% 12%,78% 6%,84% 12%,90% 6%,96% 12%,100% 8%,100% 100%,0 100%)"></div>`)}
          ${pop({ l: 14, t: 20, w: 72, h: 46, lift: -62, d: .22 }, `<ul class="paper ivory agenda" style="padding-left:${u(5)};margin:0">${rows}</ul>`)}
        </div>
        <div class="copy">
          <h2 class="h sm">Así será el día</h2>
          ${ornament()}
          <p class="p">Llega unos minutos antes para ubicarte con calma.</p>
        </div>`),
      back: `<div class="frame"></div><div class="leftpage"><p class="quote">Lo mejor de nuestra historia todavía está por escribirse.</p></div>`
    });

    // 5. Vestimenta
    const sw = C.vestimenta.colores;
    const fan = [
      { l: 12, roll: -16, d: .05, cls: "red" }, { l: 38, roll: 0, d: .2, cls: "gold" }, { l: 64, roll: 16, d: .35, cls: "black" }
    ].map((p, i) => pop({ l: p.l, t: 22, w: 24, h: 40, lift: -62, d: p.d, roll: p.roll },
      `<div class="paper ${p.cls} swatch" style="height:100%"><i>${heartSvg()}</i>${sw[i].nombre}</div>`)).join("");
    leaves.push({
      label: "Vestimenta",
      front: lead("pg-dress", `
        <div class="stage3d">${fan}</div>
        <div class="copy">
          <h2 class="h sm">${C.vestimenta.codigo}</h2>
          ${ornament()}
          <p class="p">${C.vestimenta.nota}</p>
        </div>`),
      back: `<div class="frame"></div><div class="leftpage"><p class="quote">Elige algo con lo que te sientas elegante. Lo demás lo ponemos nosotros.</p></div>`
    });

    // 6. Regalos
    leaves.push({
      label: "Regalos",
      front: lead("pg-gifts", `
        <div class="stage3d">
          ${pop({ l: 16, t: 24, w: 68, h: 42, lift: -60, d: 0 }, `
            <div class="env-wrap">
              <div class="env-card paper ivory"><b>${C.regalos.titulo}</b>${heartSvg()}</div>
              <div class="env-body">${envelopeBody}</div>
              <div class="env-flap">${envelopeFlap}</div>
            </div>`)}
        </div>
        <div class="copy" style="top:${u(78)}">
          <h2 class="h sm">${C.regalos.titulo}</h2>
          <p class="p">${C.regalos.texto}</p>
        </div>`),
      back: `<div class="frame"></div><div class="leftpage"><p class="quote">Tu compañía ya es el mejor regalo.</p></div>`
    });

    // 7. Confirmación
    leaves.push({
      label: "Confirmación",
      front: lead("pg-rsvp", `
        <div class="stage3d">
          ${pop({ l: 20, t: 12, w: 60, h: 52, lift: -58, d: 0 }, `<div class="paper ivory" style="height:100%;display:grid;place-items:center;text-align:center;padding:${u(4)}"><div><div class="art heartfill" style="width:${u(14)};height:${u(12)};margin:0 auto ${u(3)};color:#a3212f">${heartSvg()}</div><b style="font-family:var(--serif);font-style:italic;font-weight:500;font-size:${u(8.2)};line-height:1.05">¿Nos acompañas?</b></div></div>`)}
        </div>
        <div class="copy" style="top:${u(76)}">
          <p class="p">${C.confirmacion.texto}</p>
          <div class="rsvp-slot" id="rsvp-slot">
            <b>Espacio para la confirmación</b>
            <span>Aquí se conectará el formulario de asistencia.</span>
          </div>
        </div>`),
      back: `<div class="frame"></div><div class="leftpage"><div class="photo">${heartSvg()}</div></div>`
    });

    // 8. Cierre
    leaves.push({
      label: "Gracias",
      front: lead("pg-end", `
        <div class="stage3d">
          ${pop({ l: 30, t: 14, w: 40, h: 36, lift: -56, d: 0 }, `<div class="art heartfill" style="color:#a3212f">${heartSvg()}</div>`)}
          ${pop({ l: 14, t: 38, w: 17, h: 15, lift: -50, d: .3, roll: -12 }, `<div class="art heartfill" style="color:#c9a24b">${heartSvg()}</div>`)}
          ${pop({ l: 69, t: 34, w: 19, h: 17, lift: -50, d: .4, roll: 10 }, `<div class="art heartfill" style="color:#c9a24b">${heartSvg()}</div>`)}
        </div>
        <div class="copy" style="top:${u(70)}">
          <h2 class="h"><span class="foil">${A} y ${B}</span></h2>
          ${ornament()}
          <p class="p">Gracias por ser parte de este día.</p>
          <button class="btn ghost" type="button" data-action="restart">Volver a la portada</button>
        </div>`),
      back: `<div class="frame"></div><div class="leftpage"><div class="mono foil">${A[0]}&amp;${B[0]}</div></div>`
    });

    return { cover, coverBack, leaves, parts: { weekday, dayNum, month, year, time } };
  };
})();
