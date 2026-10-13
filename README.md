# CRM Frontend

顧客管理システム（CRM）のフロントエンドアプリケーションです。

Next.js と TypeScript を使用して開発し、バックエンドの Django REST Framework API と連携しています。

---

# 概要

営業活動や顧客対応を管理するためのCRMシステムです。

顧客情報の管理、対応履歴の記録、ダッシュボードによる状況把握を行えます。

---

# 使用技術

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query (React Query)

## API

- Django REST Framework

---

# 主な機能

## 認証

- ログイン
- Token認証
- ログアウト

## 顧客管理

- 顧客一覧表示
- 顧客作成
- 顧客詳細表示
- 顧客編集
- 顧客削除

## 対応履歴管理

- 対応履歴作成
- 対応履歴一覧表示
- 対応履歴編集
- 対応履歴削除

## 次回アクション管理

- 次回アクション設定
- 実施予定日設定
- 実施予定日更新

## ダッシュボード

- 顧客総数表示
- 新規顧客数表示
- 対応中顧客数表示
- 成約顧客数表示
- グラフ表示

## 一覧機能

- 検索
- ステータス絞り込み
- ソート
- ページネーション

---

# 工夫したポイント

## 認証管理

Token Authenticationを使用し、ログインユーザーのみが利用できる構成にしました。

## API通信

共通の認証ヘッダーを作成し、各API通信で再利用しています。

```typescript
export const authHeaders = () => {
  const token = localStorage.getItem("crm_token");

  return {
    Authorization: `Token ${token}`,
  };
};
```

## データ取得

TanStack Query を利用し、

- キャッシュ管理
- ローディング管理
- 再取得制御

を実装しています。

## 環境別設定

開発環境と本番環境を分離するため、

```env
NEXT_PUBLIC_API_URL=
```

を利用してAPIエンドポイントを管理しています。

---

# 画面一覧

- ログイン
- ダッシュボード
- 顧客一覧
- 顧客詳細
- 顧客作成
- 顧客編集
- 対応履歴一覧
- 対応履歴作成
- 対応履歴編集

---

# 今後の改善予定

- Vercelへのデプロイ
- レスポンシブ対応改善
- UI/UX改善
- エラーハンドリング強化
- テストコード追加

---

# Backend

本システムは Django REST Framework を利用したバックエンドAPIと連携して動作します。
