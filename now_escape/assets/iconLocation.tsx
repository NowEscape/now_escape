import React from 'react'
import Svg, { SvgXml, Path, SvgProps } from 'react-native-svg'

const logo = `
const logo = 
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="50" viewBox="0 0 8.488 12.125">
  <path d="M11.744 3A4.241 4.241 0 0 0 7.5 7.244c0 3.183 4.244 7.881 4.244 7.881s4.244-4.7 4.244-7.881A4.241 4.241 0 0 0 11.744 3zm0 5.759a1.516 1.516 0 1 1 1.516-1.516 1.516 1.516 0 0 1-1.516 1.516z" transform="translate(-7.5 -3)" style="fill:#ea4b9b"/>
</svg>
`

const svg = ({height}:SvgProps) => {
  const LogoSvg = () => <SvgXml xml={logo} height={height}/>;
  return <LogoSvg/>
}

export default svg;