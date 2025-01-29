# Line Notify TS

Line Notfy の送信などを typescript でまとめてみた

## ライブラリ

```
npm install qs
npm install axios
```

## Function

- SendMessage
- checkToken

## Token

LINE Notify のトークン取得方法

[ここ](https://notify-bot.line.me/ja/)からアカウントを登録してトークンを取得

発行されたトークンをコピーして"main.js"を開き以下の you token においてね

```
const TOKEN = "you token";
```

## Usage

#### 送信

```
const message = "Hi, I am kayu0514 :)";
await notify.SendMessage(message, false);
```
