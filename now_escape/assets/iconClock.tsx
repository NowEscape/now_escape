import React from 'react'
import Svg, { SvgXml, Path, SvgProps } from 'react-native-svg'

const logo = `
  const logo = 
  <svg xmlns="http://www.w3.org/2000/svg" width="14.482" height="14.482" viewBox="0 0 14.482 14.482">
    <path d="M7.8.563A7.241 7.241 0 1 0 15.044 7.8 7.24 7.24 0 0 0 7.8.563zm1.67 10.221L6.9 8.913a.353.353 0 0 1-.143-.283V3.716a.351.351 0 0 1 .35-.35H8.5a.351.351 0 0 1 .35.35v4.02l1.854 1.349a.35.35 0 0 1 .076.491l-.823 1.133a.353.353 0 0 1-.487.075z" transform="translate(-.563 -.563)" style="fill:#ea4b9b"/>
  </svg>

`

const svg = ({height}:SvgProps) => {
  const LogoSvg = () => <SvgXml xml={logo} height={height}/>;
  return <LogoSvg/>
}

export default svg;