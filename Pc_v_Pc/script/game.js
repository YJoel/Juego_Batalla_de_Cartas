import { Maquina } from "../../resources/jugadorMaquina/Maquina.js";
import { CongruencialMixto } from "../../resources/numerosAleatorios/Metodos/CongruencialMixto.js";

let generadorNumerosAleatorios = new CongruencialMixto([
  new Date().getSeconds(),
  7,
  13,
  997,
]);

function desordenar(array) {
  for (let i = array[0].length - 1; i > 0; i--) {
    const j = Math.floor(generadorNumerosAleatorios.next() * (i + 1));
    [array[0][i], array[0][j]] = [array[0][j], array[0][i]];
    [array[1][i], array[1][j]] = [array[1][j], array[1][i]];
  }
  console.log("Cartas Reordenadas");
  return array;
}

const rutasCartas = {
  rutas: [
    ["./recursosJuego/A10.jpg", "A"],
    ["./recursosJuego/A8.jpg", "A"],
    ["./recursosJuego/A6.jpg", "A"],
    ["./recursosJuego/D10.jpg", "D"],
    ["./recursosJuego/D8.jpg", "D"],
    ["./recursosJuego/D6.jpg", "D"],
  ],
  rutaPorDefecto: "./recursosJuego/LogoCarta-V.jpg",
  peso: [10, 8, 6, 10, 8, 6],
};

const puntosJuego = {
  jugador: {
    puntos: 100,
    apuesta: 10,
    estado: 1,
    gana(puntos) {
      this.puntos += puntos;
      this.apuesta = 10;
    },
    empate() {
      if (this.apuesta * 2 <= this.puntos) {
        this.apuesta *= 2;
      } else {
        this.apuesta = this.puntos;
      }
    },
    pierde() {
      this.puntos -= this.apuesta;
      if (this.puntos === 0) {
        this.estado = 0;
      }
      if (this.apuesta * 2 <= this.puntos) {
        this.apuesta *= 2;
      } else {
        this.apuesta = this.puntos;
      }
    },
  },
  resultadoBatalla(resultado) {
    if (resultado.gana === 1) {
      this.jugador.gana(resultado.puntos);
      this.maquina.pierde();
    } else if (resultado.gana === 2) {
      this.jugador.empate();
      this.maquina.empate();
    } else if (resultado.gana === 3) {
      this.maquina.gana(resultado.puntos);
      this.jugador.pierde();
    }
  },
  maquina: {
    puntos: 100,
    apuesta: 10,
    estado: 1,
    gana(puntos) {
      this.puntos += puntos;
      this.apuesta = 10;
    },
    empate() {
      if (this.apuesta * 2 <= this.puntos) {
        this.apuesta *= 2;
      } else {
        this.apuesta = this.puntos;
      }
    },
    pierde() {
      this.puntos -= this.apuesta;
      if (this.puntos === 0) {
        this.estado = 0;
      }
      if (this.apuesta * 2 <= this.puntos) {
        this.apuesta *= 2;
      } else {
        this.apuesta = this.puntos;
      }
    },
  },
  ronda: 1,
};

const marcador = {
  jugador: {
    puntos: document.getElementById("puntosJugador"),
    apuesta: document.getElementById("apuestaJugador"),
  },
  maquina: {
    puntos: document.getElementById("puntosMaquina"),
    apuesta: document.getElementById("apuestaMaquina"),
  },
  ronda: document.getElementById("ronda"),
};

const jugadorMaquina1 = new Maquina(
  document.querySelectorAll(".ladoIzquierdo>.fila>img").length
);

const jugadorMaquina2 = new Maquina(
  document.querySelectorAll(".ladoDerecho>.fila>img").length
);

const cartasIzquierda = document.querySelectorAll(".ladoIzquierdo>.fila>img");
const cartasDerecha = document.querySelectorAll(".ladoDerecho>.fila>img");

let eleccionJugador1 = undefined;
let eleccionJugador2 = undefined;
// cartasIzqui
// erda.forEach((elemento, indice, array) => {
//   array[indice].addEventListener("click", () => {
//     if (document.querySelector("ladoIzquierdo img.opacity-0") !== null) {
//       document.querySelector("img.opacity-0").classList.remove("opacity-0");
//     }
//     array[indice].className = "opacity-0";

//     document.getElementById("j1").src = rutasCartas.rutas[indice][0];

//     eleccionJugador1 = {
//       tipo: rutasCartas.rutas[indice][1],
//       peso: rutasCartas.peso[indice],
//     };
//     if (eleccionJugador2 !== undefined) {
//       console.log(eleccionJugador2);
//       console.log("Inicia el juego");
//       game();
//     }
//   });
// });

// cartasDerecha.forEach((elemento, indice, array) => {
//   array[indice].addEventListener("click", () => {
//     if (document.querySelector("ladoDercho img.opacity-0") !== null) {
//       document.querySelector("img.opacity-0").classList.remove("opacity-0");
//     }
//     array[indice].className = "opacity-0";

//     document.getElementById("j2").src = rutasCartas.rutas[indice][0];

//     eleccionJugador2 = {
//       tipo: rutasCartas.rutas[indice][1],
//       peso: rutasCartas.peso[indice],
//     };
//     if (eleccionJugador1 !== undefined) {
//       console.log(eleccionJugador1);
//       console.log("Inicia el juego");
//       game();
//     }
//   });
// });

