import { BaseProps, h } from 'tsx-dom'

interface Props extends BaseProps {
  src: string
}

const HomeContent = ({ src }: Props) => {
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img src={src} className="logo vanilla" alt="TypeScript logo" />
      </a>
      <h1>Vite + TypeScript</h1>
      <div className="card">
        <button id="counter" type="button"></button>
      </div>
      <p className="read-the-docs">Click on the Vite and TypeScript logos to learn more</p>
    </div>
  )
}

export default HomeContent
