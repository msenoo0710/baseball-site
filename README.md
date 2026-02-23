# 〇〇少年野球クラブ

Next.js 14 App Router + microCMS で構築した少年野球チームの公式サイトです。

## ページ構成

| パス | ページ |
|------|--------|
| `/` | トップページ |
| `/reports` | 活動報告アーカイブ |
| `/reports/[id]` | 活動報告 詳細 |
| `/members` | メンバー紹介 |
| `/api/revalidate` | microCMS Webhook受信（内部API） |

## 技術スタック

- Next.js 14 (App Router)
- React 18
- microCMS (Headless CMS)
- Google Fonts (Noto Sans JP, Bebas Neue)

## アーキテクチャ: ISR + On-Demand Revalidation

```
┌──────────────┐    Webhook POST     ┌────────────────────┐
│   microCMS   │ ──────────────────→ │ /api/revalidate    │
│  管理画面     │   コンテンツ更新時    │ revalidateTag()    │
└──────────────┘                     └────────┬───────────┘
                                              │
                                              ▼
┌──────────────┐  キャッシュ済HTML   ┌────────────────────┐
│   ブラウザ    │ ←──────────────── │ Next.js (Vercel)   │
│   ユーザー    │   高速レスポンス    │ ISRキャッシュ        │
└──────────────┘                    └────────────────────┘
```

### メリット
- microCMS APIコール数を最小化（従来の1/100以下）
- ページ表示速度が大幅向上（キャッシュHIT）
- microCMS更新 → 即座にサイト反映（Webhookトリガー）
- フォールバック: 60秒間隔でも自動再検証（Webhook失敗時の安全策）

## セットアップ

```bash
npm install
cp .env.example .env.local   # 環境変数を編集
npm run dev
```

### 環境変数（.env.local）

| 変数名 | 説明 |
|--------|------|
| `MICROCMS_SERVICE_DOMAIN` | microCMSのサービスドメイン |
| `MICROCMS_API_KEY` | microCMSのAPIキー |
| `REVALIDATE_SECRET` | Webhook認証用シークレット |

### microCMS Webhook設定

1. microCMS管理画面 → 対象APIの「API設定」→「Webhook」
2. 「カスタム通知」を追加
3. URL: `https://your-domain.com/api/revalidate`
4. シークレット: `.env.local` の `REVALIDATE_SECRET` と同じ値
5. トリガー: 「コンテンツの公開」「コンテンツの編集」「コンテンツの削除」にチェック
6. 対象API: `reports`, `team`, `members` の3つすべてに設定

## microCMS APIスキーマ

### reports（リスト型）
| フィールド | 種別 | 説明 |
|-----------|------|------|
| title | テキスト | 記事タイトル |
| date | 日時 | 日付 |
| category | セレクト / テキスト | 試合 / 練習 / イベント |
| thumbnail | 画像 | サムネイル画像 |
| body | リッチエディタ | 本文 |

### team（シングル型）
| フィールド | 種別 | 説明 |
|-----------|------|------|
| teamName | テキスト | チーム名 |
| introduction | テキストエリア | チーム紹介文 |
| schedule | テキストエリア | 活動日時 |
| location | テキストエリア | 活動場所 |
| target | テキストエリア | 対象学年 |
| contactInfo | テキストエリア | 連絡先 |
| mainVisual | 画像 | メインビジュアル |

### members（リスト型）
| フィールド | 種別 | 説明 |
|-----------|------|------|
| name | テキスト | 名前 |
| photo | 画像 | 写真 |
| grade | セレクト / テキスト | 学年 |
| position | テキスト | ポジション |
| number | 数値 | 背番号 |
| throwBat | テキスト | 投打 |
| comment | テキスト | ひとこと |
| role | セレクト / テキスト | 役職（キャプテン,監督,コーチ 等） |
| order | 数値 | 表示順 |

## デプロイ

GitHub にプッシュ後、Vercel でインポートすると自動デプロイされます。
Vercel の Environment Variables に上記3つの環境変数を設定してください。
