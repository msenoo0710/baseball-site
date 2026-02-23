import { createClient } from 'microcms-js-sdk';

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || '';
const apiKey = process.env.MICROCMS_API_KEY || '';

// microCMS未設定時はnullを返す
const client = serviceDomain && apiKey
  ? createClient({
      serviceDomain,
      apiKey,
      customRequestInit: {
        cache: 'no-store',
      },
    })
  : null;

/* ===== キャッシュタグ定数 ===== */
// revalidateTag() で使用するキー
export const CACHE_TAGS = {
  reports: 'reports',
  report: (id) => `report-${id}`,
  team: 'team',
  members: 'members',
};

/* ===== フォールバック（microCMS未接続時）===== */
const fallbackReports = [
  { id: 'sample-1', title: '【サンプル】夏季交流戦レポート', date: '2025-07-15', category: '試合', thumbnail: null, body: '<p>microCMSに接続すると実際の記事が表示されます。管理画面でAPIキーを設定してください。</p>' },
  { id: 'sample-2', title: '【サンプル】守備練習レポート', date: '2025-07-08', category: '練習', thumbnail: null, body: '<p>microCMSに接続すると実際の記事が表示されます。</p>' },
  { id: 'sample-3', title: '【サンプル】体験入団会を開催', date: '2025-06-22', category: 'イベント', thumbnail: null, body: '<p>microCMSに接続すると実際の記事が表示されます。</p>' },
];

const fallbackTeam = {
  teamName: '〇〇少年野球クラブ',
  introduction: 'microCMSに接続するとチーム情報が表示されます。管理画面で.env.localにAPIキーを設定してください。',
  schedule: '毎週 土・日\n9:00〜12:00',
  location: '〇〇市立○○小学校\nグラウンド',
  target: '小学\n1年生〜6年生',
  contactInfo: '090-XXXX-XXXX\n代表 山田',
  mainVisual: null,
};

const fallbackPlayers = [
  { id: 'p1', name: '山田 太郎', photo: null, grade: '6年', position: 'ピッチャー', number: 1, throwBat: '右投左打', comment: 'チームを優勝に導く！', role: 'キャプテン', order: 1 },
  { id: 'p2', name: '鈴木 次郎', photo: null, grade: '6年', position: 'キャッチャー', number: 2, throwBat: '右投右打', comment: '全力プレーで勝つ！', role: '副キャプテン', order: 2 },
  { id: 'p3', name: '高橋 翼', photo: null, grade: '5年', position: 'ショート', number: 6, throwBat: '右投右打', comment: '守備でチームを助ける！', role: null, order: 3 },
  { id: 'p4', name: '渡辺 蓮', photo: null, grade: '4年', position: 'セカンド', number: 4, throwBat: '右投左打', comment: 'ヒットいっぱい打つ！', role: null, order: 4 },
];

const fallbackCoaches = [
  { id: 'c1', name: '山田 正志', photo: null, grade: '', position: '', number: null, throwBat: '', comment: '子どもたちの笑顔が一番の宝です。', role: '監督', order: 90 },
  { id: 'c2', name: '佐藤 雅人', photo: null, grade: '', position: '', number: null, throwBat: '', comment: '基礎をしっかり身につけよう！', role: 'コーチ', order: 91 },
];

/* ===== 活動報告 ===== */

// 一覧取得（最大100件）
export async function getReports(limit = 100) {
  if (!client) return fallbackReports;
  const data = await client.getList({
    endpoint: 'reports',
    queries: { limit, orders: '-date' },
    customRequestInit: {
      next: { tags: [CACHE_TAGS.reports] },
    },
  });
  return data.contents.map(formatReport);
}

// 最新N件取得（トップページ用）
export async function getLatestReports(limit = 4) {
  if (!client) return fallbackReports.slice(0, limit);
  const data = await client.getList({
    endpoint: 'reports',
    queries: { limit, orders: '-date' },
    customRequestInit: {
      next: { tags: [CACHE_TAGS.reports] },
    },
  });
  return data.contents.map(formatReport);
}

// 1件取得
export async function getReportById(id) {
  if (!client) {
    const found = fallbackReports.find((r) => r.id === id);
    if (found) return found;
    throw new Error('Not found');
  }
  const data = await client.get({
    endpoint: 'reports',
    contentId: id,
    customRequestInit: {
      next: { tags: [CACHE_TAGS.reports, CACHE_TAGS.report(id)] },
    },
  });
  return formatReport(data);
}

// microCMSレスポンス → アプリ用の形式に変換
function formatReport(item) {
  return {
    id: item.id,
    title: item.title,
    date: item.date ? item.date.split('T')[0] : '',
    category: item.category?.[0] || item.category || '',
    thumbnail: item.thumbnail?.url || null,
    body: item.body || '',
  };
}

/* ===== チーム情報 ===== */

export async function getTeamInfo() {
  if (!client) return fallbackTeam;
  try {
    const data = await client.get({
      endpoint: 'team',
      customRequestInit: {
        next: { tags: [CACHE_TAGS.team] },
      },
    });
    return {
      teamName: data.teamName || '〇〇少年野球クラブ',
      introduction: data.introduction || '',
      schedule: data.schedule || '',
      location: data.location || '',
      target: data.target || '',
      contactInfo: data.contactInfo || '',
      mainVisual: data.mainVisual?.url || null,
    };
  } catch {
    return fallbackTeam;
  }
}

/* ===== メンバー ===== */

export async function getMembers(limit = 100) {
  if (!client) return [...fallbackPlayers, ...fallbackCoaches];
  const data = await client.getList({
    endpoint: 'members',
    queries: { limit, orders: 'order' },
    customRequestInit: {
      next: { tags: [CACHE_TAGS.members] },
    },
  });
  return data.contents.map(formatMember);
}

function formatMember(item) {
  return {
    id: item.id,
    name: item.name,
    photo: item.photo?.url || null,
    grade: item.grade?.[0] || item.grade || '',
    position: item.position || '',
    number: item.number ?? null,
    throwBat: item.throwBat || '',
    comment: item.comment || '',
    role: item.role?.[0] || item.role || null,
    order: item.order || 0,
  };
}

// 選手とコーチを分離して返す
export async function getMembersAndCoaches() {
  if (!client) return { players: fallbackPlayers, coaches: fallbackCoaches };
  const all = await getMembers();
  const coachRoles = ['監督', 'コーチ'];
  const players = all.filter((m) => !coachRoles.includes(m.role));
  const coaches = all.filter((m) => coachRoles.includes(m.role));
  return { players, coaches };
}
