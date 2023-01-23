import React from 'react'
import Svg, { SvgXml, Path } from 'react-native-svg'

const logo = `
  const logo = 
  <svg xmlns="http://www.w3.org/2000/svg" width="12.125" height="6.933" viewBox="0 0 12.125 6.933">
  <path d="M4.843 6.06.255 1.476a.863.863 0 0 1 0-1.224.874.874 0 0 1 1.227 0l5.2 5.195a.865.865 0 0 1 .025 1.195l-5.22 5.231a.867.867 0 0 1-1.229-1.224z" transform="rotate(90 6.063 6.063)" style="fill:rgba(240,77,159,.9)"/>
</svg>
`

const svg = () => {
  const LogoSvg = () => <SvgXml xml={logo}/>;
  return <LogoSvg/>
}

export default svg;
