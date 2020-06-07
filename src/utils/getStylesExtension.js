export function getStylesExtension(type) {
  switch (type) {
    case 'stylus':
      return 'styl';
    default:
      return type.toLowerCase();
  }
}
