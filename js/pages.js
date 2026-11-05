/*
  Plantillas de cada página del libro.
  Se construyen con los datos de config.js; aquí solo se cambia el diseño.
  Medidas: 1u = 1% del ancho de la página (la página mide 100u x 136u).
*/
(function () {
  const GOLD = "#c9a24b", GOLD_HI = "#e6c677", IVORY = "#efe4cf";
  const HEART = "M50 86C20 62 2 44 2 26 2 12 13 3 26 3c10 0 19 5 24 14C55 8 64 3 74 3c13 0 24 9 24 23 0 18-18 36-48 60z";

  /* Degradados compartidos por todas las ilustraciones (se insertan una sola vez). */
  const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
    <linearGradient id="gFold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></linearGradient>
    <linearGradient id="gBurg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8c1a2b"/><stop offset="1" stop-color="#4d0b17"/></linearGradient>
  </defs></svg>`;

  const heartSvg = (cls = "") => `<svg class="${cls}" viewBox="0 0 100 90" aria-hidden="true"><path d="${HEART}"/></svg>`;

  /* Corazón de papel con filo dorado y un segundo contorno fino adentro */
  const heartMedal = (fill = "#7a1a2e") =>
    `<svg viewBox="0 0 100 90" aria-hidden="true" overflow="visible">
       <path d="${HEART}" fill="${fill}" stroke="${GOLD}" stroke-width="2.4" stroke-linejoin="round"/>
       <path d="${HEART}" transform="translate(11 9.8) scale(.78)" fill="none" stroke="${GOLD_HI}" stroke-opacity=".65" stroke-width="1.4"/>
       <path d="${HEART}" fill="url(#gFold)"/>
     </svg>`;

  const ornament = (cls = "orn") =>
    `<svg class="${cls}" viewBox="0 0 120 12" aria-hidden="true"><path d="M0 6h50M70 6h50" stroke="${GOLD}" stroke-width=".8" fill="none"/><path d="M60 1.5l4.5 4.5-4.5 4.5-4.5-4.5z" fill="${GOLD}"/><circle cx="47" cy="6" r="1.2" fill="${GOLD}"/><circle cx="73" cy="6" r="1.2" fill="${GOLD}"/></svg>`;

  const u = (n) => `calc(var(--u) * ${n})`;
  const box = (l, t, w, h) => `left:${u(l)};top:${u(t)};width:${u(w)};height:${u(h)}`;

  /* Pieza de papel que se levanta. El borde inferior es la bisagra. */
  const pop = ({ l, t, w, h, lift = -64, d = 0, roll = 0, cls = "" }, inner) =>
    `<div class="pop ${cls}" style="${box(l, t, w, h)};--lift:${lift}deg;--d:${d}s;--roll:${roll}deg">` +
    `<div class="sheet">${inner}</div><i class="pshadow"></i></div>`;

  /* ---------- Ilustraciones de papel ---------- */

  function archBack() {
    let dots = "";
    for (let k = 0; k <= 18; k++) {
      const a = Math.PI - (k / 18) * Math.PI;
      dots += `<circle cx="${(76 + 64 * Math.cos(a)).toFixed(1)}" cy="${(72 - 64 * Math.sin(a)).toFixed(1)}" r="1.3" fill="${GOLD_HI}" opacity=".85"/>`;
    }
    for (let y = 80; y <= 98; y += 9) dots += `<circle cx="12" cy="${y}" r="1.3" fill="${GOLD_HI}" opacity=".85"/><circle cx="140" cy="${y}" r="1.3" fill="${GOLD_HI}" opacity=".85"/>`;
    const outer = "M4 104V72a72 72 0 0 1 144 0V104z";
    return `<svg viewBox="0 0 152 104" preserveAspectRatio="none" aria-hidden="true">
      <path d="${outer}" fill="url(#gBurg)" stroke="${GOLD}" stroke-width="1.4"/>
      <path d="M20 104V72a56 56 0 0 1 112 0V104z" fill="#1d0710" stroke="${GOLD}" stroke-opacity=".8" stroke-width="1"/>
      ${dots}<path d="${outer}" fill="url(#gFold)"/>
    </svg>`;
  }

  const archFront = `<svg viewBox="0 0 140 92" preserveAspectRatio="none" aria-hidden="true">
      <path fill-rule="evenodd" d="M6 92V64a64 64 0 0 1 128 0V92z M13 92V64a57 57 0 0 1 114 0V92z" fill="${IVORY}" stroke="${GOLD}" stroke-width=".8"/>
      <path fill-rule="evenodd" d="M6 92V64a64 64 0 0 1 128 0V92z M13 92V64a57 57 0 0 1 114 0V92z" fill="url(#gFold)"/>
    </svg>`;

  /* Rama con hojas, a cada lado del arco */
  function branch(flip) {
    let leaves = "";
    for (let i = 0; i < 6; i++) {
      const y = 72 - i * 11, s = i % 2 ? 1 : -1;
      leaves += `<path d="M15 ${y}q${s * 8} -2 ${s * 12} -10q${-s * 9} 1 ${-s * 12} 10z" fill="${i % 2 ? GOLD : "#e9dcc2"}" stroke="#7a5a1a" stroke-width=".4"/>`;
    }
    return `<svg viewBox="0 0 30 80" preserveAspectRatio="none" aria-hidden="true">
      <g ${flip ? 'transform="translate(30 0) scale(-1 1)"' : ""}>
        <path d="M15 80C13 60 17 40 14 7" stroke="${GOLD}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
        ${leaves}<circle cx="14" cy="6" r="2.4" fill="${GOLD_HI}"/>
      </g>
    </svg>`;
  }

  const venueSvg = `
    <svg viewBox="0 0 140 92" preserveAspectRatio="none" aria-hidden="true">
      <path d="M10 36 70 6l60 30z" fill="#6f1627" stroke="${GOLD}" stroke-width="1.5" stroke-linejoin="round"/>
      <rect x="18" y="36" width="104" height="56" fill="${IVORY}"/>
      <rect x="18" y="36" width="104" height="4" fill="${GOLD}"/>
      <rect x="18" y="87" width="104" height="5" fill="#d3c3a3"/>
      <path d="M58 92V68a12 12 0 0 1 24 0v24z" fill="#4d0b17" stroke="${GOLD}" stroke-width="1"/>
      <g fill="#4d0b17" stroke="${GOLD}" stroke-width=".8">
        <path d="M27 78V60a6 6 0 0 1 12 0v18z"/><path d="M43 78V60a6 6 0 0 1 12 0v18z"/>
        <path d="M85 78V60a6 6 0 0 1 12 0v18z"/><path d="M101 78V60a6 6 0 0 1 12 0v18z"/>
      </g>
      <circle cx="70" cy="24" r="5" fill="none" stroke="${GOLD_HI}" stroke-width="1.2"/><circle cx="70" cy="24" r="1.8" fill="${GOLD_HI}"/>
      <rect x="18" y="36" width="104" height="56" fill="url(#gFold)"/>
    </svg>`;

  const treeSvg = `
    <svg viewBox="0 0 40 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M20 2c14 14 18 34 18 52 0 8-8 12-18 12S2 62 2 54C2 36 6 16 20 2z" fill="#4d0b17" stroke="${GOLD}" stroke-width="1.1"/>
      <path d="M20 10c8 12 11 28 11 42" stroke="${GOLD}" stroke-opacity=".5" fill="none" stroke-width=".8"/>
      <rect x="18" y="64" width="4" height="16" fill="${GOLD}"/>
    </svg>`;

  const envelopeBody = `
    <svg viewBox="0 0 100 62" preserveAspectRatio="none" aria-hidden="true">
      <rect x="0" y="0" width="100" height="62" fill="#e9dcc2"/>
      <path d="M0 62 50 26l50 36z" fill="#d8c8a8"/>
      <path d="M0 0l50 38L100 0v62H0z" fill="#efe3cc"/>
      <path d="M0 62 50 30l50 32" fill="none" stroke="#b99a58" stroke-width="1"/>
      <rect x=".5" y=".5" width="99" height="61" fill="none" stroke="${GOLD}" stroke-width="1"/>
    </svg>`;
  const envelopeFlap = `
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 0h100L50 32z" fill="#7a1a2e" stroke="${GOLD}" stroke-width="1"/>
      <circle cx="50" cy="25" r="6.5" fill="#a3212f" stroke="${GOLD_HI}" stroke-width="1"/>
      <circle cx="50" cy="25" r="3.6" fill="none" stroke="${GOLD_HI}" stroke-opacity=".7" stroke-width=".7"/>
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
      <rect width="200" height="150" fill="#1d0e15" stroke="${GOLD}" stroke-opacity=".5"/>
      <path d="M-5 112C40 96 70 118 110 100s60-26 100-6" fill="none" stroke="#7c1424" stroke-width="12" stroke-opacity=".55"/>
      <g stroke="${GOLD}" stroke-opacity=".55" stroke-width="1.2" fill="none" stroke-linecap="round">
        <path d="M0 40h200M0 74h200M30 0v150M82 0v150M140 0v150"/>
        <path d="M0 140 200 20" stroke-opacity=".35"/>
      </g>
      <rect x="92" y="10" width="38" height="24" fill="#3a1a22" stroke="${GOLD}" stroke-opacity=".4"/>
      <g transform="translate(111 52)">
        <path d="M0 22C-9 11-12 6-12 0a12 12 0 0 1 24 0c0 6-3 11-12 22z" fill="#a3212f" stroke="${GOLD_HI}" stroke-width="1.4"/>
        <circle cy="0" r="4.2" fill="${GOLD_HI}"/>
      </g>
    </svg></div>
    <p class="p" style="margin-top:${u(5)}">${nombre}</p>`;

  const capital = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const medal = (fill) => `<div class="art">${heartMedal(fill)}</div>`;

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
    const lead = (cls, inner) => `<section class="page ${cls}"><div class="frame"></div>${inner}</section>`;
    const monogram = `<div class="frame"></div><div class="leftpage"><div class="mono foil">${A[0]}&amp;${B[0]}</div></div>`;

    /* ---- Portada ---- */
    const cover = `
      <div class="cover-frame"><i></i><i></i><i></i><i></i></div>
      <div class="cover-copy">
        ${ornament("cover-orn")}
        <span class="cover-name foil">${A}</span>
        <span class="cover-and">${heartSvg()}</span>
        <span class="cover-name foil">${B}</span>
        <span class="cover-date foil">${dayNum} de ${month} de ${year}</span>
        <div class="seal" aria-hidden="true"><i>${heartSvg()}</i><i>${heartSvg()}</i></div>
      </div>`;

    const leaves = [];

    // 1. Bienvenida (su página izquierda es el interior de la portada)
    leaves.push({
      label: "Bienvenida",
      front: lead("pg-welcome", `
        <div class="stage3d">
          ${pop({ l: 12, t: 10, w: 76, h: 54, lift: -58, d: 0 }, archBack())}
          ${pop({ l: 15, t: 20, w: 70, h: 46, lift: -64, d: .14 }, archFront)}
          ${pop({ l: 2, t: 32, w: 12, h: 34, lift: -70, d: .26, roll: -3 }, branch(false))}
          ${pop({ l: 86, t: 32, w: 12, h: 34, lift: -70, d: .32, roll: 3 }, branch(true))}
          ${pop({ l: 39, t: 48, w: 22, h: 20, lift: -46, d: .44 }, medal("#7a1a2e"))}
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
          ${pop({ l: 17, t: 12, w: 66, h: 52, lift: -58, d: 0 }, `<div class="paper red scallop"></div>`)}
          ${pop({ l: 22, t: 20, w: 56, h: 46, lift: -66, d: .2 }, `<div class="paper ivory framed cal-card"><div class="mes">${month}</div><div class="dia">${dayNum}</div><div class="sem">${weekday}</div></div>`)}
          ${pop({ l: 5, t: 42, w: 14, h: 12, lift: -52, d: .45, roll: -12 }, medal("#4d0b17"))}
          ${pop({ l: 81, t: 40, w: 14, h: 12, lift: -52, d: .55, roll: 12 }, medal("#7a1a2e"))}
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
          ${pop({ l: 7, t: 18, w: 12, h: 30, lift: -72, d: .3, roll: -3 }, treeSvg)}
          ${pop({ l: 81, t: 18, w: 12, h: 30, lift: -72, d: .36, roll: 3 }, treeSvg)}
          ${pop({ l: 15, t: 12, w: 70, h: 52, lift: -58, d: 0 }, venueSvg)}
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
          ${pop({ l: 8, t: 6, w: 84, h: 60, lift: -54, d: 0 }, `<div class="paper red scallop"></div>`)}
          ${pop({ l: 14, t: 18, w: 72, h: 48, lift: -62, d: .22 }, `<ul class="paper ivory framed agenda">${rows}</ul>`)}
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
      { l: 12, roll: -15, d: .05 }, { l: 38, roll: 0, d: .2 }, { l: 64, roll: 15, d: .35 }
    ].map((p, i) => pop({ l: p.l, t: 20, w: 24, h: 44, lift: -62, d: p.d, roll: p.roll },
      `<div class="paper framed swatch" style="height:100%;background:${sw[i].hex};color:${sw[i].texto}"><i>${heartSvg()}</i>${sw[i].nombre}</div>`)).join("");
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
          ${pop({ l: 16, t: 22, w: 68, h: 44, lift: -60, d: 0 }, `
            <div class="env-wrap">
              <div class="env-card paper ivory framed"><b>${C.regalos.titulo}</b><div class="mini">${heartMedal("#7a1a2e")}</div></div>
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
          ${pop({ l: 20, t: 10, w: 60, h: 54, lift: -58, d: 0 }, `<div class="paper ivory framed rsvp-card"><div class="mini">${heartMedal("#7a1a2e")}</div><b>¿Nos acompañas?</b></div>`)}
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
          ${pop({ l: 29, t: 12, w: 42, h: 38, lift: -56, d: 0 }, medal("#6f1627"))}
          ${pop({ l: 13, t: 38, w: 17, h: 15, lift: -50, d: .3, roll: -12 }, medal("#4d0b17"))}
          ${pop({ l: 70, t: 34, w: 19, h: 17, lift: -50, d: .4, roll: 10 }, medal("#4d0b17"))}
        </div>
        <div class="copy" style="top:${u(70)}">
          <h2 class="h">${A} y ${B}</h2>
          ${ornament()}
          <p class="p">Gracias por ser parte de este día.</p>
          <button class="btn ghost" type="button" data-action="restart">Volver a la portada</button>
        </div>`),
      back: monogram
    });

    return { defs, cover, coverBack: monogram, leaves };
  };
})();
