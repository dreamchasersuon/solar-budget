export const $LIGHT_BLUE = '#0038FF';
export const $LIGHT_GREEN = '#24FF00';
export const $SILVER = '#939393';
export const $MEDIUMSILVER = '#C4C4C4';
export const $LIGHTSILVER = '#FDFDFD';
export const $TRANSPARENT = 'transparent';
export const $RED = '#EA0000';
export const $WHITE = 'white';
export const $BLACK_FADE = 'rgba(0,0,0,0.4)';
export const $BLACK = 'rgba(0,0,0,1)';

export const $DARK_GREY = '#3A3A3A';
export const $DARK_GREEN = '#4BBD5C';
export const $DARK_DARKGREY = '#2F2F2F';
export const $DARK_BLUE = '#0075FF';

// Purposes of payment colors
export const $SHAMROCK = '#2CCC9C';
export const $RIPE_LEMON = '#EDD819';
export const $BRANDY_PUNCH = '#D2902C';
export const $AZURE_RADIANCE = '#0075FF';
export const $BITTERSWEET = '#FF7070';
export const $AQUAMARINE = '#3DFFC5';
export const $ELECTRIC_VIOLET = '#8650F9';
export const $ORCHID = '#E045C7';
export const $CANARY = '#D3FF57';
export const $CRUSTA = '#FF7C32';
export const $GREEN_YELLOW = '#9AFF18';

const themes = {
  light: {
    background_bottom: $LIGHTSILVER,
    background_top: $WHITE,
    positive: $LIGHT_GREEN,
    accent: $LIGHT_BLUE,
    textMain: $BLACK
  },
  dark: {
    background_bottom: $DARK_DARKGREY,
    background_top: $DARK_GREY,
    positive: $DARK_GREEN,
    accent: $DARK_BLUE,
    text_main: $WHITE
  }
};

export default function mapColorsToTheme(theme) {
  return themes[theme];
}
