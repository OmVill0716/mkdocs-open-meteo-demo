# MkDocs の説明ページから Swagger UI で天気 API を試す

「API の説明を読んだら、その場で自分の街の結果を見たい」。そんな小さなサイトを MkDocs と Swagger UI で作りました。題材は [Open-Meteo](https://open-meteo.com/) の地名検索と天気予報です。無料 API は非商用利用向けで、登録・API キーなしで試せます。回数制限と出典表示は[公式の利用条件](https://open-meteo.com/en/terms)に従います。

この記事で扱うサイトは Open-Meteo の非公式デモです。仕様と利用条件の正本は公式資料を参照してください。

## 完成形でできること

1. `Tokyo` や `Sapporo` を検索し、候補の緯度・経度を得る
2. その座標で予報 API を実行し、現在の気温と今日の最大降水確率を読む
3. MkDocs の説明から、ページ内の Swagger UI フォームを操作する

流れは `地名 → Geocoding API → 緯度・経度 → Forecast API → 天気` です。予報値は変わるため、記事には特定時点の気温を固定していません。

## 役割分担

ここは誤解しやすい点でした。**MkDocs は Markdown から説明ページ、ナビゲーション、検索、静的サイトを作る**部分を担当します。**Swagger UI は OpenAPI 定義から操作フォームを描画する**部分を担当します。OpenAPI 定義は、このデモで使う2操作だけを公式資料から抜き出して自作しました。

```text
mkdocs.yml
docs/
  index.md                  トップページ
  try-it.md                 操作手順と埋め込みフォーム
  swagger/index.html        Swagger UI の表示ページ
  openapi/weather-demo.yaml 2操作の OpenAPI 定義
  assets/swagger-demo.js    Swagger UI の初期化
  assets/vendor/swagger-ui/ Swagger UI の配布ファイルとライセンス
```

## MkDocs を起動する

このデモは MkDocs 1.6.1 と Swagger UI 5.34.0 で作りました。`mkdocs.yml` は小さく、ナビゲーションと検索を設定します。

```yaml
site_name: 自分の街の天気 API ラボ
theme:
  name: mkdocs
  locale: ja
plugins:
  - search
nav:
  - はじめに: index.md
  - Swagger で試す: try-it.md
```

```sh
python3 -m pip install 'mkdocs[i18n]==1.6.1'
python3 -m mkdocs serve
```

ローカルでは通常 `http://127.0.0.1:8000/` でプレビューできます。説明文を Markdown で直すと、開発サーバーがサイトを再構築します。公開用の静的ファイルは `python3 -m mkdocs build --strict` で生成・検証できます。

## 2つの API を OpenAPI に書く

[Geocoding API](https://open-meteo.com/en/docs/geocoding-api) は地名を検索し、[Weather Forecast API](https://open-meteo.com/en/docs) は座標から予報を返します。ホスト名が違うため、OpenAPI の各パスに `servers` を指定しました。以下は要点の抜粋です。

```yaml
openapi: 3.0.3
info:
  title: 自分の街の天気 API ラボ
  version: 0.1.0
paths:
  /v1/search:
    servers:
      - url: https://geocoding-api.open-meteo.com
    get:
      summary: 街を検索する
      parameters:
        - name: name
          in: query
          required: true
          schema: { type: string, default: Tokyo }
      responses:
        '200': { description: 地名候補 }
  /v1/forecast:
    servers:
      - url: https://api.open-meteo.com
    get:
      summary: 今日の天気を取得する
      parameters:
        - name: latitude
          in: query
          required: true
          schema: { type: number, default: 35.6895 }
        - name: longitude
          in: query
          required: true
          schema: { type: number, default: 139.69171 }
        - name: current
          in: query
          schema: { type: string, default: 'temperature_2m,precipitation' }
        - name: daily
          in: query
          schema: { type: string, default: 'temperature_2m_max,precipitation_probability_max' }
        - name: timezone
          in: query
          required: true
          schema: { type: string, default: auto }
        - name: forecast_days
          in: query
          schema: { type: integer, default: 1 }
      responses:
        '200': { description: 現在値と今日の予報 }
```

公式の Forecast OpenAPI 定義も[公開されています](https://github.com/open-meteo/open-meteo/blob/main/openapi/forecast.yml)。ここでは参加者が見る項目を絞るため、現行の公式資料と実際の応答を確認して小さな非公式定義にしました。全パラメータを網羅していません。

## Swagger UI をページ内に置く

`docs/swagger/index.html` で Swagger UI の CSS と JavaScript を読み、`docs/openapi/weather-demo.yaml` を指定します。このデモでは `swagger-ui-dist` の配布ファイルをサイトに同梱しています。

```html
<link rel="stylesheet" href="../assets/vendor/swagger-ui/swagger-ui.css">
<main id="swagger-ui"></main>
<script src="../assets/vendor/swagger-ui/swagger-ui-bundle.js"></script>
<script src="../assets/swagger-demo.js"></script>
```

```js
window.addEventListener('load', function () {
  SwaggerUIBundle({
    url: '../openapi/weather-demo.yaml',
    dom_id: '#swagger-ui',
    presets: [SwaggerUIBundle.presets.apis],
    layout: 'BaseLayout'
  });
});
```

MkDocs の `docs/try-it.md` には説明と iframe を書きます。生成後の URL を基準に、`../swagger/` がフォームのページを指します。

```html
<iframe src="../swagger/" title="Open-Meteo API を試す" loading="lazy"></iframe>
```

Qiita 記事自体に任意の Swagger UI iframe を埋め込む形にはせず、記事から MkDocs サイトへリンクする構成です。Qiita の[埋め込み可能なコンテンツの案内](https://qiita.com/Qiita/items/612e2e149b9f9451c144)でも、対象サービスが列挙されています。

## MkDocs を使う利点とチームでの広げ方

説明の元は `docs/*.md`、ページ順と検索の設定は `mkdocs.yml` に置きます。読み手はサイトのメニューや検索から操作手順と出典へ進めます。書き手は Markdown の差分をレビューし、`python3 -m mkdocs build --strict` で警告を確認できます。生成物の `site/` は静的ファイルなので、公開先を変えても元の説明ページと OpenAPI 定義を使えます。

この構成は、前身の OpenDrive API 非公式ノートで使った「利用フロー、出典、確認状態を結ぶ」書き方を小さな題材に移したものです。OpenDrive の仕様や実データはこの天気デモには含めていません。

このリポジトリには GitHub Pages 用の手動 Workflow と、Azure DevOps Services で同じ `site/` をビルド成果物にする手動 Pipeline 定義を用意しました。Azure Pipelines の成果物は公開サイトではありません。Azure 側でサイトとして使う場合は別途ホスティング先が必要です。チームの Wiki には Markdown を共有できますが、この Swagger UI 付きサイトと同じ表示にはなりません。

## 試し方と確認範囲

フォームで `GET /v1/search` を開き、地名を実行します。返った `latitude` と `longitude` を `GET /v1/forecast` に入力します。`current.temperature_2m` が現在の気温、`daily.precipitation_probability_max[0]` が今日の最大降水確率です。別の街でもう一度繰り返すと、同じフォームの使い回しが分かります。

`timezone=auto` なら座標に応じた現地の日付で予報を読めます。東京・札幌を比べたあと、海外の都市でも試せます。同名の地名が複数あるため、検索結果の国と地域を確認してから座標を選びます。

予報フォームの `forecast_days` を `3` にすれば日ごとの配列が3日分になり、`temperature_unit` を `fahrenheit` にすれば気温と単位が変わります。Swagger UI では入力値、送信 URL、応答を続けて確認できます。

2026年10月26日に、東京の地名検索と `timezone=auto` を使う予報 API から HTTP 200 と必要な項目が返ること、両エンドポイントがブラウザ向けの CORS ヘッダを返すことを確認しました。ユーザーが起動したローカルの MkDocs サイトを Chrome で開き、ページ内の Swagger UI から東京の2操作を Execute して HTTP 200 を確認しました。別画面では札幌の検索・予報と、3日分・華氏への変更も確認しました。幅390pxの別画面でも検索を実行でき、横スクロールはありませんでした。MkDocs の `build --strict` も通っています。公開 URL での表示と Execute は未検証です。

データ提供元は [Open-Meteo](https://open-meteo.com/) です。利用条件と出典表示は公式サイトを確認してください。
