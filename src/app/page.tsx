import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const topProducts = [
    {
      id: 1,
      name: "라로슈포제 시카플라스트 밤 B5",
      brand: "라로슈포제",
      category: "스킨케어",
      rank: 1,
      price: "15,000원",
      rating: 4.8,
      image: "/api/placeholder/200/200",
      keyIngredients: ["판테놀", "센텔라"]
    },
    {
      id: 2,
      name: "세라베 하이드레이팅 클렌저",
      brand: "세라베",
      category: "클렌징",
      rank: 2,
      price: "18,000원",
      rating: 4.7,
      image: "/api/placeholder/200/200",
      keyIngredients: ["세라마이드", "히알루론산"]
    },
    {
      id: 3,
      name: "토니앤가이 PDRN 앰플",
      brand: "토니앤가이",
      category: "에센스",
      rank: 3,
      price: "45,000원",
      rating: 4.9,
      image: "/api/placeholder/200/200",
      keyIngredients: ["PDRN", "나이아신아마이드"]
    }
  ];

  const skinConcerns = [
    { name: "여드름/트러블", icon: "🔴", count: "1,234개 제품" },
    { name: "모공 관리", icon: "⚫", count: "892개 제품" },
    { name: "수분 부족", icon: "💧", count: "1,567개 제품" },
    { name: "주름/탄력", icon: "📈", count: "743개 제품" },
    { name: "색소침착", icon: "☀️", count: "654개 제품" },
    { name: "민감성 피부", icon: "🌿", count: "432개 제품" }
  ];

  const hotIngredients = [
    { name: "PDRN", description: "피부 재생", trend: "+300%" },
    { name: "트라넥삼산", description: "미백/브라이트닝", trend: "+250%" },
    { name: "나이아신아마이드", description: "모공 축소", trend: "+180%" },
    { name: "레티놀", description: "안티에이징", trend: "+150%" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-pink-600">뷰티랭킹</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-pink-600">홈</Link>
              <Link href="/category" className="text-gray-500 hover:text-pink-600">카테고리별</Link>
              <Link href="/skin-concerns" className="text-gray-500 hover:text-pink-600">피부고민별</Link>
              <Link href="/ingredients" className="text-gray-500 hover:text-pink-600">성분별</Link>
              <Link href="/brands" className="text-gray-500 hover:text-pink-600">브랜드별</Link>
              <Link href="/trends" className="text-gray-500 hover:text-pink-600">트렌드</Link>
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
            검색량, 판매량, 리뷰, SNS 언급을 종합한 객관적 순위
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">이번 주 가장 핫한 뷰티 제품 TOP 10</h3>
            <button className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              전체 랭킹 보기
            </button>
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8">실시간 인기 제품</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">제품 이미지</span>
                </div>
                <div className="absolute top-4 left-4 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  #{product.rank}
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {"★".repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{product.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {product.keyIngredients.map((ingredient) => (
                    <span key={ingredient} className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                      {ingredient}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <button className="bg-pink-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-700 transition-colors">
                    상세보기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skin Concerns */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">피부고민별 랭킹</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skinConcerns.map((concern) => (
              <Link key={concern.name} href={`/skin-concerns/${concern.name}`}>
                <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-pink-50 hover:border-pink-200 border-2 border-transparent transition-all cursor-pointer">
                  <div className="text-4xl mb-3">{concern.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{concern.name}</h4>
                  <p className="text-sm text-gray-600">{concern.count}</p>
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
            <div key={ingredient.name} className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-xl font-bold">{ingredient.name}</h4>
                <span className="bg-white/20 px-2 py-1 rounded-full text-sm">{ingredient.trend}</span>
              </div>
              <p className="text-white/90 mb-4">{ingredient.description}</p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
                제품 보기
              </button>
            </div>
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
            </div>
            <div>
              <h6 className="font-semibold mb-4">카테고리</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/skincare">스킨케어</Link></li>
                <li><Link href="/makeup">메이크업</Link></li>
                <li><Link href="/haircare">헤어케어</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">피부고민</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/acne">여드름/트러블</Link></li>
                <li><Link href="/pores">모공 관리</Link></li>
                <li><Link href="/dryness">수분 부족</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">성분</h6>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/pdrn">PDRN</Link></li>
                <li><Link href="/tranexamic-acid">트라넥삼산</Link></li>
                <li><Link href="/niacinamide">나이아신아마이드</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 뷰티랭킹. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
