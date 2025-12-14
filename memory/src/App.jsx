import { useEffect, useRef, useState } from "react"
import Brain_SVG from "../public/Brain_SVG_Design-2.png"
import CSS from "../public/css3-brands-solid-full.svg"
import GamerOver from "../public/GamerOver.png"
import HTML from "../public/html5-brands-solid-full.svg"
import Java from "../public/java-brands-solid-full.svg"
import Node from "../public/node-brands-solid-full.svg"
import JS from "../public/node-js-brands-solid-full.svg"
import React from "../public/React-brands-solid-full.svg"
import Winner from "../public/Winner.png"
import Styles from "../src/App.module.css"
import ButtonsTheme from "./ButtonTheme"

function App() {
  // Estados
  const [Open, SetOpen] = useState([])
  const [Data, SetData] = useState([])
  const DataImages = [CSS, HTML, Java, Node, JS, React]
  const [Movimientos, SetMoves] = useState(0)
  const [Estado, SetEstado] = useState(null)
  const [ShowBanner, SetBanner] = useState(false)
  const [InitGame, SetGame] = useState(0)
  const timerRef = useRef(null)

  // Inicializar cartas
  useEffect(() => {
    const Filter = DataImages.flatMap((img, i) => [
      { id: i * 2, src: img, flipped: false, matched: false },
      { id: i * 2 + 1, src: img, flipped: false, matched: false }
    ])
    SetData(Filter)
  }, [])

  // Chequear victoria
  useEffect(() => {
    const matchedCards = Data.filter(e => e.matched === true)
    if (Data.length > 0 && matchedCards.length === Data.length) {
      clearInterval(timerRef.current)
      SetBanner(true)
      SetEstado(true)
    }
  }, [Data])

  // Manejar clic en carta
  function DatosCheck(itemid) {
    /*Si hay mas de 2 cartas abiertas el evento se cancela*/
    if (Open.length >= 2) { return }
    SetOpen(prev => [...prev, itemid])
    SetMoves(prev => prev + 1)

    const DataInfo = Data.map(e =>
      e.id === itemid ? { ...e, flipped: true } : e
    )
    SetData(DataInfo)
  }

  // Comparar cartas abiertas
  useEffect(() => {
    if (Open.length === 2) {
      const [firstId, secondId] = Open
      const n1 = Data.find(e => e.id === firstId)
      const n2 = Data.find(e => e.id === secondId)

      if (n1 && n2 && n1.src === n2.src) {
        const DataInfo = Data.map(e =>
          e.id === firstId || e.id === secondId
            ? { ...e, flipped: true, matched: true }
            : e
        )
        SetData(DataInfo)
        SetOpen([])
      } else {
        setTimeout(() => {
          const DataInfo = Data.map(e =>
            e.id === firstId || e.id === secondId
              ? { ...e, flipped: false }
              : e
          )
          SetData(DataInfo)
          SetOpen([])
        }, 700)
      }
    }
  }, [Open, Data])

  // Iniciar juego
  function StarGame() {
    /*Elimina el timer */
    clearInterval(timerRef.current)
    SetBanner(false)
    SetEstado(null)
    SetMoves(0)
    SetOpen([])
    SetGame(100)

    /*Iniciliza el timer */
    timerRef.current = setInterval(() => {
      SetGame(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          SetBanner(true)
          SetEstado(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const Filter = DataImages.flatMap((img, i) => [
      { id: i * 2, src: img, flipped: false, matched: false },
      { id: i * 2 + 1, src: img, flipped: false, matched: false }
    ]).sort(() => Math.random() - 0.5)

    SetData(Filter)
  }

  // Funcion para manejar timer
  function formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().slice(14, 19);
  }

  return (
    <main className={Styles.Main_Container}>
      {/* Banner de victoria - derrota */}
      <div className={ShowBanner ? Styles.Display_State : Styles.No_Display}>
        <div className={Styles.Box}>

          {Estado ? (
            <>
              <img src={Winner} alt="" />
              <p>🎉 ¡Ganaste! 🎉</p>

            </>
          ) : (<>

            <img src={GamerOver} alt="" />
            <p>Perdiste 😢</p>

          </>)}

          <button onClick={StarGame}><i className="fa-solid fa-arrow-rotate-right"></i>Play Again</button>

        </div>
      </div>

      {/* Estado del juego */}
      <div className={Styles.Div_Estado}>
        <span><i className="fa-solid fa-bolt"></i> {Movimientos} Moves </span>
        <span><i className="fa-solid fa-hourglass-half"></i>{formatTime(InitGame)}</span>
        <button onClick={StarGame} className={Styles.Reset_Button}><i className="fa-solid fa-arrow-rotate-right"></i>New Game</button>
        <ButtonsTheme />
      </div>

      {/* Tablero */}
      <article>
        {Data.map((img, index) => (
          <div key={index} className={Styles.Container_Carts}>
            {img.matched ? (
              <div className={Styles.matched_Carts}>
                <img src={img.src} alt="" />
              </div>
            ) : (


              <>

                {img.flipped ? (
                  <div className={Styles.Fronted} >
                    <img src={img.src} alt="" />
                  </div>
                ) : (
                  <>
                    <div className={Styles.display} onClick={
                      InitGame
                        ? () => {
                          DatosCheck(img.id)
                        }
                        : undefined
                    }>
                      <img src={Brain_SVG} alt="" />

                    </div>
                  </>
                )}
              </>

            )}
          </div>
        ))}
      </article>
    </main>
  )
}

export default App
