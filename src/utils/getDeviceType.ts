import { values } from '~/const/values'

/**
 * breakpointとウインドウサイズを比較してlgかsmか返します
 * @return string 'lg' or 'sm'
 */
const GetDeviceType = (): string => (window.innerWidth > values.BREAKPOINT ? 'lg' : 'sm')

export default GetDeviceType
