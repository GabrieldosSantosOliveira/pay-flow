module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      'inline-dotenv',
      [
        'module-resolver',
        {
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@routes': './src/routes',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@services': './src/services',
            '@assets': './src/assets',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
