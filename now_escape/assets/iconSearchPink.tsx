import React from 'react'
import Svg, { SvgXml, Path, SvgProps } from 'react-native-svg'

const logo = `
  const logo = 
  <svg xmlns="http://www.w3.org/2000/svg" width="21.084" height="21.088" viewBox="0 0 21.084 21.088">
    <path d="m20.8 18.232-4.106-4.106a.988.988 0 0 0-.7-.288h-.674a8.562 8.562 0 1 0-1.483 1.483v.671a.988.988 0 0 0 .288.7l4.107 4.108a.984.984 0 0 0 1.4 0l1.165-1.165a.993.993 0 0 0 0-1.4zM8.566 13.837a5.271 5.271 0 1 1 5.271-5.271 5.268 5.268 0 0 1-5.271 5.271z" style="fill:#ea4b9b"/>
  </svg>
`

const svg = ({height}:SvgProps) => {
  const LogoSvg = () => <SvgXml xml={logo} height={height}/>;
  return <LogoSvg/>
}

export default svg;