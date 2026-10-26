# 自分の街の天気 API ラボ

<div class="hero">
  <p class="eyebrow">MKDOCS × SWAGGER UI × OPEN-METEO</p>
  <p class="hero-lead">地名を入力して、今日の天気を API から取得しよう。</p>
  <p>非商用の学習利用ならアカウントや API キーは不要です。初めて Swagger を触る人も、フォームの「Try it out」から試せます。</p>
  <p><a class="cta" href="try-it/">3分で試す →</a></p>
</div>

## 何ができる？

1. [地名検索](try-it.md#city-search)で、自分の街の緯度・経度を取得します。
2. [天気予報](try-it.md#weather-forecast)にその値を入力して、現在の気温と今日の予報を取得します。
3. 東京と札幌など、2都市の結果を比較してみましょう。

気温などの数値は毎回変わります。[無料 API の利用条件](https://open-meteo.com/en/terms)を確認し、短時間に繰り返し実行しないでください。

<div class="flow" role="img" aria-label="地名を検索し、返された緯度と経度を天気予報 API に渡して、気温と降水確率を読む">
  <span>街の名前</span><b>→</b><span>地名検索 API</span><b>→</b><span>緯度・経度</span><b>→</b><span>予報 API</span><b>→</b><span>気温・降水確率</span>
</div>

## この形で解決すること

API の手順、操作フォーム、出典が別々の場所にあると、読む人は行き来が必要になり、更新する人は説明と動作の確認範囲を追いにくくなります。このデモでは、次のように1つのサイトへまとめています。

- **探せる:** 手順、API の読み方、出典をページに分け、メニューと検索からたどれます。
- **その場で試せる:** 説明ページから Swagger UI を開き、入力値・送信 URL・実際の応答を確認できます。
- **更新を共有できる:** Markdown と OpenAPI 定義の変更をレビューし、確認済みの静的サイトを公開できます。

## このデモの構成

MkDocs が Markdown の説明、ナビゲーション、検索、静的サイト生成を担当します。ページ内の操作フォームは、別途組み込んだ Swagger UI が OpenAPI 定義から表示します。フォームで Execute を押すと、ブラウザから Open-Meteo に直接リクエストします。

このサイトは非公式の学習用デモです。データ提供元は [Open-Meteo](https://open-meteo.com/) です。

OpenAPI・Swagger UI の役割、他のサイト生成ツールとの比較、チームでの更新方法は [MkDocs のしくみ](mkdocs-workflow.md) にまとめました。
