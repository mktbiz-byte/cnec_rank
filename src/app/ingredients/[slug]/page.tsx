'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

const ingredientMap: Record<string, string> = {
  'pdrn': 'PDRN',
  'tranexamic-acid': '트라넥삼산',
  'niacinamide': '나이아신아마이드',
  'retinol': '레티놀',
  'hyaluronic-acid': '히알루론산',
  'centella': '센텔라',
  'ceramide': '세라마이드',
  'peptide': '펩타이드'
};

export default function IngredientPage({ params }: { params: { slug: string } }) {
  const [sortBy, setSortBy] = useState('salesCount');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;

  const ingredientName = ingredientMap[params.slug] || params.slug;

  // 해당 성분을 포함한 제품 필터링
  const ingredientProducts = useMemo(() => {
    const filtered = products.filter(p =>
      p.keyIngredients.some(ingredient => ingredient.includes(ingredientName))
    );

    // 정렬
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'salesCount':
          return b.salesCount - a.salesCount;
        case 'rating':
          return b.rating - a.rating;
        case 'reviewCount':
          return b.reviewCount - a.reviewCount;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [ingredientName, sortBy]);

  // 페이지네이션
  const totalPages = Math.ceil(ingredientProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = ingredientProducts.slice(startIndex, startIndex + productsPerPage);

  if (ingredientProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">해당 성분을 포함한 제품이 없습니다</h1>
          <Link href="/ingredients" className="text-pink-600 hover:text-pink-700">
            성분 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

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
              <Link href="/ingredients" className="text-gray-900 hover:text-pink-600 font-medium">성분별</Link>
              <Link href="/ranking" className="text-gray-500 hover:text-pink-600">랭킹</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="mb-4 text-sm">
            <Link href="/" className="text-gray-500 hover:text-pink-600">홈</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/ingredients" className="text-gray-500 hover:text-pink-600">성분별</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{ingredientName}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{ingredientName} 함유 제품</h1>
          <p className="text-gray-600">총 {ingredientProducts.length.toLocaleString()}개 제품</p>
        </div>

        {/* Sort */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">정렬</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="salesCount">판매량 높은순</option>
              <option value="rating">평점 높은순</option>
              <option value="reviewCount">리뷰 많은순</option>
              <option value="price-low">가격 낮은순</option>
              <option value="price-high">가격 높은순</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          {paginatedProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative">
                  <div className="w-full h-48 bg-gray-100 relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {product.trending && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      🔥
                    </div>
                  )}
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{product.discount}%
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-10">
                    {product.name}
                  </h4>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 text-sm mr-1">★</span>
                    <span className="text-xs text-gray-600">{product.rating}</span>
                  </div>
                  <div className="text-base font-bold text-gray-900">
                    {product.price.toLocaleString()}원
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              이전
            </button>
            
            {[...Array(Math.min(10, totalPages))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === pageNum
                      ? 'bg-pink-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

