import '~/commonScripts'

import ExampleContent from '~/components/ExampleContent/ExampleContent'

const appElement = document.querySelector<HTMLDivElement>('#app')
appElement?.appendChild(ExampleContent())
