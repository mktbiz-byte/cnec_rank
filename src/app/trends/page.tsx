'use client';

import { useState, useEffect } from 'react';

interface TrendingTopic {
  topic_type: string;
  topic_name: string;
  mention_count: number;
  total_views: number;
  growth_rate: number;
  recent_count: number;
  previous_count: number;
}

interface ShortformContent {
  id: number;
  platform: string;
  title: string;
  creator_name: string;
  views: number;
  likes: number;
  comments: number;
  engagement_rate: number;
  upload_date: string;
  days_since_upload: number;
}

export default function TrendsPage() {
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [shortformContents, setShortformContents] = useState<ShortformContent[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('week');

  useEffect(() => {
    // 트렌딩 토픽 로드
    fetch('/data/trending_topics.json')
      .then(res => res.json())
      .then(data => setTrendingTopics(data))
      .catch(err => console.error('Error loading trending topics:', err));

    // 숏폼 콘텐츠 로드
    fetch('/data/shortform_contents.json')
      .then(res => res.json())
      .then(data => setShortformContents(data))
      .catch(err => console.error('Error loading shortform contents:', err));
  }, []);

  // 플랫폼 필터링
  const filteredContents = selectedPlatform === 'all'
    ? shortformContents
    : shortformContents.filter(c => c.platform === selectedPlatform);

  // 기간 필터링
  const periodDays = selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 90;
  const periodFilteredContents = filteredContents.filter(c => c.days_since_upload <= periodDays);

  // 조회수 기준 정렬
  const topContents = [...periodFilteredContents]
    .sort((a, b) => b.views - a.views)
    .slice(0, 20);

  // 피부 고민 트렌드
  const skinConcernTrends = trendingTopics.filter(t => t.topic_type === 'skin_concern');

  // 성분 트렌드
  const ingredientTrends = trendingTopics.filter(t => t.topic_type === 'ingredient');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'tiktok': return '🎵';
      case 'youtube_shorts': return '▶️';
      case 'instagram_reels': return '📷';
      default: return '🎬';
    }
  };

  const getTrendEmoji = (growthRate: number) => {
    if (growthRate > 100) return '🔥';
    if (growthRate > 50) return '📈';
    if (growthRate > 0) return '➡️';
    return '📉';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📈 뷰티 트렌드 분석
          </h1>
          <p className="text-gray-600">
            TikTok, YouTube Shorts, Instagram Reels에서 발견한 최신 뷰티 트렌드
          </p>
        </div>

        {/* 피부 고민별 트렌드 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🎯</span>
            <span>피부 고민별 트렌드</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skinConcernTrends.map((trend, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{getTrendEmoji(trend.growth_rate)}</span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${
                    trend.growth_rate > 50 ? 'bg-red-100 text-red-600' :
                    trend.growth_rate > 0 ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {trend.growth_rate > 0 ? '+' : ''}{trend.growth_rate.toFixed(0)}%
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{trend.topic_name}</h3>
                <p className="text-sm text-gray-600">
                  언급 {trend.mention_count}회 · 조회수 {formatNumber(trend.total_views)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 성분별 트렌드 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🧪</span>
            <span>성분별 트렌드</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ingredientTrends.map((trend, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{getTrendEmoji(trend.growth_rate)}</span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${
                    trend.growth_rate > 50 ? 'bg-red-100 text-red-600' :
                    trend.growth_rate > 0 ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {trend.growth_rate > 0 ? '+' : ''}{trend.growth_rate.toFixed(0)}%
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{trend.topic_name}</h3>
                <p className="text-sm text-gray-600">
                  언급 {trend.mention_count}회 · 조회수 {formatNumber(trend.total_views)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 인기 숏폼 콘텐츠 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span>🎬</span>
            <span>인기 숏폼 콘텐츠 TOP 20</span>
          </h2>

          {/* 필터 */}
          <div className="flex gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                플랫폼
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="all">전체</option>
                <option value="tiktok">TikTok</option>
                <option value="youtube_shorts">YouTube Shorts</option>
                <option value="instagram_reels">Instagram Reels</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기간
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="week">1주일</option>
                <option value="month">1개월</option>
                <option value="quarter">3개월</option>
              </select>
            </div>
          </div>

          {/* 콘텐츠 리스트 */}
          <div className="space-y-4">
            {topContents.map((content, index) => (
              <div
                key={content.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{getPlatformIcon(content.platform)}</span>
                      <span className="text-sm text-gray-500">{content.creator_name}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{content.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>👁 {formatNumber(content.views)} 조회</span>
                      <span>👍 {formatNumber(content.likes)} 좋아요</span>
                      <span>💬 {formatNumber(content.comments)} 댓글</span>
                      <span>📊 참여율 {content.engagement_rate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

