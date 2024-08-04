// Map number x from range [a, b] to [c, d]
const map = (x: any, a: any, b: any, c: any, d: any) =>
  ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
const lerp = (a: any, b: any, n: any): any => (1 - n) * a + n * b;

const clamp = (num: number, min: number, max: number) =>
  num <= min ? min : num >= max ? max : num;

// Gets the mouse position
const getMousePos = (ev: any) => {
  return {
    x: ev.clientX,
    y: ev.clientY,
  };
};

const getPiramidalIndex = (array: any, index: any) =>
  array.map((_: any, i: any) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

export { map, lerp, clamp, getMousePos, getPiramidalIndex };
