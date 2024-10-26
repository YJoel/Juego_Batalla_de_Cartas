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
  rutaPorDefecto: "./recursosJuego/LogoCarta.jpg",
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

const jugadorMaquina = new Maquina(
  document.querySelectorAll(".ladoIzquierdo>.fila>img").length
);

const cartasIzquierda = document.querySelectorAll(".ladoIzquierdo>.fila>img");
const cartasDerecha = document.querySelectorAll(".ladoDerecho>.fila>img");

cartasDerecha.forEach((elemento, indice, array) => {
  array[indice].addEventListener("click", () => {
    if (document.querySelector(".ladoDerecho>.fila>img.move") !== null) {
      document
        .querySelector(".ladoDerecho>.fila>img.move")
        .classList.remove("move");
    }
    array[indice].className = "move";

    let eleccionMaquina = jugadorMaquina.elegirCarta();
    cartasIzquierda[eleccionMaquina].className = "move";

    console.log(rutasCartas.rutas)
    array[indice].src = rutasCartas.rutas[indice][0];
    cartasIzquierda[eleccionMaquina].src =
      rutasCartas.rutas[eleccionMaquina][0];

    let cartasElegidas = {
      jugador: {
        tipo: rutasCartas.rutas[indice][1],
        peso: rutasCartas.peso[indice],
      },
      maquina: {
        tipo: rutasCartas.rutas[eleccionMaquina][1],
        peso: rutasCartas.peso[eleccionMaquina],
      },
    };

    setTimeout(() => {
      array[indice].src = rutasCartas.rutaPorDefecto;
      cartasIzquierda[eleccionMaquina].src = rutasCartas.rutaPorDefecto;

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
          } else if (
            cartasElegidas.jugador.peso < cartasElegidas.maquina.peso
          ) {
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
          } else if (
            cartasElegidas.jugador.peso < cartasElegidas.maquina.peso
          ) {
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
          } else if (
            cartasElegidas.jugador.peso < cartasElegidas.maquina.peso
          ) {
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

        console.log([cartasElegidas, rutasCartas.rutas])

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
            alert("HAS GANADO EL JUEGO! FELICITACIONES ;)");
          }
          if (puntosJuego.jugador.estado === 0) {
            alert(
              "HAS PERDIDO EL JUEGO! VUELVE Y DA LO MEJOR DE TÍ, VAMOOOOOOOOS!!"
            );
          }

          location.reload();
        }
      }, 500);

      array[indice].classList.remove("move");
      cartasIzquierda[eleccionMaquina].classList.remove("move");

      [rutasCartas.rutas, rutasCartas.peso] = desordenar([rutasCartas.rutas, rutasCartas.peso]);
    }, 3000);
  });
});

document.querySelector(".logoJuego>h1").addEventListener("dblclick", regresarPaginaPrincipal)

function regresarPaginaPrincipal(){
  // history.back()
  window.location.href = "./../"
}
