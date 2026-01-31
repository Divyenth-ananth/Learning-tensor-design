function toGrayscale(r, g, b) {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}

module.exports = toGrayscale;
