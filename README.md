# 自分の街の天気 API ラボ

地名を検索し、その街の天気を API から取得する体験型のドキュメントです。MkDocs の説明ページにある Swagger UI から、アカウントや API キーなしで試せます。

**[公開サイトで試す](https://omvill0716.github.io/mkdocs-open-meteo-demo/try-it/)** · [サイトのトップへ](https://omvill0716.github.io/mkdocs-open-meteo-demo/)

## まずは3分で試す

1. 公開サイトの `GET /v1/search` を開き、**Try it out** → `name` に `Tokyo` → **Execute** を押します。
2. 応答の `results` から日本の東京を選び、`latitude` と `longitude` を見ます。同じ名前の別の場所も出るため、国と地域を確認してください。
3. `GET /v1/forecast` を開き、**Try it out** → 先ほどの座標を入力 → **Execute** を押します。`current.temperature_2m` で現在の気温、`daily.precipitation_probability_max[0]` で今日の最大降水確率を読めます。

次は `Sapporo` でも試してみてください。`forecast_days` を `3` にすると3日分の予報を取得できます。スマートフォンでフォームが狭いときは、ページ内の「Swagger UI を別画面で開く」を使えます。

**Execute はブラウザから Open-Meteo に実際の GET リクエストを送ります。** このサイトは非公式の学習用デモです。データ提供元と利用条件は[Open-Meteo の公式サイト](https://open-meteo.com/)と[無料 API の利用条件](https://open-meteo.com/en/terms)を確認してください。

## このリポジトリで分かること

- **MkDocs** が Markdown から説明ページ、メニュー、検索付きの静的サイトを作ります。
- **Swagger UI** が OpenAPI 定義から操作フォームを作り、2つの API をその場で試せるようにします。
- 生成した `site/` を GitHub Pages に公開しています。同じ成果物を別の静的サイト公開先へ渡す構成も示しています。

役割やチームでの更新方法は、サイト内の[MkDocs のしくみ](https://omvill0716.github.io/mkdocs-open-meteo-demo/mkdocs-workflow/)にまとめています。前身の `unofficial-opendrive-api-docs` とは独立したプロジェクトで、OpenDrive の資料や実データは含みません。

## 手元で動かす

Python 3 と Git が必要です。以下は macOS・Linux の例です。

```sh
git clone https://github.com/OmVill0716/mkdocs-open-meteo-demo.git
cd mkdocs-open-meteo-demo
python3 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python -m mkdocs serve
```

ブラウザで <http://127.0.0.1:8000/> を開きます。終了はターミナルで `Ctrl+C` です。公開用の静的サイトを生成・検証するには、仮想環境を有効にした状態で `python -m mkdocs build --strict` を実行します。

## ファイルの見どころ

| ファイル | 役割 |
| --- | --- |
| [`docs/try-it.md`](docs/try-it.md) | 操作手順とページ内フォーム |
| [`docs/openapi/weather-demo.yaml`](docs/openapi/weather-demo.yaml) | 地名検索と予報の2操作に絞った非公式 OpenAPI 定義 |
| [`docs/swagger/index.html`](docs/swagger/index.html)、[`docs/assets/swagger-demo.js`](docs/assets/swagger-demo.js) | Swagger UI の表示と初期化 |
| [`mkdocs.yml`](mkdocs.yml) | ページ順、テーマ、検索の設定 |
| [`.github/workflows/pages.yml`](.github/workflows/pages.yml) | GitHub Pages への手動デプロイ |
| [`azure-pipelines.yml`](azure-pipelines.yml) | Azure DevOps で `site/` を手動ビルドして成果物に保存 |

GitHub Pages と Azure の更新手順・確認範囲は [PUBLISHING.md](PUBLISHING.md) を参照してください。どちらも push だけでは実行されず、Azure の定義はサイト公開まで行いません。[Qiita 記事の下書き](qiita-draft.md)は未投稿です。

OpenAPI 定義は Open-Meteo の[予報](https://open-meteo.com/en/docs)と[地名検索](https://open-meteo.com/en/docs/geocoding-api)の公式資料を元にした**非公式の抜粋**で、API 全体を網羅しません。Swagger UI 5.34.0 は `docs/assets/vendor/swagger-ui/` に同梱し、[配布元](https://github.com/swagger-api/swagger-ui)の Apache License 2.0 とライセンス表示を同じディレクトリに収めています。検証した内容はサイトの[出典と確認範囲](https://omvill0716.github.io/mkdocs-open-meteo-demo/sources/)に記録しています。
