import React from 'react'
import Svg, { SvgXml, Path, SvgProps } from 'react-native-svg'

const logo = `
  const logo = 
  <svg xmlns="http://www.w3.org/2000/svg" width="68.424" height="54.739" viewBox="0 0 68.424 54.739">
  <path d="M66.713 47.9H58.16V12.129a5.217 5.217 0 0 0-5.132-5.287H41.054v6.842h10.264v41.055h15.4a1.71 1.71 0 0 0 1.711-1.711v-3.421a1.71 1.71 0 0 0-1.716-1.707zM33.382.108 12.855 5.426a3.523 3.523 0 0 0-2.592 3.439V47.9H1.711A1.71 1.71 0 0 0 0 49.607v3.421a1.71 1.71 0 0 0 1.711 1.711h35.922V3.547A3.45 3.45 0 0 0 33.382.108zm-5.157 30.683c-1.417 0-2.566-1.532-2.566-3.421s1.149-3.421 2.566-3.421 2.566 1.532 2.566 3.421-1.15 3.421-2.566 3.421z" style="fill:#ea4b9b"/>
</svg>
`

const svg = ({height}:SvgProps) => {
  const LogoSvg = () => <SvgXml xml={logo} height={height}/>;
  return <LogoSvg/>
}

export default svg;