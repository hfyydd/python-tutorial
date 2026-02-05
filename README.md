# Python学习教程

一个简洁美观的Python入门教程网站，复刻廖雪峰教程风格。

## 部署到Vercel

### 方法一：通过Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel

# 在项目目录下运行
vercel
```

### 方法二：通过Git仓库

1. 将代码推送到GitHub仓库
2. 访问 [vercel.com](https://vercel.com)
3. 点击 "Import Project"
4. 选择你的GitHub仓库
5. 点击 "Deploy"

### 方法三：直接拖拽

1. 访问 [vercel.com/new](https://vercel.com/new)
2. 将整个项目文件夹拖拽到页面上

## 项目结构

```
python_learning/
├── index.html          # 首页
├── vercel.json         # Vercel配置
├── package.json        # 项目配置
└── chapters/           # 教程章节
    ├── install.html
    ├── first-step.html
    ├── basics.html
    ├── data-types.html
    ├── conditions.html
    └── loops.html
```

## 本地预览

```bash
# 使用Python启动本地服务器
python -m http.server 3000

# 或使用Node.js
npx serve
```

然后访问 http://localhost:3000
