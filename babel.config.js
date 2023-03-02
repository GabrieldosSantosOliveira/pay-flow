module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@routes": "./src/routes",
            "@contexts": "./src/contexts",
            "@hooks": "./src/hooks",
            "@services": "./src/services",
          },
        },
      ],
    ],
  };
};
