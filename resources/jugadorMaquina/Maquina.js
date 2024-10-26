import { CongruencialMixto } from "../numerosAleatorios/Metodos/CongruencialMixto.js";

class Maquina {
  constructor(_cartas) {
    this.cartas = _cartas;
    this.generador = new CongruencialMixto([new Date().getSeconds(), 7, 13, 997]);
    this.intervaloe = 1 / this.cartas;
  }

  elegirCarta() {
    let r = this.generador.next();
    let auxIntervalo = this.intervaloe
    for(let i = 0; i < this.cartas; i++){
      if(r < auxIntervalo){
        return i
      }
      auxIntervalo += this.intervaloe
    }
  }
}

export { Maquina };
