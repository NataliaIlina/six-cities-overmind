const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace(`-`, ``).replace(`_`, ``);
  });
};

const isObject = (o: any) => {
  return o === Object(o) && !Array.isArray(o) && typeof o !== `function`;
};

export const transformKeysToCamel = (o: any) => {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = transformKeysToCamel(o[k]);
    });

    return n;
  } else if (Array.isArray(o)) {
    return o.map((i) => {
      return transformKeysToCamel(i);
    });
  }

  return o;
};
