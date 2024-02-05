export const  Today  = (fecha, opc) => {
  let date = 0;
  switch (opc) {
    case 1:
      date = parseInt(fecha.getTime().toFixed());
      break;
    case 2:
      date = parseInt(fecha.getTime().toFixed() / 1000);
      break;
  }
  return date;
}
