const ENV = process.env.NODE_ENV;

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: ENV === 'test' ? 'auto' : false,
        useBuiltIns: "usage",
        corejs: 3
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ]
}
