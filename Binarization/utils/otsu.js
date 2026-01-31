function otsuThreshold(grayPixels) {
  const hist = new Array(256).fill(0);
  const total = grayPixels.length;

  // Histogram
  grayPixels.forEach(p => hist[p]++);
  for (let i = 0; i < 256; i++) hist[i] /= total;

  let omega = new Array(256).fill(0);
  let mu = new Array(256).fill(0);

  omega[0] = hist[0];
  mu[0] = 0;

  for (let i = 1; i < 256; i++) {
    omega[i] = omega[i - 1] + hist[i];
    mu[i] = mu[i - 1] + i * hist[i];
  }

  const muT = mu[255];

  let maxSigma = -1;
  let threshold = 0;

  for (let t = 0; t < 256; t++) {
    const w0 = omega[t];
    const w1 = 1 - w0;
    if (w0 === 0 || w1 === 0) continue;

    const mu0 = mu[t] / w0;
    const mu1 = (muT - mu[t]) / w1;

    const sigmaB2 = w0 * w1 * Math.pow(mu0 - mu1, 2);

    if (sigmaB2 > maxSigma) {
      maxSigma = sigmaB2;
      threshold = t;
    }
  }

  return threshold;
}

module.exports = otsuThreshold;
