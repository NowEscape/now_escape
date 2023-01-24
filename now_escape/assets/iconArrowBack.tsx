import React from 'react'
import Svg, { SvgXml, Path } from 'react-native-svg'

const logo = `
  const logo = 
  <svg xmlns="http://www.w3.org/2000/svg" width="8.93" height="15.2" viewBox="0 0 8.93 15.2">
    <path d="M5.841 7.309.307 1.78a1.041 1.041 0 0 1 0-1.48 1.054 1.054 0 0 1 1.48 0l6.27 6.269a1.043 1.043 0 0 1 .03 1.441l-6.3 6.309a1.045 1.045 0 0 1-1.48-1.476z" transform="rotate(180 4.34 7.436)" style="stroke:#000;stroke-width:.5px" style="fill:#000000"/>
  </svg>

`

const svg = () => {
  const LogoSvg = () => <SvgXml xml={logo}/>;
  return <LogoSvg/>
}

export default svg;