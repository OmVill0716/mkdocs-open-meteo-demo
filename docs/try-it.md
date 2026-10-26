# Swagger で試す

フォーム内の **Try it out → Execute** を押すと、実際の Open-Meteo API に GET リクエストを送ります。アカウントや API キーは不要ですが、無料 API は[非商用利用の条件と回数制限](https://open-meteo.com/en/terms)があります。入力した地名や座標と応答はブラウザ内の Swagger UI に表示されます。

まずは `Tokyo` で試し、次に `Sapporo` で同じ手順を繰り返すと、2都市の予報を比べられます。予報値は変わるので、数値を暗記する必要はありません。

データ提供元：[Open-Meteo](https://open-meteo.com/)。

## 1. 地名を検索する {#city-search}

下の `GET /v1/search` を開き、**Try it out** を押します。`name` に `Tokyo`、`Sapporo`、または調べたい街の名前を入力して **Execute** を押してください。応答の `results` から、目的の街の `latitude` と `longitude` を控えます。同名の地名が複数ある場合は `country` や `admin1` も確認してください。日本だけに絞るなら `countryCode` に `JP` を入力できます。

## 2. 緯度・経度で天気を取得する {#weather-forecast}

`GET /v1/forecast` を開き、**Try it out** を押して先ほどの `latitude` と `longitude` を入力し、**Execute** を押します。最初から入っている座標は東京都付近です。`timezone=auto` は座標から現地のタイムゾーンを選びます。`current.temperature_2m` が現在の気温、`daily.precipitation_probability_max[0]` が今日の最大降水確率です。時刻と単位は応答の `timezone`、`current_units`、`daily_units` を確認してください。

**もう1都市で遊ぶ:** 地名検索を `Sapporo` や `Paris` に変え、選んだ候補の座標で予報を再実行してください。`daily.temperature_2m_max[0]` と `daily.precipitation_probability_max[0]` を比べられます。

**条件を変えて遊ぶ:** `forecast_days` を `3` にすると `daily.time` が3日分になります。`temperature_unit` を `fahrenheit` にすると、気温と `current_units`・`daily_units` の単位が変わります。実行した後は入力値と応答の単位を一緒に見てください。

<p><a class="cta" href="../swagger/">Swagger UI を別画面で開く →</a></p>

<div class="api-frame-wrap">
  <iframe class="api-frame" src="../swagger/" title="Open-Meteo 地名検索・天気予報の Swagger UI" loading="eager" referrerpolicy="no-referrer"></iframe>
</div>

[OpenAPI 定義を見る](openapi/weather-demo.yaml)

## うまく表示されないとき

ローカルでは `python3 -m mkdocs serve` で起動したサイトから開いてください。フォームが狭い場合は上の「別画面で開く」を使えます。`results` がない場合は地名のつづりや検索範囲を見直してください。API がエラーを返した場合は、Swagger UI に表示される HTTP ステータスと応答本文を確認します。予報結果は更新されるため、表示例と数値が一致しなくても異常ではありません。
