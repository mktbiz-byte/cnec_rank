import Image from 'next/image';
import Link from 'next/link';
import products from '@/data/products.json';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">제품을 찾을 수 없습니다</h1>
          <Link href="/products" className="text-pink-600 hover:text-pink-700">
                제품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  // 관련 제품 (같은 브랜드 또는 같은 카테고리)
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

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
              <Link href="/products" className="text-gray-900 hover:text-pink-600 font-medium">제품</Link>
              <Link href="/brands" className="text-gray-500 hover:text-pink-600">브랜드</Link>
              <Link href="/skin-concerns" className="text-gray-500 hover:text-pink-600">피부고민별</Link>
              <Link href="/ingredients" className="text-gray-500 hover:text-pink-600">성분별</Link>
              <Link href="/ranking" className="text-gray-500 hover:text-pink-600">랭킹</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-pink-600">홈</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-pink-600">제품</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative">
              <div className="w-full h-96 bg-gray-100 rounded-lg relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {product.trending && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full font-bold">
                  🔥 TRENDING
                </div>
              )}
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Link href={`/brands/${product.brand}`} className="text-pink-600 hover:text-pink-700 font-medium">
                  {product.brand}
                </Link>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 text-2xl mr-2">
                  {"★".repeat(Math.floor(product.rating))}
                </div>
                <span className="text-xl font-semibold text-gray-900 mr-2">{product.rating}</span>
                <span className="text-gray-600">({product.reviewCount.toLocaleString()} 리뷰)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.discount > 0 ? (
                  <div>
                    <div className="text-gray-500 line-through text-lg mb-1">
                      {product.price.toLocaleString()}원
                    </div>
                    <div className="text-4xl font-bold text-red-600">
                      {Math.round(product.price * (100 - product.discount) / 100).toLocaleString()}원
                    </div>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-gray-900">
                    {product.price.toLocaleString()}원
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 text-lg">{product.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">판매량</div>
                  <div className="text-2xl font-bold text-gray-900">{product.salesCount.toLocaleString()}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">검색량</div>
                  <div className="text-2xl font-bold text-gray-900">{(product.searchVolume || 0).toLocaleString()}</div>
                </div>
              </div>

              {/* Skin Concerns */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">피부 고민</h3>
                <div className="flex flex-wrap gap-2">
                  {product.skinConcerns.map((concern) => (
                    <Link key={concern} href={`/skin-concerns/${concern}`}>
                      <span className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-200 cursor-pointer">
                        {concern}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Key Ingredients */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">주요 성분</h3>
                <div className="flex flex-wrap gap-2">
                  {product.keyIngredients.map((ingredient) => (
                    <Link key={ingredient} href={`/ingredients/${ingredient}`}>
                      <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 cursor-pointer">
                        {ingredient}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Category & Subcategory */}
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">카테고리:</span>
                  <span className="font-medium text-gray-900">{product.category}</span>
                  <span className="mx-2">/</span>
                  <span className="font-medium text-gray-900">{product.subcategory}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 제품</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <Link key={relProduct.id} href={`/products/${relProduct.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="relative">
                      <div className="w-full h-48 bg-gray-100 relative">
                        <Image
                          src={relProduct.image}
                          alt={relProduct.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-gray-500 mb-1">{relProduct.brand}</div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 h-10">
                        {relProduct.name}
                      </h4>
                      <div className="flex items-center mb-2">
                        <span className="text-yellow-400 text-sm mr-1">★</span>
                        <span className="text-xs text-gray-600">{relProduct.rating}</span>
                      </div>
                      <div className="text-base font-bold text-gray-900">
                        {relProduct.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

