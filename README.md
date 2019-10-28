<h1 align="center">white-react</h1>

## 工程介绍
基于 React 全家桶搭建的工程化方案，该工程集成 路由、数据管理、国际化、Axios 为一体，旨在方便一键搭起 Web单页应用。

### 建设配置
- react-router-dom，以 React Suspense 和 lazy 组件实现路由懒加载
- redux、react-redux、redux-saga
  - 应用 saga 处理业务异步逻辑
  - 动态注入 reducer 和 saga
- intl、react-intl，国际化方案，将 key 存于 redux 中，通过更改 key 切换语言
- Axios， 封装 Axios 工具，通过 get、post 等方法请求，并统一处理请求返回 code

## 项目命令

### 安装项目依赖
```
npm install
```

### 启动项目
```
npm run start 或 npm run dev
```

### 构建项目
#### 构建哈希版 bundle
```
npm run build 或 npm run build:hash
```

#### 构建版本号 bundle
```
npm run build:version
```

### 分析、lint、测试
#### 分析
```
npm run analysis-build:hash // 哈希版 bundle
npm run analysis-build:version // 版本号 bundle
```

#### 语法检查 lint
```
npm run lint // 通过 eslint 检查 .js 语法
npm run lint:fix // 通过 eslint 检查并修复 .js 语法
npm run stylelint // 通过 stylelint 检查样式语法
npm run stylelint:fix //通过 stylelint 检查并修复样式语法
```

#### 测试
```
npm run test // 运行测试
npm run test:coverage // 运行测试并生成覆盖率文件
npm run test:clean // 清除测试生成的覆盖率文件
npm run test:watch // 启动监听文件更改，更改时重新运行测试
```

## git 提交
git 提交前将会校验并修复 eslint 和 stylelint，还会运行所有测试，校验不通过会阻止 git 提交

## 下一步计划
简化工程配置，让用户关注于业务
