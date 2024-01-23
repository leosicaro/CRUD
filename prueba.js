let persona = {
    nombre: "Juan",
    edad: 30,
    ciudad: "Madrid",
  };
  
  for (let propiedad in persona) {
    console.log(propiedad + ": " + persona[propiedad]);
  }