import './Home.modules.scss'

import HomeContent from '~/components/HomeContent/HomeContent'
import typescriptLogo from '~/images/typescript.svg'
import { setupCounter } from '~/modules/counter'

const appElement = document.querySelector<HTMLDivElement>('#app')
appElement?.appendChild(HomeContent({ src: typescriptLogo }))

const counterElement = document.querySelector<HTMLButtonElement>('#counter')
if (counterElement) setupCounter(counterElement)
