# API の読み方

## 地名検索

`GET https://geocoding-api.open-meteo.com/v1/search` は地名から候補の座標を探します。`name` が必須で、`count`、`language`、`countryCode` を追加できます。このデモでは `name=Tokyo`、`count=3`、`language=ja` を初期値にしています。

候補が返ったら、地名だけで決めず、国と地域も見て `latitude` と `longitude` を選びます。出典: [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)。

## 天気予報

`GET https://api.open-meteo.com/v1/forecast` に緯度と経度を渡します。このデモでは `current=temperature_2m,precipitation`、`daily=temperature_2m_max,precipitation_probability_max`、`forecast_days=1` を使います。出典: [Open-Meteo Weather Forecast API](https://open-meteo.com/en/docs)。

| 応答の項目 | 読み方 |
| --- | --- |
| `current.time` | 現在値の対象時刻 |
| `current.temperature_2m` | 地上 2 m の気温 |
| `current.precipitation` | 現在値の降水量 |
| `daily.temperature_2m_max[0]` | 今日の最高気温 |
| `daily.precipitation_probability_max[0]` | 今日の最大降水確率 |

`current_units` と `daily_units` に単位が返ります。`timezone=auto` は入力した座標からタイムゾーンを決めます。応答の `timezone` と `daily.time[0]` を見れば、どの地域の「今日」を表示したか確認できます。

`forecast_days=3` で3日分を表示し、`temperature_unit=fahrenheit` で気温を華氏に変えることもできます。配列の添字は `daily.time` と対応します。たとえば `[1]` は2日目の値です。
