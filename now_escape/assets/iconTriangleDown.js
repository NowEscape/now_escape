import React from 'react'
import Svg, { SvgXml, Path } from 'react-native-svg'

const logo = `
  const logo = 
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8">
    <path d="M5.871 1.29a1.5 1.5 0 0 1 2.258 0l3.694 4.222A1.5 1.5 0 0 1 10.694 8H3.306a1.5 1.5 0 0 1-1.129-2.488z" transform="rotate(180 7 4)" style="fill:#ea4b9b"/>
  </svg>
`

const svg = () => {
  const LogoSvg = () => <SvgXml xml={logo}/>;
  return <LogoSvg/>
}

export default svg;
