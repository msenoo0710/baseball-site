import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { CACHE_TAGS } from '@/lib/microcms';

/**
 * microCMS Webhook → On-Demand Revalidation
 *
 * microCMS管理画面の「API設定 > Webhook」に以下を登録:
 *   URL:    https://your-domain.com/api/revalidate
 *   シークレット: REVALIDATE_SECRET と同じ値
 *
 * Webhookリクエスト例（microCMSが自動送信）:
 * {
 *   "service": "your-service",
 *   "api": "reports",        ← エンドポイント名
 *   "id": "abc123",          ← コンテンツID
 *   "type": "edit",          ← new / edit / delete
 *   "contents": { ... }      ← オプション（「カスタム通知」有効時）
 * }
 */
export async function POST(request) {
  // ─── シークレット検証 ───
  const secret = request.headers.get('X-MICROCMS-Signature')
    || request.headers.get('x-microcms-signature');
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  // ─── リクエスト解析 ───
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const { api, id, type } = body;

  // ─── エンドポイント別にタグを再検証 ───
  const revalidated = [];

  switch (api) {
    case 'reports':
      revalidateTag(CACHE_TAGS.reports);
      revalidated.push(CACHE_TAGS.reports);
      // 個別記事のキャッシュも更新（編集・削除時）
      if (id && (type === 'edit' || type === 'delete')) {
        revalidateTag(CACHE_TAGS.report(id));
        revalidated.push(CACHE_TAGS.report(id));
      }
      break;

    case 'team':
      revalidateTag(CACHE_TAGS.team);
      revalidated.push(CACHE_TAGS.team);
      break;

    case 'members':
      revalidateTag(CACHE_TAGS.members);
      revalidated.push(CACHE_TAGS.members);
      break;

    default:
      // 未知のAPIの場合は全タグを再検証
      Object.values(CACHE_TAGS).forEach((tag) => {
        if (typeof tag === 'string') {
          revalidateTag(tag);
          revalidated.push(tag);
        }
      });
      break;
  }

  console.log(`[Revalidate] api=${api}, id=${id}, type=${type}, tags=${revalidated.join(',')}`);

  return NextResponse.json({
    revalidated: true,
    tags: revalidated,
    now: Date.now(),
  });
}

// Webhook設定確認用（ブラウザからGETでアクセスして疎通確認）
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'microCMS Webhook endpoint is ready.',
    usage: 'POST with microCMS webhook payload to trigger revalidation.',
  });
}
