import {Dimensions} from 'react-native';

export const fonts = {
};

export const basicDimensions = { // 현재 작업하고 있는 XD파일 스크린의 세로,가로
  height: 812,
  width: 375,
};

export const height = (
  Dimensions.get('screen').height *
  (1 / basicDimensions.height)
).toFixed(2);

export const width = (
  Dimensions.get('screen').width *
  (1 / basicDimensions.width)
).toFixed(2);