const fs = require('fs');

function decodeValue(base, value) {
  const baseNum = parseInt(base);
  if (isNaN(baseNum) || baseNum < 2 || baseNum > 36) {
    throw new Error(`Invalid base: ${base}`);
  }
  const decoded = parseInt(value, baseNum);
  if (isNaN(decoded)) {
    throw new Error(`Invalid value: ${value} in base ${base}`);
  }
  return decoded;
}

function lagrangeInterpolation(points) {
  const n = points.length;
  let result = 0;

  for (let i = 0; i < n; i++) {
    const [xi, yi] = points[i];
    let basisPolynomial = 1;

    for (let j = 0; j < n; j++) {
      if (i !== j) {
        const [xj] = points[j];
        basisPolynomial *= (0 - xj) / (xi - xj);
      }
    }
    result += basisPolynomial * yi;
  }

  return Math.round(result);
}

function main() {
  try {
    const inputData = fs.readFileSync('input.json', 'utf8');
    const data = JSON.parse(inputData);

    if (!data.keys || typeof data.keys.n !== 'number' || typeof data.keys.k !== 'number') {
      throw new Error("Invalid or missing 'keys' in input JSON.");
    }
    const { n, k } = data.keys;
    const points = [];

    Object.keys(data)
      .filter(key => key !== 'keys')
      .forEach(key => {
        const { base, value } = data[key];
        const x = parseInt(key);
        if (isNaN(x)) {
          throw new Error(`Invalid key: ${key} (must be a number).`);
        }
        const y = decodeValue(base, value);
        points.push([x, y]);
      });

    if (points.length < k) {
      throw new Error(`Not enough points to reconstruct the polynomial. Required: ${k}, Found: ${points.length}`);
    }

    points.sort((a, b) => a[0] - b[0]);

    const interpolatedValue = lagrangeInterpolation(points);
    console.log(`The constant term c is: ${interpolatedValue}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
