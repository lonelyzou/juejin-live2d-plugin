var Aes;
(function (n) {
  function i(n, i) {
    for (var s, c, e = 4, l = i.length / e - 1, r = [[], [], [], []], o = 0; o < 4 * e; o++) r[o % 4][Math.floor(o / 4)] = n[o];
    for (r = t(r, i, 0, e), s = 1; s < l; s++) r = u(r, e), r = f(r, e), r = h(r, e), r = t(r, i, s, e);
    for (r = u(r, e), r = f(r, e), r = t(r, i, l, e), c = new Array(4 * e), o = 0; o < 4 * e; o++) c[o] = r[o % 4][Math.floor(o / 4)];
    return c
  }

  function r(n) {
    for (var h, i, o = 4, r = n.length / 4, s = r + 6, f = new Array(o * (s + 1)), u = new Array(4), t = 0; t < r; t++) h = [n[4 * t], n[4 * t + 1], n[4 * t + 2], n[4 * t + 3]], f[t] = h;
    for (t = r; t < o * (s + 1); t++) {
      for (f[t] = new Array(4), i = 0; i < 4; i++) u[i] = f[t - 1][i];
      if (t % r == 0) for (u = e(c(u)), i = 0; i < 4; i++) u[i] ^= l[t / r][i]; else r > 6 && t % r == 4 && (u = e(u));
      for (i = 0; i < 4; i++) f[t][i] = f[t - r][i] ^ u[i]
    }
    return f
  }

  function u(n, t) {
    for (var r, i = 0; i < 4; i++) for (r = 0; r < t; r++) n[i][r] = o[n[i][r]];
    return n
  }

  function f(n, t) {
    for (var i, u = new Array(4), r = 1; r < 4; r++) {
      for (i = 0; i < 4; i++) u[i] = n[r][(i + r) % t];
      for (i = 0; i < 4; i++) n[r][i] = u[i]
    }
    return n
  }

  function h(n) {
    for (var t, r, u, i = 0; i < 4; i++) {
      for (t = new Array(4), r = new Array(4), u = 0; u < 4; u++) t[u] = n[u][i], r[u] = n[u][i] & 128 ? n[u][i] << 1 ^ 283 : n[u][i] << 1;
      n[0][i] = r[0] ^ t[1] ^ r[1] ^ t[2] ^ t[3];
      n[1][i] = t[0] ^ r[1] ^ t[2] ^ r[2] ^ t[3];
      n[2][i] = t[0] ^ t[1] ^ r[2] ^ t[3] ^ r[3];
      n[3][i] = t[0] ^ r[0] ^ t[1] ^ t[2] ^ r[3]
    }
    return n
  }

  function t(n, t, i, r) {
    for (var f, u = 0; u < 4; u++) for (f = 0; f < r; f++) n[u][f] ^= t[i * 4 + f][u];
    return n
  }

  function e(n) {
    for (var t = 0; t < 4; t++) n[t] = o[n[t]];
    return n
  }

  function c(n) {
    for (var i = n[0], t = 0; t < 3; t++) n[t] = n[t + 1];
    return n[3] = i, n
  }

  function a(n, t, u) {
    var c = 16, a, y, l, w, o, e, f, nt;
    if (!(u == 128 || u == 192 || u == 256)) return "";
    for (n = s(n), t = s(t), a = u / 8, y = new Array(a), f = 0; f < a; f++) y[f] = isNaN(t.charCodeAt(f)) ? 0 : t.charCodeAt(f);
    l = i(y, r(y));
    l = l.concat(l.slice(0, a - 16));
    var h = new Array(c), k = (new Date).getTime(), tt = k % 1e3, it = Math.floor(k / 1e3),
      rt = Math.floor(Math.random() * 65535);
    for (f = 0; f < 2; f++) h[f] = tt >>> f * 8 & 255;
    for (f = 0; f < 2; f++) h[f + 2] = rt >>> f * 8 & 255;
    for (f = 0; f < 4; f++) h[f + 4] = it >>> f * 8 & 255;
    for (w = "", f = 0; f < 8; f++) w += String.fromCharCode(h[f]);
    var ut = r(l), b = Math.ceil(n.length / c), d = new Array(b);
    for (o = 0; o < b; o++) {
      for (e = 0; e < 4; e++) h[15 - e] = o >>> e * 8 & 255;
      for (e = 0; e < 4; e++) h[11 - e] = o / 4294967296 >>> e * 8;
      var ft = i(h, ut), g = o < b - 1 ? c : (n.length - 1) % c + 1, p = new Array(g);
      for (f = 0; f < g; f++) p[f] = ft[f] ^ n.charCodeAt(o * c + f), p[f] = String.fromCharCode(p[f]);
      d[o] = p.join("")
    }
    return nt = w + d.join(""), v(nt)
  }

  function v(n) {
    for (var i = "0x", r = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], t = 0; t < n.length; t++) i += r[n.charCodeAt(t) >> 4] + r[n.charCodeAt(t) & 15];
    return i
  }

  function s(n) {
    var t = n.replace(/[\u0080-\u07ff]/g, function (n) {
      var t = n.charCodeAt(0);
      return String.fromCharCode(192 | t >> 6, 128 | t & 63)
    });
    return t.replace(/[\u0800-\uffff]/g, function (n) {
      var t = n.charCodeAt(0);
      return String.fromCharCode(224 | t >> 12, 128 | t >> 6 & 63, 128 | t & 63)
    })
  }

  var o = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22],
    l = [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0], [32, 0, 0, 0], [64, 0, 0, 0], [128, 0, 0, 0], [27, 0, 0, 0], [54, 0, 0, 0]];
  n.encrypt = a
})(Aes || (Aes = {}));

export function encrypt(val,pwd,bit){
  return Aes.encrypt(val,pwd,bit);
}

function tt() {
  return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);
}
export function cr() {
  return (
    tt() +
    tt() +
    tt() +
    tt() +
    tt() +
    tt() +
    tt() +
    tt()
  ).toLowerCase();
}

