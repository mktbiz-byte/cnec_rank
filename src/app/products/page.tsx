'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';
import brands from '@/data/brands.json';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedConcern, setSelectedConcern] = useState('전체');
  const [sortBy, setSortBy] = useState('인기순');

  const categories = ['전체', '스킨케어', '메이크업'];
  const concerns = ['전체', '수분부족', '민감성', '모공', '주름', '트러블', '브라이트닝'];
  const sortOptions = ['인기순', '평점순', '가격낮은순', '가격높은순', '리뷰많은순'];

  let filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === '전체' || product.category === selectedCategory;
    const concernMatch = selectedConcern === '전체' || product.skinConcerns.includes(selectedConcern);
    return categoryMatch && concernMatch;
  });

  // Sort products
  filteredProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case '평점순':
        return b.rating - a.rating;
      case '가격낮은순':
        return a.price - b.price;
      case '가격높은순':
        return b.price - a.price;
      case '리뷰많은순':
        return b.reviewCount - a.reviewCount;
      default: // 인기순
        return b.salesCount - a.salesCount;
    }
  });

  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              뷰티랭킹
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-500">홈</Link>
              <Link href="/brands" className="text-gray-700 hover:text-pink-500">브랜드</Link>
              <Link href="/products" className="text-pink-500 font-medium">제품</Link>
              <Link href="/ranking" className="text-gray-700 hover:text-pink-500">랭킹</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">뷰티 제품</h1>
          <p className="text-xl text-gray-600">데이터 기반 인기 뷰티 제품을 확인하세요</p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">카테고리:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-pink-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-medium text-gray-700">피부고민:</span>
              {concerns.map((concern) => (
                <button
                  key={concern}
                  onClick={() => setSelectedConcern(concern)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedConcern === concern
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">{product.name.substring(0, 2)}</span>
                  </div>
                </div>
                {product.trending && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    HOT
                  </div>
                )}
                {product.isNew && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="absolute bottom-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500">{product.brand}</span>
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{product.name}</h3>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({product.reviewCount.toLocaleString()})</span>
                  </div>
                  <span className="text-xs text-gray-500">판매 {product.salesCount.toLocaleString()}</span>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {product.keyIngredients.slice(0, 2).map((ingredient, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-gray-900">
                    {product.discount > 0 ? (
                      <div>
                        <span className="text-sm text-gray-500 line-through mr-2">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-red-500">
                          {formatPrice(Math.round(product.price * (100 - product.discount) / 100))}
                        </span>
                      </div>
                    ) : (
                      formatPrice(product.price)
                    )}
                  </div>
                  <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                    상세보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-pink-500 mb-2">{filteredProducts.length}</div>
              <div className="text-gray-600">검색된 제품</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-500 mb-2">
                {Math.round(filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length * 10) / 10}
              </div>
              <div className="text-gray-600">평균 평점</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-indigo-500 mb-2">
                {Math.round(filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length / 1000)}K
              </div>
              <div className="text-gray-600">평균 가격</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {filteredProducts.filter(p => p.trending).length}
              </div>
              <div className="text-gray-600">트렌딩 제품</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

