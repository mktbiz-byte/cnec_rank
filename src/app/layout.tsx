import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "뷰티 랭킹 - 진짜 인기 제품을 찾아드립니다",
  description: "글로벌 커머스 데이터와 SNS 트렌드 분석으로 진짜 인기 있는 뷰티 제품을 찾아보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 네비게이션 바 */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* 로고 */}
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl">💄</span>
                <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  뷰티 랭킹
                </span>
              </Link>

              {/* 메뉴 */}
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  홈
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  제품
                </Link>
                <Link href="/brands" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  브랜드
                </Link>
                <Link href="/ranking" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  랭킹
                </Link>
                <Link href="/trends" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  트렌드
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 메인 컨텐츠 */}
        {children}

        {/* 푸터 */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">💄</span>
                  <span className="text-xl font-bold">뷰티 랭킹</span>
                </div>
                <p className="text-gray-400 text-sm">
                  글로벌 커머스 데이터와 SNS 트렌드 분석으로<br />
                  진짜 인기 있는 뷰티 제품을 찾아드립니다.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">제품</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/products" className="hover:text-white">전체 제품</Link></li>
                  <li><Link href="/ranking" className="hover:text-white">랭킹</Link></li>
                  <li><Link href="/trends" className="hover:text-white">트렌드</Link></li>
                  <li><Link href="/brands" className="hover:text-white">브랜드</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">피부 고민</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/skin-concerns/acne" className="hover:text-white">여드름</Link></li>
                  <li><Link href="/skin-concerns/pores" className="hover:text-white">모공</Link></li>
                  <li><Link href="/skin-concerns/dryness" className="hover:text-white">수분부족</Link></li>
                  <li><Link href="/skin-concerns/wrinkles" className="hover:text-white">주름</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">성분</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/ingredients/pdrn" className="hover:text-white">PDRN</Link></li>
                  <li><Link href="/ingredients/niacinamide" className="hover:text-white">나이아신아마이드</Link></li>
                  <li><Link href="/ingredients/retinol" className="hover:text-white">레티놀</Link></li>
                  <li><Link href="/ingredients/tranexamic-acid" className="hover:text-white">트라넥삼산</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>© 2025 뷰티 랭킹. All rights reserved. | Made by CNEC (크넥)</p>
              <p className="mt-2">데이터 출처: Amazon, Qoo10, Shopee, TikTok, YouTube, Instagram</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
