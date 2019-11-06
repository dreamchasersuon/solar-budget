// eslint-disable-next-line import/no-commonjs,import/no-extraneous-dependencies
const { getDefaultConfig } = require('metro-config');

// eslint-disable-next-line import/no-commonjs
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  };
})();
