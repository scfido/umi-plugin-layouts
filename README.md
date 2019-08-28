# 简介

这是一个[umi](https://umijs.org/)的插件示例，在umi项目中使用该插件后，自动在路由配置中加上插件中的layout。

## 使用

```sh

git clone https://github.com/scfido/umi-plugin-layouts
cd umi-plugin-layouts/umi-plugin-layouts
yarn
yarn build

# 注册库
yarn link

cd ../sample
yarn

# 链接本地的库
yarn link umi-plugin-layouts
yarn dev
```

## 配置插件

`sample/.umirc.js`中：

```js

export default {
  plugins: [
    ["umi-plugin-layouts",
      {
        layout: "admin"     //可选admin和default两个模板
      }
    ]
  ]
};

```
