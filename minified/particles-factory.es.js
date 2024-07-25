var st = Object.defineProperty;
var B = (o) => {
  throw TypeError(o);
};
var et = (o, t, i) => t in o ? st(o, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : o[t] = i;
var I = (o, t, i) => et(o, typeof t != "symbol" ? t + "" : t, i), D = (o, t, i) => t.has(o) || B("Cannot " + i);
var l = (o, t, i) => (D(o, t, "read from private field"), i ? i.call(o) : t.get(o)), S = (o, t, i) => t.has(o) ? B("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(o) : t.set(o, i), f = (o, t, i, s) => (D(o, t, "write to private field"), s ? s.call(o, i) : t.set(o, i), i), r = (o, t, i) => (D(o, t, "access private method"), i);
class at {
  constructor(t, i, s, a, n, h, c = null) {
    this.canvas = t, this.ctx = this.canvas.getContext("2d"), this.x = i, this.y = s, this.size = a, this.speed = n, this.fillStyle = h, this.imageSrc = c, c && this.loadImage(c), this.updateSpeed(n);
  }
  loadImage(t) {
    this.image = new Image(), this.image.src = t, this.image.onload = () => {
      this.imageLoaded = !0;
    }, this.imageLoaded = !1;
  }
  drawParticle(t, i, s, a, n) {
    const h = this.ctx;
    switch (n && (h.strokeStyle = n), h.globalAlpha = i, h.beginPath(), a) {
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
        break;
      case "image":
        this.imageLoaded && this.image && this.drawImage(h, s);
    }
    h.fill(), n && (h.strokeStyle = n, h.stroke());
  }
  drawImage(t, i) {
    this.image && t.drawImage(this.image, this.x - i / 2, this.y - i / 2, i, i);
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
    let g = n - s - c, p = h - a - d;
    const u = Math.sqrt(g * g + p * p);
    if (u && i > u) {
      g /= u, p /= u;
      const w = 2;
      this.x = c + g * -w, this.y = d + p * -w;
    }
  }
}
var P, m, v, y, E, M, F, e, L, T, W, j, Y, H, N, O, X, G, R, q, J, K, Q, U, V, Z, $, b, _;
const k = class k {
  constructor(t = { canvas: { id: "particles-canvas" } }) {
    S(this, e);
    S(this, P);
    S(this, m);
    S(this, v);
    S(this, y);
    S(this, E);
    S(this, M);
    S(this, F);
    I(this, "getCanvasSize", () => {
      const { width: t, height: i, prevDimensions: s } = r(this, e, O).call(this);
      r(this, e, X).call(this, t, i), this.main.isResponsive && r(this, e, V).call(this, t, i, s);
    });
    var s;
    const i = k.defaultConfig;
    for (const a in i) Object.preventExtensions(this[a] = { ...i[a], ...t[a] });
    if (!this.particles.draw && !this.lines.draw) throw new Error("You need to define at least either a particles- or a lines-object to draw.");
    f(this, m, []), f(this, M, ((s = this.particles) == null ? void 0 : s.size) || 2), f(this, F, r(this, e, $).call(this, r(this, e, q))), r(this, e, L).call(this), r(this, e, T).call(this), r(this, e, R).call(this), r(this, e, b).call(this);
  }
  setFillMode(t) {
    t === "noFill" ? (this.particles.noFill = !0, l(this, m).forEach((i) => i.fillStyle = "transparent")) : (this.particles.noFill = !1, t === "random" && (this.particles.randomFill = !0), t === "fill" && (this.particles.randomFill = !0, l(this, m).forEach((i) => i.fillStyle = this.particles.fillStyle)));
  }
  setSpeed(t) {
    this.main.speed = t, l(this, m).forEach((i) => {
      i.updateSpeed(t);
    });
  }
  setNumParticles(t) {
    t = Math.round(t);
    const i = l(this, m).length;
    let s = t - i;
    t && s && s > 0 ? r(this, e, Q).call(this, s) : r(this, e, U).call(this, i, -s), this.main.numParticles = i + s;
  }
  setImageSrc(t) {
    this.particles.imageSrc = t, l(this, m).forEach((i) => {
      i.loadImage(t);
    });
  }
  setBaseSize(t) {
    const i = (t = Math.round(t)) / l(this, M);
    l(this, m).forEach((s) => {
      s.size *= i;
    }), f(this, M, t);
  }
  toggleFullScreen() {
    this.main.isFullScreen = !this.main.isFullScreen, this.getCanvasSize();
  }
  toggleAnimation() {
    l(this, v) ? r(this, e, _).call(this) : r(this, e, b).call(this);
  }
};
P = new WeakMap(), m = new WeakMap(), v = new WeakMap(), y = new WeakMap(), E = new WeakMap(), M = new WeakMap(), F = new WeakMap(), e = new WeakSet(), L = function() {
  this.canvasEl = document.getElementById(this.canvas.id), f(this, P, this.canvasEl.getContext("2d")), f(this, y, document.createElement("canvas")), f(this, E, l(this, y).getContext("2d")), this.getCanvasSize();
}, T = function() {
  const { x: t, y: i } = this.canvasEl.getBoundingClientRect();
  this.canvasEl.addEventListener("pointermove", (s) => {
    l(this, m).forEach((a) => {
      a.handleMouseMove(s, this.main.mouseDistance, t, i);
    });
  }), window.addEventListener("resize", () => {
    this.main.isFullScreen && (this.getCanvasSize(), r(this, e, q).call(this));
  });
}, W = function() {
  return "#" + (16777215 * Math.random() | 0).toString(16).padStart(6, "0");
}, j = function(t, i, s) {
  return { x: Math.random() * (t - s / 2), y: Math.random() * (i - s / 2) };
}, Y = function(t) {
  return t * Math.max(0.2, Math.random());
}, H = function(t, i, s, a) {
  const n = s - t, h = a - i;
  return Math.sqrt(n ** 2 + h ** 2);
}, N = function(t, i) {
  if (t && i) return r(this, e, H).call(this, t.x, t.y, i.x, i.y);
}, O = function() {
  const { innerWidth: t, innerHeight: i } = window, s = this.main.isFullScreen, a = i;
  return { width: s ? t : this.canvas.width, height: s ? a : this.canvas.height, prevDimensions: { width: this.canvasEl.width, height: this.canvasEl.height } };
}, X = function(t, i) {
  l(this, y).width = this.canvasEl.width = t, l(this, y).height = this.canvasEl.height = i;
}, G = function() {
  const { width: t, height: i } = l(this, y), { size: s, randomSize: a, fillStyle: n, randomFill: h, shape: c, draw: d, imageSrc: g } = this.particles;
  let p = n, u = s;
  d && (h && (p = r(this, e, W).call(this)), a && (u = r(this, e, Y).call(this, s)));
  const { x: w, y: z } = r(this, e, j).call(this, t, i, s);
  return new at(l(this, y), w, z, u, this.main.speed, p, c === "image" ? g : null);
}, R = function(t = this.main.numParticles) {
  for (; t; ) l(this, m).push(r(this, e, G).call(this)), t--;
}, q = function() {
  const t = this.main.numParticles, { draw: i, collision: s, randomFill: a, noFill: n, fillStyle: h, stroke: c, opacity: d, randomSize: g, size: p, shape: u, imageSrc: w } = this.particles, z = c ? this.lines.strokeStyle : void 0, C = l(this, E);
  C.fillStyle = this.main.fillStyle, C.globalAlpha = 1, C.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height), l(this, m).forEach((x) => x.updateCoords(this.particles.draw)), l(this, m).forEach((x, tt) => {
    if ((this.lines.draw && +this.lines.connectDistance || s) && r(this, e, Z).call(this, x, tt, t), i) {
      let it = n ? "transparent" : a ? x.fillStyle : h;
      x.drawParticle(it, d, g ? x.size : p, u, z, w);
    }
  }), r(this, e, J).call(this);
}, J = function() {
  l(this, P).drawImage(l(this, y), 0, 0);
}, K = function(t, i, s, a) {
  var g;
  if (!i || !s || !((g = this.lines) != null && g.draw)) return;
  const { strokeStyle: n, lineWidth: h, opacity: c, connectDistance: d } = this.lines;
  if (d >= a) {
    const { x: p, y: u } = i, { x: w, y: z } = s;
    t.beginPath(), t.moveTo(p, u), t.lineTo(w, z), t.strokeStyle = n, t.lineWidth = h, t.globalAlpha = c, t.stroke();
  }
}, Q = function(t) {
  r(this, e, R).call(this, t);
}, U = function(t, i) {
  l(this, m).splice(t - i, i), this.numParticles = l(this, m).length;
}, V = function(t, i, s) {
  const a = t / s.width, n = i / s.height;
  l(this, m).forEach((h) => {
    h.x *= a, h.y *= n;
  });
}, Z = function(t, i, s) {
  var a, n;
  for (let h = i + 1; s > h; h++) {
    const c = l(this, m)[h], d = r(this, e, N).call(this, t, c), { randomSize: g, size: p } = this.particles;
    (a = this.lines) != null && a.draw && r(this, e, K).call(this, l(this, E), t, c, d), (n = this.particles) != null && n.collision && t.particlesCollision(g, p, t, c, d);
  }
}, $ = function(t) {
  let i;
  return function() {
    i || (t.apply(this, arguments), i = !0, setTimeout(() => i = !1, 1e3 / this.main.frameRate));
  };
}, b = function() {
  l(this, F).call(this), f(this, v, requestAnimationFrame(r(this, e, b).bind(this)));
}, _ = function() {
  cancelAnimationFrame(l(this, v)), f(this, v, null);
}, I(k, "defaultConfig", { canvas: { id: "particles-canvas", width: 500, height: 500 }, main: { frameRate: 30, numParticles: 80, speed: 0.2, mouseDistance: 80, fillStyle: "#000", isFullScreen: !0, isResponsive: !0 }, particles: { shape: "triangle", fillStyle: "#ff0000", randomFill: !0, noFill: !1, stroke: !0, size: 44, randomSize: !0, draw: !0, collision: !1, opacity: 1, imageSrc: null }, lines: { connectDistance: 100, strokeStyle: "#ffffff", draw: !0, lineWidth: 0.5, opacity: 1 } });
let A = k;
typeof window < "u" && (window.ParticlesFactory = A);
export {
  A as ParticlesFactory
};
