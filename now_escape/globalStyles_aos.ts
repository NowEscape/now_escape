import {Dimensions} from 'react-native';

export const fonts = {
  Pretendard: 'Pretendard-Bold'
};

export const basicDimensions = { // 현재 작업하고 있는 XD파일 스크린의 세로,가로
  height: 640,
  width: 360,
};

export const aosHeight = (
  Dimensions.get('window').height *
  (1 / basicDimensions.height)
).toFixed(2);

export const aosWidth = (
  Dimensions.get('window').width *
  (1 / basicDimensions.width)
).toFixed(2);