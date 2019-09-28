/**
 * 工具、方法
 */

const path = require('path');
const pkg = require('../package.json');

exports.pathResolve = (relativePath) => path.resolve(__dirname, '..', relativePath);

// 生成输出资源名称
exports.generateName = (type, suffix) => {
  if (!suffix) {
    suffix = type;
  }
  const projectVer = pkg.version;
  let outputName = `static/${type}/[name].[contenthash].${suffix}`;

  if (process.env.npm_config_isVersion) {
    outputName = `static/${projectVer}/${type}/[name].${suffix}`;
  }

  return outputName;
}
