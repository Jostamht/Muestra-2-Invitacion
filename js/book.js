/*
  Motor del libro: apertura, páginas, gestos, música y cuenta regresiva.
  Estado: s = cantidad de hojas ya pasadas.
    s = 0  libro cerrado (portada)
    s = k  se ve la página k (1 a M)
*/
(function () {
  const C = window.INVITE;
  const P = window.buildPages(C);
  const M = P.leaves.length;

  const $ = (id) => document.getElementById(id);
  const book = $("book"), scene = $("scene"), live = $("live");
  const prevBtn = $("prev"), nextBtn = $("next"), dotsEl = $("dots"), musicBtn = $("music");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.title = `${C.novios.primero} y ${C.novios.segundo}, invitación de boda`;

  /* ---------- Construcción del libro ---------- */

  const blank = `<div class="frame"></div>`;
  document.body.insertAdjacentHTML("afterbegin", P.defs);
  let html = `<div class="board-l"></div><div class="board"></div><div class="ribbon"></div><div class="block"></div>`;
  html += `<div class="leaf cover" style="--i:0">
      <div class="face front cover-front" role="button" tabindex="0" aria-label="Abrir la invitación">${P.cover}</div>
      <div class="face back">${P.coverBack}</div>
    </div>`;
  // La cara trasera de una hoja es la página izquierda que acompaña a la página siguiente.
  P.leaves.forEach((lf, k) => {
    const companion = P.leaves[k + 1] && P.leaves[k + 1].back;
    html += `<div class="leaf" style="--i:${k + 1}">
      <div class="face front">${lf.front}</div>
      <div class="face back">${companion || blank}</div>
    </div>`;
  });
  book.style.setProperty("--n", M + 1);
  book.innerHTML = html;

  const leaves = [...book.querySelectorAll(".leaf")];
  dotsEl.innerHTML = P.leaves.map(() => "<li></li>").join("");
  dotsEl.setAttribute("aria-hidden", "true");
  const dots = [...dotsEl.children];

  /* ---------- Estado y navegación ---------- */

  let s = 0;
  let busy = false;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));

  function paint() {
    leaves.forEach((lf, i) => {
      lf.classList.toggle("flipped", i < s);
      lf.inert = i !== s;
    });
    dots.forEach((d, i) => d.classList.toggle("on", i === s - 1));
    prevBtn.disabled = s === 0;
    nextBtn.disabled = s === 0 || s === M;
    prevBtn.setAttribute("aria-label", s === 1 ? "Cerrar el libro" : "Página anterior");
  }

  function raise(i) {
    leaves.forEach((lf, k) => lf.classList.toggle("is-current", k === i && i >= 1));
  }

  async function go(to, restart) {
    if (busy || to === s || to < 0 || to > M) return;
    busy = true;
    const from = s;

    // 1. El papel se aplana antes de pasar la hoja
    leaves.forEach((lf) => {
      if (lf.classList.contains("is-current")) {
        lf.classList.add("folding");
        setTimeout(() => lf.classList.remove("folding"), 480);
      }
      lf.classList.remove("is-current");
    });
    if (from >= 1) await wait(300);

    // 2. Se pasa la hoja (o varias, si se vuelve a la portada)
    if (restart) {
      leaves.forEach((lf, i) => lf.style.setProperty("--delay", `${Math.max(0, from - 1 - i) * 0.1}s`));
    }
    const turning = restart ? leaves.slice(0, from) : [leaves[Math.min(from, to)]];
    turning.forEach((lf) => lf.classList.add("turning"));
    setTimeout(() => turning.forEach((lf) => lf.classList.remove("turning")), reduce ? 0 : 1400 + (restart ? from * 100 : 0));
    s = to;
    document.body.classList.toggle("is-open", s >= 1);
    book.classList.toggle("is-open", s >= 1);
    paint();
    if (s >= 1) live.textContent = `Página ${s} de ${M}: ${P.leaves[s - 1].label}`;
    else live.textContent = "Libro cerrado";

    // 3. Cuando la página se asienta, el papel se levanta
    const settle = restart ? (from - 1) * 100 + 700 : 750;
    await wait(settle);
    raise(s);
    if (restart) leaves.forEach((lf) => lf.style.removeProperty("--delay"));
    await wait(250);
    busy = false;
  }

  function next() {
    if (s === 0) return open();
    go(s + 1);
  }
  function prev() {
    if (s >= 1) go(s - 1);
  }
  function open() {
    startMusic();
    go(1);
  }

  paint();

  /* ---------- Gestos, teclado y botones ---------- */

  let down = null;
  scene.addEventListener("pointerdown", (e) => {
    down = { x: e.clientX, y: e.clientY, target: e.target };
  });
  scene.addEventListener("pointercancel", () => { down = null; });
  scene.addEventListener("pointerup", (e) => {
    if (!down) return;
    const dx = e.clientX - down.x, dy = e.clientY - down.y, d = down;
    down = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) return dx < 0 ? next() : prev();
    if (Math.hypot(dx, dy) > 10) return;

    const t = d.target;
    if (t.closest && t.closest("a, button[data-action]")) return;
    if (s === 0) return open();
    const r = book.getBoundingClientRect();
    if (e.clientX < r.left + r.width * 0.22) prev();
    else next();
  });

  scene.addEventListener("click", (e) => {
    const btn = e.target.closest && e.target.closest("[data-action='restart']");
    if (btn) go(0, true);
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.closest && e.target.closest("a, button") && e.target !== prevBtn && e.target !== nextBtn) {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    }
    if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); next(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); prev(); }
    else if ((e.key === "Enter" || e.key === " ") && s === 0 && e.target.closest(".cover-front")) { e.preventDefault(); open(); }
  });

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  /* ---------- Profundidad: la vista se desplaza apenas con el mouse ---------- */

  if (!reduce && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let raf = 0;
    document.addEventListener("pointermove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
        scene.style.setProperty("--ox", `${(x * -14).toFixed(1)}%`);
        scene.style.setProperty("--oy", `${(y * -8).toFixed(1)}%`);
      });
    });
  }

  /* ---------- Música ---------- */

  const audio = new Audio(C.musica.src);
  audio.loop = true;
  audio.preload = "none";
  audio.volume = 0;
  let wantMusic = true;
  let fade = null;

  function fadeTo(target, ms) {
    clearInterval(fade);
    const from = audio.volume, steps = 20, dt = ms / steps;
    let n = 0;
    fade = setInterval(() => {
      n++;
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * (n / steps)));
      if (n >= steps) { clearInterval(fade); if (target === 0) audio.pause(); }
    }, dt);
  }
  function startMusic() {
    if (!wantMusic) return;
    audio.play().then(() => fadeTo(C.musica.volumen, 1800)).catch(() => {
      wantMusic = false;
      syncMusicBtn();
    });
  }
  function syncMusicBtn() {
    musicBtn.setAttribute("aria-pressed", String(wantMusic));
    musicBtn.setAttribute("aria-label", wantMusic ? "Silenciar la música" : "Activar la música");
  }
  musicBtn.addEventListener("click", () => {
    wantMusic = !wantMusic;
    syncMusicBtn();
    if (!wantMusic) fadeTo(0, 400);
    else if (s >= 1) startMusic();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) audio.pause();
    else if (wantMusic && s >= 1) audio.play().then(() => fadeTo(C.musica.volumen, 800)).catch(() => {});
  });

  /* ---------- Cuenta regresiva ---------- */

  const target = new Date(C.fecha).getTime();
  const cd = {};
  book.querySelectorAll("#count [data-k]").forEach((el) => (cd[el.dataset.k] = el));
  function tick() {
    if (document.hidden || !cd.d) return;
    const ms = Math.max(0, target - Date.now());
    const sec = Math.floor(ms / 1000);
    cd.d.textContent = Math.floor(sec / 86400);
    cd.h.textContent = Math.floor((sec % 86400) / 3600);
    cd.m.textContent = Math.floor((sec % 3600) / 60);
    cd.s.textContent = sec % 60;
  }
  tick();
  setInterval(tick, 1000);
})();
