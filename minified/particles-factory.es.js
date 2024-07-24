var it = Object.defineProperty;
var T = (o) => {
  throw TypeError(o);
};
var st = (o, t, i) => t in o ? it(o, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : o[t] = i;
var b = (o, t, i) => st(o, typeof t != "symbol" ? t + "" : t, i), I = (o, t, i) => t.has(o) || T("Cannot " + i);
var l = (o, t, i) => (I(o, t, "read from private field"), i ? i.call(o) : t.get(o)), S = (o, t, i) => t.has(o) ? T("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, i), y = (o, t, i, s) => (I(o, t, "write to private field"), s ? s.call(o, i) : t.set(o, i), i), r = (o, t, i) => (I(o, t, "access private method"), i);
class et {
  constructor(t, i, s, a, n, h) {
    this.canvas = t, this.ctx = this.canvas.getContext("2d"), this.x = i, this.y = s, this.size = a, this.speed = n, this.fillStyle = h, this.updateSpeed(n);
  }
  drawParticle(t, i, s, a, n) {
    const h = this.ctx;
    switch (n && (h.strokeStyle = n), h.fillStyle = t, h.globalAlpha = i, h.beginPath(), a) {
      case "circle":
        this.createCircle(h, s);
        break;
      case "square":
        this.createPolygon(h, s, 4, -Math.PI / 4, 1, "square");
        break;
      case "rhombus":
        this.createPolygon(h, s, 4, 0, 2 / 3, "rhombus");
        break;
      case "hexagon":
        this.createPolygon(h, s, 6, 0, 1, "hexagon");
        break;
      case "triangle":
        this.createPolygon(h, s, 3, -Math.PI / 2, 1, "triangle");
    }
    h.fill(), n && (h.strokeStyle = n, h.stroke());
  }
  createCircle(t, i) {
    t.arc(this.x, this.y, i / 2, 0, 2 * Math.PI);
  }
  createPolygon(t, i, s, a, n) {
    const h = 2 * Math.PI / s, c = i / 2;
    t.moveTo(this.x + c * Math.cos(a), this.y + c * Math.sin(a / n));
    for (let d = 1; s >= d; d++) t.lineTo(this.x + c * Math.cos(h * d + a), this.y + c * Math.sin(h * d + a) / n);
    t.closePath();
  }
  keepInBoundaries(t) {
    let { x: i, y: s, size: a } = this;
    const { width: n, height: h } = this.canvas;
    t ? a /= 2 : a = 0, i > a && n - a > i || (this.x = i > a ? n - a : a, this.xSpeed *= -1), s > a && h - a > s || (this.y = s > a ? h - a : a, this.ySpeed *= -1);
  }
  particlesCollision(t, i, s, a, n) {
    const h = t ? s.size + a.size : 2 * i;
    Math.abs(n) < h / 2 && [s, a].forEach((c) => {
      for (let d of ["xSpeed", "ySpeed"]) c[d] *= 6 > c[d] ? -1.001 : -0.01;
    });
  }
  updateCoords(t) {
    this.size = this.size, this.keepInBoundaries(t), this.x += this.xSpeed, this.y += this.ySpeed;
  }
  updateSpeed(t) {
    this.xSpeed = t * (2 * Math.random() - 1), this.ySpeed = t * (2 * Math.random() - 1);
  }
  handleMouseMove(t, i, s, a) {
    if (!+i) return;
    const n = t.clientX, h = t.clientY, { x: c, y: d } = this;
    let m = n - s - c, f = h - a - d;
    const u = Math.sqrt(m * m + f * f);
    if (u && i > u) {
      m /= u, f /= u;
      const v = 2;
      this.x = c + m * -v, this.y = d + f * -v;
    }
  }
}
var z, p, w, g, E, M, F, e, q, B, W, j, L, Y, H, N, O, X, A, R, G, J, K, Q, U, V, Z, k, $;
const C = class C {
  constructor(t = { canvas: { id: "particles-canvas" } }) {
    S(this, e);
    S(this, z);
    S(this, p);
    S(this, w);
    S(this, g);
    S(this, E);
    S(this, M);
    S(this, F);
    b(this, "getCanvasSize", () => {
      const { width: t, height: i, prevDimensions: s } = r(this, e, N).call(this);
      r(this, e, O).call(this, t, i), this.main.isResponsive && r(this, e, U).call(this, t, i, s);
    });
    var s;
    const i = C.defaultConfig;
    for (const a in i) Object.preventExtensions(this[a] = { ...i[a], ...t[a] });
    if (!this.canvas) throw new Error("To instantiate with the default settings you need at least to pass the canvas id like myParticles = new ParticlesFactory(canvas:{id: <your-canvas-id})");
    if (!this.particles.draw && !this.lines.draw) throw new Error("You need to define at least either a particles- or a lines-object to draw.");
    y(this, p, []), y(this, M, ((s = this.particles) == null ? void 0 : s.size) || 2), y(this, F, r(this, e, Z).call(this, r(this, e, R))), r(this, e, q).call(this), r(this, e, B).call(this), r(this, e, A).call(this), r(this, e, k).call(this);
  }
  setFillMode(t) {
    t === "random" && (this.particles.randomFill = !0), t === "fill" && (this.particles.randomFill = !0, l(this, p).forEach((i) => i.fillStyle = this.particles.fillStyle)), t === "noFill" && (this.particles.noFill = !0, l(this, p).forEach((i) => i.fillStyle = "transparent"));
  }
  setSpeed(t) {
    this.main.speed = t, l(this, p).forEach((i) => {
      i.updateSpeed(t);
    });
  }
  setNumParticles(t) {
    t = Math.round(t);
    const i = l(this, p).length;
    let s = t - i;
    t && s && s > 0 ? r(this, e, K).call(this, s) : r(this, e, Q).call(this, i, -s), this.main.numParticles = i + s;
  }
  setBaseSize(t) {
    const i = (t = Math.round(t)) / l(this, M);
    l(this, p).forEach((s) => {
      s.size *= i;
    }), y(this, M, t);
  }
  toggleFullScreen() {
    this.main.isFullScreen = !this.main.isFullScreen, this.getCanvasSize();
  }
  toggleAnimation() {
    l(this, w) ? r(this, e, $).call(this) : r(this, e, k).call(this);
  }
};
z = new WeakMap(), p = new WeakMap(), w = new WeakMap(), g = new WeakMap(), E = new WeakMap(), M = new WeakMap(), F = new WeakMap(), e = new WeakSet(), q = function() {
  this.canvasEl = document.getElementById(this.canvas.id), y(this, z, this.canvasEl.getContext("2d")), y(this, g, document.createElement("canvas")), y(this, E, l(this, g).getContext("2d")), this.getCanvasSize();
}, B = function() {
  const { x: t, y: i } = this.canvasEl.getBoundingClientRect();
  this.canvasEl.addEventListener("pointermove", (s) => {
    l(this, p).forEach((a) => {
      a.handleMouseMove(s, this.main.mouseDistance, t, i);
    });
  }), window.addEventListener("resize", () => {
    this.main.isFullScreen && (this.getCanvasSize(), r(this, e, R).call(this));
  });
}, W = function() {
  return "#" + (16777215 * Math.random() | 0).toString(16).padStart(6, "0");
}, j = function(t, i, s) {
  return { x: Math.random() * (t - s / 2), y: Math.random() * (i - s / 2) };
}, L = function(t) {
  return t * Math.max(0.2, Math.random());
}, Y = function(t, i, s, a) {
  const n = s - t, h = a - i;
  return Math.sqrt(n ** 2 + h ** 2);
}, H = function(t, i) {
  if (t && i) return r(this, e, Y).call(this, t.x, t.y, i.x, i.y);
}, N = function() {
  const { innerWidth: t, innerHeight: i } = window, s = this.main.isFullScreen, a = i;
  return { width: s ? t : this.canvas.width, height: s ? a : this.canvas.height, prevDimensions: { width: this.canvasEl.width, height: this.canvasEl.height } };
}, O = function(t, i) {
  l(this, g).width = this.canvasEl.width = t, l(this, g).height = this.canvasEl.height = i;
}, X = function() {
  const { width: t, height: i } = l(this, g), { size: s, randomSize: a, fillStyle: n, randomFill: h, shape: c, draw: d } = this.particles;
  let m = n, f = s;
  d && (h && (m = r(this, e, W).call(this)), a && (f = r(this, e, L).call(this, s)));
  const { x: u, y: v } = r(this, e, j).call(this, t, i, s);
  return new et(l(this, g), u, v, f, this.main.speed, m, c);
}, A = function(t = this.main.numParticles) {
  for (; t; ) l(this, p).push(r(this, e, X).call(this)), t--;
}, R = function() {
  const t = this.main.numParticles, { draw: i, collision: s, randomFill: a, noFill: n, fillStyle: h, stroke: c, opacity: d, randomSize: m, size: f, shape: u } = this.particles, v = c ? this.lines.strokeStyle : void 0, P = l(this, E);
  P.fillStyle = this.main.fillStyle, P.globalAlpha = 1, P.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height), l(this, p).forEach((x) => x.updateCoords(this.particles.draw)), l(this, p).forEach((x, _) => {
    if ((this.lines.draw && +this.lines.connectDistance || s) && r(this, e, V).call(this, x, _, t), i) {
      let tt = n ? "transparent" : a ? x.fillStyle : h;
      x.drawParticle(tt, d, m ? x.size : f, u, v);
    }
  }), r(this, e, G).call(this);
}, G = function() {
  l(this, z).drawImage(l(this, g), 0, 0);
}, J = function(t, i, s, a) {
  var m;
  if (!i || !s || !((m = this.lines) != null && m.draw)) return;
  const { strokeStyle: n, lineWidth: h, opacity: c, connectDistance: d } = this.lines;
  if (d >= a) {
    const { x: f, y: u } = i, { x: v, y: P } = s;
    t.beginPath(), t.moveTo(f, u), t.lineTo(v, P), t.strokeStyle = n, t.lineWidth = h, t.globalAlpha = c, t.stroke();
  }
}, K = function(t) {
  r(this, e, A).call(this, t);
}, Q = function(t, i) {
  l(this, p).splice(t - i, i), this.numParticles = l(this, p).length;
}, U = function(t, i, s) {
  const a = t / s.width, n = i / s.height;
  l(this, p).forEach((h) => {
    h.x *= a, h.y *= n;
  });
}, V = function(t, i, s) {
  var a, n;
  for (let h = i + 1; s > h; h++) {
    const c = l(this, p)[h], d = r(this, e, H).call(this, t, c), { randomSize: m, size: f } = this.particles;
    (a = this.lines) != null && a.draw && r(this, e, J).call(this, l(this, E), t, c, d), (n = this.particles) != null && n.collision && t.particlesCollision(m, f, t, c, d);
  }
}, Z = function(t) {
  let i;
  return function() {
    i || (t.apply(this, arguments), i = !0, setTimeout(() => i = !1, 1e3 / this.main.frameRate));
  };
}, k = function() {
  l(this, F).call(this), y(this, w, requestAnimationFrame(r(this, e, k).bind(this)));
}, $ = function() {
  cancelAnimationFrame(l(this, w)), y(this, w, null);
}, b(C, "defaultConfig", { canvas: { id: "particles-canvas", width: 500, height: 500 }, main: { frameRate: 30, numParticles: 80, speed: 0.2, mouseDistance: 80, fillStyle: "#000", isFullScreen: !0, isResponsive: !0 }, particles: { shape: "triangle", fillStyle: "#ff0000", randomFill: !0, noFill: !0, stroke: !0, size: 44, randomSize: !0, draw: !0, collision: !1, opacity: 1 }, lines: { connectDistance: 100, strokeStyle: "#ffffff", draw: !0, lineWidth: 0.5, opacity: 1 } });
let D = C;
typeof window < "u" && (window.ParticlesFactory = D);
export {
  D as ParticlesFactory
};
