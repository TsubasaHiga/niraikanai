# Niraikanai

Niraikanai（ニライカナイ）はVite + Vanilla JSで静的サイトを構築する事を想定したボイラープレートです。

- 構成：Vanilla JS
- ビルドツール：Vite
- Node.js：`>=16.15.0`

## Feature

- 各種リンター及びフォーマッター（eslint,stylelint,prettier）の標準インストール
- 標準でサイト制作に便利なSass mixinをインストール
- MPA対応
- PostCSSプラグイン採用
- Vanilla JS
- `vite-plugin-handlebars`をインストール済みなのでhtmlにてHandlebarsの記述可

## 動作確認環境

``` bash
# macOS
$ sw_vers
ProductName:    macOS
ProductVersion: 12.5
BuildVersion:   21G72

$ node -v
v16.15.0

$ yarn -v
1.22.0

# Windows OS
$ ver
Microsoft Windows [Version 10.0.22622.590]

$ node -v
v16.15.0

$ yarn -v
1.22.18
```

## 始め方

### インストール

``` bash
yarn install
```

### 開発

``` bash
yarn dev
```

### ビルド

``` bash
yarn build
```
