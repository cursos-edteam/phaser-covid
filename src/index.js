const array = [1, 2, 3, 4, 5];
const arrayX2 = [...array].map((item) => item * 2);
console.log(arrayX2);

const miFuncion = (...a) => {
  console.log(a.length);
};

// Llamando a mi funcion
miFuncion(1, 2, 3);
