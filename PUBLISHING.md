# ビルドと公開前の確認

このデモの公開作業は未実施です。編集元は `docs/` と `mkdocs.yml`、どの静的サイト公開先にも渡せる生成物は `site/` です。GitHub Pages と Qiita への公開は、内容と表示を確認してから行います。

1. `python3 -m mkdocs serve` でローカルサイトを開く。
2. Swagger UI の `GET /v1/search` と `GET /v1/forecast` で、東京と任意のもう1都市を実行する。実行前にプレビューするリクエスト URL が `geocoding-api.open-meteo.com`、`api.open-meteo.com` を指すか確認する。
3. スマートフォン幅でも、ページ内フォームまたは「別画面で開く」から操作できるか確認する。
4. `python3 -m mkdocs build --strict` を実行し、生成した `site/` のページと静的ファイルを確認する。
5. 公開時点の [Open-Meteo の無料 API 利用条件](https://open-meteo.com/en/terms)と出典表示を再確認する。

2026年10月26日のローカル確認では、Chrome のページ内フォームで東京の検索・予報が HTTP 200、別画面で札幌の検索・予報が HTTP 200 でした。札幌では3日分と華氏を指定し、応答の日付配列と単位が変わりました。幅390pxの別画面からも検索を実行でき、横スクロールはありませんでした。公開 URL では上記 2 と 3 を再確認します。

## GitHub Pages

1. 新しい公開リポジトリにこのディレクトリのソースを置き、GitHub の Settings → Pages → Build and deployment → Source を **GitHub Actions** にする。
2. Actions の `Deploy MkDocs to GitHub Pages` を手動実行し、公開 URL から上記 2 と 3 を再確認する。
3. [qiita-draft.md](qiita-draft.md) に公開 URL を加え、記事の表現・リンク・出典を見直してから投稿する。

GitHub Pages の手順は[GitHub の公式資料](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)を参照。Workflow は `workflow_dispatch` のみで起動するため、リポジトリへ push しただけでは公開されません。

## Azure DevOps Services

`azure-pipelines.yml` は手動実行で `python -m mkdocs build --strict` を行い、`site/` を `mkdocs-site` という Pipeline Artifact として保存します。Azure DevOps の Pipelines でこの YAML を指定してパイプラインを作成します。`trigger: none` と `pr: none` のため、push や PR では起動しません。成果物の保存はサイト公開とは異なります。

実際に Azure 側で閲覧できるサイトにする場合は、静的サイトの公開先とアクセス範囲を決め、確認済みの `site/` を配置します。たとえば Azure Static Web Apps は[事前に生成したファイルをデプロイするタスク](https://learn.microsoft.com/en-us/azure/devops/pipelines/tasks/reference/azure-static-web-app-v0?view=azure-pipelines)を提供します。公開先の設定とデプロイトークンはまだ用意・検証していません。

Azure DevOps の [Publish code as wiki](https://learn.microsoft.com/en-us/azure/devops/project/wiki/publish-repo-to-wiki?view=azure-devops) は `docs/` の Markdown を共有できます。ただし MkDocs の生成 HTML、検索、ページ内 Swagger UI をそのまま載せる方式ではありません。操作フォームを使う人には静的サイトの URL を案内します。

チームでの変更は、Markdown と OpenAPI 定義をレビューし、ビルド結果とブラウザでの確認範囲を記録してから公開します。GitHub Pages、Azure 側のサイト、Qiita の公開や更新は、それぞれ対象環境と権限を確認したうえで最終確認を取ります。

ロールバックする場合は、公開先で直前の確認済み成果物へ戻すかサイトを無効化し、Qiita 記事内の公開 URL を削除して公開停止を明記します。ローカルの試作は `mkdocs-open-meteo-demo` ディレクトリのみで、既存の OpenDrive ドキュメントは変更していません。
