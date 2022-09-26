import './Home.modules.scss'
import '~/commonScripts'

import HomeContent from '~/components/HomeContent/HomeContent'
import typescriptLogo from '~/images/typescript.svg'
import SetupCounter from '~/modules/SetupCounter'

const appElement = document.querySelector<HTMLDivElement>('#app')
appElement?.appendChild(HomeContent({ src: typescriptLogo }))

const counterElement = document.querySelector<HTMLButtonElement>('#counter')
if (counterElement) SetupCounter(counterElement)
