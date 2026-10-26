# 出典と確認範囲

このサイトは Open-Meteo の非公式デモです。API の仕様と利用条件は公式資料を優先してください。

- [Weather Forecast API の公式資料](https://open-meteo.com/en/docs)
- [Geocoding API の公式資料](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo が公開する Forecast OpenAPI 定義](https://github.com/open-meteo/open-meteo/blob/main/openapi/forecast.yml)
- [利用条件とクレジット](https://open-meteo.com/)
- [無料 API の利用条件と回数制限](https://open-meteo.com/en/terms)

`openapi/weather-demo.yaml` は、このデモの2操作に絞って公式資料から作成した非公式定義です。2026年10月25日に `Tokyo` の地名検索と東京の予報について、HTTP 200 と必要な応答項目を確認しました。

2026年10月26日に直接の GET を再実行し、地名検索と `timezone=auto` を使う東京の予報が HTTP 200、必要な JSON 項目と `Access-Control-Allow-Origin: *` を返すことを確認しました。さらに、ローカルの MkDocs サイトを Chrome で開き、ページ内の Swagger UI から東京の地名検索と予報を Execute して両方 HTTP 200 を確認しました。別画面では札幌の検索と予報も HTTP 200 で、3日分と華氏への変更が応答に反映されました。幅390pxでは別画面の検索を実行でき、横スクロールもありませんでした。

同日の[公開サイト](https://omvill0716.github.io/mkdocs-open-meteo-demo/)でも、ページ内フォームから東京の検索・予報が HTTP 200 でした。別画面では東京・札幌の検索と予報が HTTP 200、札幌の3日分・華氏が応答に反映されることを確認しました。幅390pxの別画面から検索を実行でき、横スクロールはありませんでした。

Open-Meteo の無料 API は非商用利用向けで、登録・API キーは不要です。2026年10月26日に公式の[利用条件](https://open-meteo.com/en/terms)で、1分あたり600回未満、1時間あたり5,000回未満、1日あたり10,000回未満の上限と CC BY 4.0 に基づく出典表示を再確認しました。[予報](https://open-meteo.com/en/docs)と[地名検索](https://open-meteo.com/en/docs/geocoding-api)の公式資料も同日に再確認しました。条件は変更され得るため、利用時には公式サイトを確認してください。天気予報の数値は随時変わります。
