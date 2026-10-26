# MkDocs のしくみ

このサイトは、Markdown を編集してから静的な HTML を生成する構成です。地名検索と予報の説明、ナビゲーション、検索は MkDocs がまとめ、操作フォームは同梱した Swagger UI が表示します。API の値は Open-Meteo からブラウザへ直接返ります。

## このデモの選定条件

- 手順・API の読み方・出典を Markdown で分けて書き、メニューと検索から探せること。
- 地名検索と予報の2操作をブラウザ上で実行できること。
- 生成した静的サイトを GitHub Pages に置き、同じ原稿を別の公開先にも使えること。

## OpenAPI と Swagger UI の役割

[OpenAPI 3.0.3](https://spec.openapis.org/oas/v3.0.3.html) は HTTP API の操作や入出力を記述する仕様です。このデモでは `docs/openapi/weather-demo.yaml` に必要な2操作だけを書いています。[Swagger UI](https://swagger.io/open-source/swagger-ui/) はその定義から入力フォームを表示し、ブラウザから API を実行します。手順・出典・検索をまとめるサイトは MkDocs が生成します。

## サイト生成ツールを比較する

### [MkDocs](https://www.mkdocs.org/)（採用）

- **メリット:** Markdown と `mkdocs.yml` でページを構成でき、検索プラグインと静的 HTML 出力を使えます。現在の Python 環境で説明サイトを作れます。
- **デメリット（今回）:** API を実行するフォームは別途必要です。このデモでは OpenAPI 定義と Swagger UI のファイルも管理します。

### [Docusaurus](https://docusaurus.io/docs/)

- **メリット:** Markdown/MDX と React の部品を使え、文書のバージョン管理にも対応します。画面を大きく作り込む場合に選択肢になります。
- **デメリット（今回）:** Node.js のビルド環境が必要です。この5ページのデモでは React 部品やバージョン管理を使わず、現在の Python 構成に追加の環境が増えます。

### [Sphinx](https://www.sphinx-doc.org/en/master/)

- **メリット:** 文書間の相互参照、PDF を含む複数形式への出力、コードからの API 文書生成に対応します。
- **デメリット（今回）:** 標準の原稿は reStructuredText で、Markdown を使うには MyST などの拡張が必要です。このデモでは HTML 公開が中心で、これらの機能を使いません。

この判断は公式資料とこのリポジトリの要件に基づきます。Docusaurus と Sphinx に同じサイトを移植して、表示やビルド時間を実測した比較ではありません。MkDocs が説明ページを、Swagger UI が API 操作を担当する構成を選びました。

## 1つの原稿からサイトを作る

| 編集するもの | このデモでの役割 |
| --- | --- |
| `docs/*.md` | 読み方、操作手順、出典を書く |
| `mkdocs.yml` | ページ順、テーマ、検索を設定する |
| `docs/openapi/weather-demo.yaml` | Swagger UI に表示する2操作を定義する |
| `docs/swagger/index.html` | 操作フォームをページ内や別画面で開けるようにする |
| `site/` | MkDocs が生成する公開用ファイル。直接編集しない |

たとえば[操作手順](try-it.md)の文章を直して `python3 -m mkdocs serve` でプレビューすると、更新されたページを確認できます。新しい Markdown ページを追加する場合は `mkdocs.yml` の `nav` に載せれば、サイトのメニューにも入ります。検索は MkDocs の `search` プラグインが生成します。

## チームで更新するとき

1. `docs/` の対象ページを直し、API の説明を変える場合は[公式資料](sources.md)と確認日を記録します。
2. `python3 -m mkdocs build --strict` を実行し、リンクや設定の警告がないか確認します。
3. 変更差分と生成サイトをレビューし、確認できたことと未検証のことを分けて書きます。
4. 承認した版の `site/` を公開先へ配置します。公開先が変わっても、Markdown と OpenAPI 定義を編集する場所は同じです。

`--strict` は MkDocs の警告をビルド失敗として扱います。ただし、外部リンクの到達性や Swagger UI からの実通信まで保証するものではありません。

## 公開先を変えるとき

GitHub Pages や Azure の静的サイト公開先には、同じ `site/` の中身を配置できます。Azure DevOps の Wiki は Markdown を共有する別の表示方式で、このサイトのナビゲーションや Swagger UI をそのまま表示する公開先ではありません。

比較の参照元：[OpenAPI 3.0.3](https://spec.openapis.org/oas/v3.0.3.html)、[Swagger UI](https://swagger.io/open-source/swagger-ui/)、[MkDocs](https://www.mkdocs.org/)、[Docusaurus](https://docusaurus.io/docs/)、[Sphinx](https://www.sphinx-doc.org/en/master/)。
