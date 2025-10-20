'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

export default function RankingPage() {
  const [category, setCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  // 랭킹 계산 (판매량 + 평점 + 리뷰 수 종합)
  const rankedProducts = [...products]
    .filter(p => category === 'all' || p.category === category)
    .map(p => ({
      ...p,
      rankingScore: (p.salesCount * 0.5) + (p.rating * 1000 * 0.3) + (p.reviewCount * 0.2)
    }))
    .sort((a, b) => b.rankingScore - a.rankingScore)
    .slice(0, 100);

  const categories = [
    { value: 'all', label: '전체' },
    { value: '스킨케어', label: '스킨케어' },
    { value: '메이크업', label: '메이크업' }
  ];

  const timeRanges = [
    { value: 'day', label: '일간' },
    { value: 'week', label: '주간' },
    { value: 'month', label: '월간' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                뷰티랭킹
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-pink-600">홈</Link>
              <Link href="/products" className="text-gray-500 hover:text-pink-600">제품</Link>
              <Link href="/brands" className="text-gray-500 hover:text-pink-600">브랜드</Link>
              <Link href="/skin-concerns" className="text-gray-500 hover:text-pink-600">피부고민별</Link>
              <Link href="/ingredients" className="text-gray-500 hover:text-pink-600">성분별</Link>
              <Link href="/ranking" className="text-gray-900 hover:text-pink-600 font-medium">랭킹</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">뷰티 제품 종합 랭킹</h2>
          <p className="text-xl">판매량 · 평점 · 리뷰를 종합한 데이터 기반 순위</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      category === cat.value
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">기간</label>
              <div className="flex flex-wrap gap-2">
                {timeRanges.map(range => (
                  <button
                    key={range.value}
                    onClick={() => setTimeRange(range.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      timeRange === range.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🏆 TOP 3</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rankedProducts.slice(0, 3).map((product, index) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer ${
                  index === 0 ? 'md:scale-110 md:mt-0' : 'md:mt-8'
                }`}>
                  <div className="relative">
                    <div className="w-full h-64 bg-gray-100 relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={`absolute top-4 left-4 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      'bg-orange-400 text-orange-900'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-semibold">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.reviewCount.toLocaleString()} 리뷰
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {product.price.toLocaleString()}원
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ranking List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-bold text-gray-900">전체 랭킹 (4위~100위)</h3>
          </div>
          <div className="divide-y">
            {rankedProducts.slice(3, 100).map((product, index) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-12 text-center">
                      <span className="text-2xl font-bold text-gray-400">{index + 4}</span>
                    </div>

                    {/* Image */}
                    <div className="w-20 h-20 bg-gray-100 rounded-lg relative flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          {product.rating}
                        </span>
                        <span>리뷰 {product.reviewCount.toLocaleString()}</span>
                        <span>판매 {product.salesCount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-900">
                        {product.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

