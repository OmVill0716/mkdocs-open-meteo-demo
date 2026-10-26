# 自分の街の天気 API ラボ

MkDocs の Markdown ページから、Swagger UI で Open-Meteo の地名検索と天気予報を試す小さな非公式デモです。Open-Meteo とは無関係です。

このデモは、前身の `unofficial-opendrive-api-docs` で使った「利用手順・出典・確認状態を MkDocs でまとめる」構成を、公開 API の小さな題材で示します。OpenDrive の API 資料や実データは含めていません。[MkDocs のしくみ](docs/mkdocs-workflow.md)では、原稿から検索付きサイトを生成し、チームで更新する流れを説明します。

## 起動

```sh
python3 -m pip install -r requirements.txt
python3 -m mkdocs serve
```

表示先は通常 <http://127.0.0.1:8000/> です。静的サイトの検証は `python3 -m mkdocs build --strict` で行います。

地名検索 → 緯度・経度 → 天気予報の順に試してください。フォームの「Execute」は実際の Open-Meteo API へ GET 要求を送ります。無料 API は非商用利用向けで、登録・API キーは不要です。回数制限と出典表示の条件は [Open-Meteo の利用条件](https://open-meteo.com/en/terms)を確認してください。

`docs/openapi/weather-demo.yaml` は公式 API 資料を元に、このデモに必要な操作だけを記述した**非公式の抜粋**です。Open-Meteo の全機能を表すものではありません。Swagger UI 5.34.0 のファイルは `docs/assets/vendor/swagger-ui/` に同梱しています。

同梱ファイルの配布元は [swagger-ui-dist](https://github.com/swagger-api/swagger-ui) です。Apache License 2.0 の本文と配布物のライセンス表示は同じディレクトリに収めています。

Qiita 記事の下書きは [qiita-draft.md](qiita-draft.md) です。公開前にサイトの表示と API の応答を再確認してください。

GitHub Pages に手動デプロイする Workflow と、Azure Pipelines で `site/` を成果物にする定義を用意しました。公開前の確認事項は [PUBLISHING.md](PUBLISHING.md) にまとめています。どちらも push だけでは起動しません。

別セッションで続ける場合は、まず [AGENTS.md](AGENTS.md) の未検証事項を確認してください。

## ファイル

```text
mkdocs.yml                  MkDocs のナビゲーションと検索
docs/*.md                   説明ページ
docs/openapi/weather-demo.yaml  Swagger UI に渡す OpenAPI 定義
docs/swagger/index.html     Swagger UI の表示ページ
docs/assets/vendor/swagger-ui/ 同梱した Swagger UI
qiita-draft.md              Qiita 記事の下書き
azure-pipelines.yml         Azure DevOps Services の手動ビルド定義
```