setInterval(() => {
  setTimeout(() => {
    let random1 = jugadorMaquina1.elegirCarta();
    let random2 = jugadorMaquina2.elegirCarta();

    console.log(random1);
    console.log(random2);

    cartasIzquierda[random1].className = "opacity-0";
    document.getElementById("j1").src = rutasCartas.rutas[random1][0];

    eleccionJugador1 = {
      tipo: rutasCartas.rutas[random1][1],
      peso: rutasCartas.peso[random1],
    };

    [rutasCartas.rutas, rutasCartas.peso] = desordenar([
      rutasCartas.rutas,
      rutasCartas.peso,
    ]);

    cartasDerecha[random2].className = "opacity-0";
    document.getElementById("j2").src = rutasCartas.rutas[random2][0];

    eleccionJugador2 = {
      tipo: rutasCartas.rutas[random2][1],
      peso: rutasCartas.peso[random2],
    };

    game();
  }, 1000);
}, 5000);


function game() {
  let cartasElegidas = {
    jugador: eleccionJugador2,
    maquina: eleccionJugador1,
  };
  setTimeout(() => {
    document.getElementById("j2").src = rutasCartas.rutaPorDefecto;
    document.getElementById("j1").src = rutasCartas.rutaPorDefecto;

    setTimeout(() => {
      if (
        cartasElegidas.jugador.tipo === "A" &&
        cartasElegidas.maquina.tipo === "A"
      ) {
        if (cartasElegidas.jugador.peso > cartasElegidas.maquina.peso) {
          // EL JUGADOR GANA LA RONDA SOBRE LA MAQUINA
          puntosJuego.resultadoBatalla({
            gana: 1,
            puntos: puntosJuego.maquina.apuesta,
          });
        } else if (
          cartasElegidas.jugador.peso === cartasElegidas.maquina.peso
        ) {
          // EMPATE
          puntosJuego.resultadoBatalla({
            gana: 2,
          });
        } else if (cartasElegidas.jugador.peso < cartasElegidas.maquina.peso) {
          // LA MAQUINA GANA LA RONDA SOBRE EL JUGADOR
          puntosJuego.resultadoBatalla({
            gana: 3,
            puntos: puntosJuego.jugador.apuesta,
          });
        }
      } else if (
        cartasElegidas.jugador.tipo === "A" &&
        cartasElegidas.maquina.tipo === "D"
      ) {
        if (cartasElegidas.jugador.peso > cartasElegidas.maquina.peso) {
          // EL JUGADOR GANA LA RONDA SOBRE LA MAQUINA
          puntosJuego.resultadoBatalla({
            gana: 1,
            puntos: puntosJuego.maquina.apuesta,
          });
        } else if (
          // EL JUGADOR GANA LA RONDA SOBRE LA MAQUINA
          cartasElegidas.jugador.peso === cartasElegidas.maquina.peso
        ) {
          puntosJuego.resultadoBatalla({
            gana: 1,
            puntos: puntosJuego.maquina.apuesta,
          });
        } else if (cartasElegidas.jugador.peso < cartasElegidas.maquina.peso) {
          // ATAQUE BLOQUEADO
          puntosJuego.resultadoBatalla({
            gana: 2,
          });
        }
      } else if (
        cartasElegidas.jugador.tipo === "D" &&
        cartasElegidas.maquina.tipo === "A"
      ) {
        if (cartasElegidas.jugador.peso > cartasElegidas.maquina.peso) {
          // ATAQUE BLOQUEADO
          puntosJuego.resultadoBatalla({
            gana: 2,
          });
        } else if (
          cartasElegidas.jugador.peso === cartasElegidas.maquina.peso
        ) {
          // LA MAQUINA GANA LA RONDA SOBRE EL JUGADOR
          puntosJuego.resultadoBatalla({
            gana: 3,
            puntos: puntosJuego.jugador.apuesta,
          });
        } else if (cartasElegidas.jugador.peso < cartasElegidas.maquina.peso) {
          // LA MAQUINA GANA LA RONDA SOBRE EL JUGADOR
          puntosJuego.resultadoBatalla({
            gana: 3,
            puntos: puntosJuego.jugador.apuesta,
          });
        }
      } else if (
        cartasElegidas.jugador.tipo === "D" &&
        cartasElegidas.maquina.tipo === "D"
      ) {
        // RONDA QUEDA EN EMPATE
        puntosJuego.resultadoBatalla({
          gana: 2,
        });
      }

      console.log([cartasElegidas, rutasCartas.rutas]);

      puntosJuego.ronda++;
      marcador.ronda.innerHTML = puntosJuego.ronda;
      marcador.jugador.puntos.innerHTML = puntosJuego.jugador.puntos;
      marcador.jugador.apuesta.innerHTML = puntosJuego.jugador.apuesta;
      marcador.maquina.puntos.innerHTML = puntosJuego.maquina.puntos;
      marcador.maquina.apuesta.innerHTML = puntosJuego.maquina.apuesta;
      // console.log({marcado :marcador, puntosjuego: puntosJuego});

      if (
        puntosJuego.jugador.estado === 0 ||
        puntosJuego.maquina.estado === 0
      ) {
        if (puntosJuego.maquina.estado === 0) {
          alert("JUGADOR 2 HA GANADO EL JUEGO");
        }
        if (puntosJuego.jugador.estado === 0) {
          alert("JUGADOR 1 HA GANADO EL JUEGO");
        }

        location.reload();
      }
    }, 500);

    document
      .querySelector(".ladoIzquierdo img.opacity-0")
      .classList.remove("opacity-0");
    document
      .querySelector(".ladoDerecho img.opacity-0")
      .classList.remove("opacity-0");
    eleccionJugador1 = undefined;
    eleccionJugador2 = undefined;

    [rutasCartas.rutas, rutasCartas.peso] = desordenar([
      rutasCartas.rutas,
      rutasCartas.peso,
    ]);
  }, 3000);
}

document
  .querySelector(".logoJuego>h1")
  .addEventListener("dblclick", regresarPaginaPrincipal);

function regresarPaginaPrincipal() {
  // history.back()
  window.location.href = "./../";
}
