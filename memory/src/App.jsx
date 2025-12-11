import { useEffect, useState } from "react"
import CSS from "../public/css3-brands-solid-full.svg"
import HTML from "../public/html5-brands-solid-full.svg"
import Java from "../public/java-brands-solid-full.svg"
import Node from "../public/node-brands-solid-full.svg"
import JS from "../public/node-js-brands-solid-full.svg"
import Question from "../public/question-solid-full.svg"
import React from "../public/React-brands-solid-full.svg"
import Styles from "../src/App.module.css"

function App() {
  /*Estados */
  const [Open, SetOpen] = useState([])
  const [Data, SetData] = useState([])
  const DataImages = [CSS, HTML, Java, Node, JS, React]
  const [counter, SetCounter] = useState(0)

  useEffect(() => {
    /*Duplicar y reeubicar las cartas */
    const Filter = DataImages.flatMap((img, i) => [
      { id: i * 2, src: img, flipped: false, matched: false },
      { id: i * 2 + 1, src: img, flipped: false, matched: false }
    ]).sort(() => Math.random() - 0.5)

    SetData(Filter);

  }, []);



  function NewGane(params) {

    /*Empezar una nueva partida*/
    const Filter = DataImages.flatMap((img, i) => [
      { id: i * 2, src: img, flipped: false, matched: false },
      { id: i * 2 + 1, src: img, flipped: false, matched: false }
    ]).sort(() => Math.random() - 0.5)

    SetData(Filter);

    SetCounter(0)
  }


  function DatosCheck(itemid) {
    /*Deter el evento si hay 2 cartas abiertas*/
    if (Open.length == 2) {
      return
    }
    /* Si la carta existe cambiar a true el flipped*/
    const id = []
    id.push(itemid)
    const DataInfo = Data.map(e =>
      e.id === itemid ? { ...e, flipped: true } : e
    )
    SetData(DataInfo)
  }

  useEffect(() => {
    /*Validar si las cartas volteadas con iguales */
    if (Open.length === 2) {
      const [firstId, secondId] = Open
      const n1 = Data.find(e => e.id === firstId)
      const n2 = Data.find(e => e.id === secondId)

      if (n1 && n2 && n1.src === n2.src) {
        /* Si la carta existe cambiar a true el flipped y el matched*/
        const DataInfo = Data.map(e =>
          e.id === firstId || e.id === secondId
            ? { ...e, flipped: true, matched: true }
            : e
        )
        SetData(DataInfo)
        SetCounter(prev => prev + 1)
        SetOpen([])
      } else {
        /*Temporisador para el cambo de las cartas */
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




  return (
    <main className={Styles.Main_Container}>

      <div className={Styles.Div_Estado}>
        <button onClick={() => NewGane()}>New game</button>
        {counter == 6 ? (<strong><span>Has ganado!! <i className="fa-solid fa-face-smile-beam"></i></span></strong>) : (<></>)}
      </div>

      <article>
        {Data.flatMap((img, index) => (
          <div key={index} className={Styles.Container_Carts}>
            {img.matched ? (<>

              <div className={Styles.display}>
                <img src={img.src} alt="" />
              </div>

            </>) : (<>
              <div onClick={() => { DatosCheck(img.id), SetOpen((prev) => [...prev, img.id]) }}>
                <div className={Styles.display}>
                  {img.flipped ? (<>

                    <img src={img.src} alt="" />
                  </>) : (<>

                    <img src={Question} alt="" />
                  </>)}
                </div>
              </div>

            </>)}
          </div>
        ))}
      </article>
    </main>
  )
}

export default App
