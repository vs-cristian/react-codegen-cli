import { StyleFormats } from '../types/types';

export function getStylesExtension(type: StyleFormats) {
  const styleFormat = type.toLowerCase();

  if (styleFormat === 'stylus') return 'styl';
  return styleFormat;
}
