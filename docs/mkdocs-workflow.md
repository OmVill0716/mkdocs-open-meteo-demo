# MkDocs のしくみ

このサイトは、Markdown を編集してから静的な HTML を生成する構成です。地名検索と予報の説明、ナビゲーション、検索は MkDocs がまとめ、操作フォームは同梱した Swagger UI が表示します。API の値は Open-Meteo からブラウザへ直接返ります。

## README・Swagger UI・Qiita 記事との役割の違い

| 資料・道具 | このプロジェクトでの役割 | MkDocs サイトで加えるもの |
| --- | --- | --- |
| README | リポジトリの入口とローカル起動方法を案内する | 手順、API の読み方、出典を別ページに整理し、メニューと検索で探せるようにする |
| Swagger UI | OpenAPI 定義から入力フォームを表示し、API を実行する | 地名検索から予報へ進む順番、応答の読み方、確認範囲を文章で説明する |
| Qiita 記事（下書き） | デモの狙いと作り方を紹介する | 実際に操作する場所と、更新できる詳しい手順・出典を置く |

この組み合わせで、読む人は「説明を読む → API を試す → 出典と確認範囲を見る」を同じサイトで進められます。MkDocs はサイトの構成と検索を担当し、API の実行は Swagger UI が担当します。

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

## 記事とチームサイトで使う

Qiita 記事は仕組みと試し方を紹介し、操作や確認範囲の詳しい記録はこのサイトへリンクします。記事とサイトの文章は自動同期していないため、変更時には両方を確認します。

GitHub Pages や Azure の静的サイト公開先には、同じ `site/` の中身を配置できます。Azure DevOps の Wiki は Markdown を共有する別の表示方式で、このサイトのナビゲーションや Swagger UI をそのまま表示する公開先ではありません。

仕組みの根拠：[MkDocs の設定](https://www.mkdocs.org/user-guide/configuration/)、[文書の書き方](https://www.mkdocs.org/user-guide/writing-your-docs/)、[静的サイトの配置](https://www.mkdocs.org/user-guide/deploying-your-docs/)、[Swagger UI](https://swagger.io/open-source/swagger-ui/)。
