import Image from "next/image";
import Link from "next/link";
import products from "@/data/products.json";
import brands from "@/data/brands.json";

export default function Home() {
  // Top 10 인기 제품 (판매량 기준)
  const topProducts = products
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 10);

  // 트렌딩 제품
  const trendingProducts = products
    .filter(p => p.trending)
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, 6);

  // 피부 고민별 제품 수 계산
  const skinConcernCounts: Record<string, number> = {};
  products.forEach(product => {
    product.skinConcerns.forEach(concern => {
      skinConcernCounts[concern] = (skinConcernCounts[concern] || 0) + 1;
    });
  });

  const skinConcerns = [
    { name: "여드름", slug: "acne", icon: "🔴", count: skinConcernCounts["여드름"] || 0 },
    { name: "모공", slug: "pores", icon: "⚫", count: skinConcernCounts["모공"] || 0 },
    { name: "수분부족", slug: "dryness", icon: "💧", count: skinConcernCounts["수분부족"] || 0 },
    { name: "주름", slug: "wrinkles", icon: "📈", count: skinConcernCounts["주름"] || 0 },
    { name: "색소침착", slug: "pigmentation", icon: "☀️", count: skinConcernCounts["색소침착"] || 0 },
    { name: "민감성", slug: "sensitive", icon: "🌿", count: skinConcernCounts["민감성"] || 0 }
  ];

  // 주요 성분별 제품 수 계산
  const ingredientCounts: Record<string, number> = {};
  products.forEach(product => {
    product.keyIngredients.forEach(ingredient => {
      ingredientCounts[ingredient] = (ingredientCounts[ingredient] || 0) + 1;
    });
  });

  const hotIngredients = [
    { name: "PDRN", slug: "pdrn", description: "피부 재생", trend: "+300%", count: ingredientCounts["PDRN"] || 0 },
    { name: "트라넥삼산", slug: "tranexamic-acid", description: "미백/브라이트닝", trend: "+250%", count: ingredientCounts["트라넥삼산"] || 0 },
    { name: "나이아신아마이드", slug: "niacinamide", description: "모공 축소", trend: "+180%", count: ingredientCounts["나이아신아마이드"] || 0 },
    { name: "레티놀", slug: "retinol", description: "안티에이징", trend: "+150%", count: ingredientCounts["레티놀"] || 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent cursor-pointer">
                  뷰티랭킹
                </h1>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-pink-600 font-medium">홈</Link>
              <Link href="/products" className="text-gray-500 hover:text-pink-600">제품</Link>
              <Link href="/brands" className="text-gray-500 hover:text-pink-600">브랜드</Link>
              <Link href="/skin-concerns" className="text-gray-500 hover:text-pink-600">피부고민별</Link>
              <Link href="/ingredients" className="text-gray-500 hover:text-pink-600">성분별</Link>
              <Link href="/ranking" className="text-gray-500 hover:text-pink-600">랭킹</Link>
            </nav>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="제품, 브랜드, 성분 검색..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            데이터로 증명된 진짜 인기 뷰티 제품 랭킹
          </h2>
          <p className="text-xl mb-8">
            {products.length.toLocaleString()}개 제품 · {brands.length}개 브랜드 · 실시간 업데이트
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">이번 주 가장 핫한 뷰티 제품 TOP 10</h3>
            <Link href="/ranking">
              <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                전체 랭킹 보기
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-pink-600">{products.length.toLocaleString()}</div>
              <div className="text-gray-600 mt-1">등록 제품</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{brands.length}</div>
              <div className="text-gray-600 mt-1">브랜드</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-600">{trendingProducts.length}</div>
              <div className="text-gray-600 mt-1">트렌딩 제품</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {products.filter(p => p.isNew).length}
              </div>
              <div className="text-gray-600 mt-1">신제품</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900">실시간 인기 제품 TOP 10</h3>
          <Link href="/products" className="text-pink-600 hover:text-pink-700 font-medium">
            전체보기 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {topProducts.map((product, index) => (
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
                  <div className="absolute top-2 left-2 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    #{index + 1}
                  </div>
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
                    <div className="flex text-yellow-400 text-sm">
                      {"★".repeat(Math.floor(product.rating))}
                    </div>
                    <span className="text-xs text-gray-600 ml-1">
                      {product.rating} ({product.reviewCount.toLocaleString()})
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {product.price.toLocaleString()}원
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900">🔥 지금 뜨는 제품</h3>
              <p className="text-gray-600 mt-2">SNS에서 가장 많이 언급되는 제품</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="relative">
                    <div className="w-full h-56 bg-gray-100 relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      🔥 TRENDING
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.keyIngredients.slice(0, 3).map((ingredient) => (
                        <span key={ingredient} className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        {product.price.toLocaleString()}원
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="text-yellow-400 mr-1">★</span>
                        {product.rating}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skin Concerns */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">피부고민별 랭킹</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skinConcerns.map((concern) => (
              <Link key={concern.name} href={`/skin-concerns/${concern.slug}`}>
                <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-pink-50 hover:border-pink-200 border-2 border-transparent transition-all cursor-pointer">
                  <div className="text-4xl mb-3">{concern.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{concern.name}</h4>
                  <p className="text-sm text-gray-600">{concern.count}개 제품</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Ingredients */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">이달의 핫한 성분</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotIngredients.map((ingredient) => (
            <Link key={ingredient.name} href={`/ingredients/${ingredient.slug}`}>
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold">{ingredient.name}</h4>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{ingredient.trend}</span>
                </div>
                <p className="text-white/90 mb-2">{ingredient.description}</p>
                <p className="text-white/80 text-sm mb-4">{ingredient.count}개 제품</p>
                <div className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors inline-block">
                  제품 보기 →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">뷰티랭킹</h5>
              <p className="text-gray-400">데이터로 증명된 진짜 인기 뷰티 제품 랭킹</p>
              <p className="text-gray-400 mt-2 text-sm">by CNEC (크넥)</p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">카테고리</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products?category=skincare" className="hover:text-white">스킨케어</Link></li>
                <li><Link href="/products?category=makeup" className="hover:text-white">메이크업</Link></li>
                <li><Link href="/brands" className="hover:text-white">브랜드</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">피부고민</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/skin-concerns/acne" className="hover:text-white">여드름/트러블</Link></li>
                <li><Link href="/skin-concerns/pores" className="hover:text-white">모공 관리</Link></li>
                <li><Link href="/skin-concerns/dryness" className="hover:text-white">수분 부족</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">성분</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ingredients/pdrn" className="hover:text-white">PDRN</Link></li>
                <li><Link href="/ingredients/tranexamic-acid" className="hover:text-white">트라넥삼산</Link></li>
                <li><Link href="/ingredients/niacinamide" className="hover:text-white">나이아신아마이드</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 뷰티랭킹 by CNEC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

