export const capitalize = (str: string) => {
  const splitted = str.split(" ");
  const capitalized: string[] = [];

  splitted.map((el) => {
    const capital = `${el.charAt(0).toUpperCase()}${el.slice(1)}`;
    capitalized.push(capital);
  });

  return capitalized.join(" ");
};

export const capitalizeSentence = (str: string) => {
  const splitted = str.split(". ");
  const capitalized: string[] = [];

  console.log(splitted);

  splitted.map((el) => {
    const capital = `${el.charAt(0).toUpperCase()}${el.slice(1)}`;
    capitalized.push(capital);
  });

  return capitalized.join(". ");
};

export const inBetween = (a: number, b: number) => {
  if (typeof window === "undefined") {
    return  a;
  }

  if (typeof a !== "number" || typeof b !== "number") {
    return 0;
  }

  const first = Math.floor(a);
  const second = Math.ceil(b) + 1;

  const random = (Math.random() * 100).toFixed(0);
  const num = Number(random) % second;

  return num >= first ? num : num + first;
};
