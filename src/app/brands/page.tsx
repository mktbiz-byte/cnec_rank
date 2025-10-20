'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import brands from '@/data/brands.json';

export default function BrandsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedCountry, setSelectedCountry] = useState('전체');

  const categories = ['전체', '스킨케어', '메이크업', '헤어케어'];
  const countries = ['전체', '한국', '미국', '프랑스', '일본'];

  const filteredBrands = brands.filter(brand => {
    const countryMatch = selectedCountry === '전체' || brand.country === selectedCountry;
    return countryMatch;
  });

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
              <Link href="/brands" className="text-pink-500 font-medium">브랜드</Link>
              <Link href="/products" className="text-gray-700 hover:text-pink-500">제품</Link>
              <Link href="/ranking" className="text-gray-700 hover:text-pink-500">랭킹</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">뷰티 브랜드</h1>
          <p className="text-xl text-gray-600">전 세계 인기 뷰티 브랜드를 만나보세요</p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 py-2">카테고리:</span>
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
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 py-2">국가:</span>
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCountry === country
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-50'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBrands.map((brand) => (
            <Link key={brand.id} href={`/brands/${brand.id}`}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-gray-700">{brand.name.charAt(0)}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900">{brand.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500">{brand.country}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{brand.description}</p>
                  <div className="text-xs text-gray-500">
                    {brand.productCount}개 제품
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-pink-500 mb-2">{brands.length}</div>
              <div className="text-gray-600">등록된 브랜드</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-purple-500 mb-2">{brands.filter(b => b.country === '한국').length}</div>
              <div className="text-gray-600">K-뷰티 브랜드</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl font-bold text-indigo-500 mb-2">{new Set(brands.map(b => b.country)).size}</div>
              <div className="text-gray-600">국가</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

