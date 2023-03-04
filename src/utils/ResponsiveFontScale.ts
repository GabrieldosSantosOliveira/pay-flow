import { PixelRatio } from 'react-native';
export const ResponsiveFontScale = (size: number) => {
  const fontScale = PixelRatio.getFontScale();
  return PixelRatio.roundToNearestPixel(size * fontScale);
};
