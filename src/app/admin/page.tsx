"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-gray-600">로딩 중...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                CNEC Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 hover:text-pink-600"
              >
                사이트 보기 →
              </Link>
              <div className="text-sm text-gray-700">
                {session.user?.email}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-md"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            대시보드
          </h2>
          <p className="text-gray-600">
            CNEC 뷰티 랭킹 사이트 관리 시스템
          </p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl">
                📦
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              5,500
            </div>
            <div className="text-sm text-gray-600">총 제품</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-2xl">
                🏢
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">57</div>
            <div className="text-sm text-gray-600">브랜드</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-2xl">
                🔥
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">6</div>
            <div className="text-sm text-gray-600">트렌딩</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center text-2xl">
                ✨
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">566</div>
            <div className="text-sm text-gray-600">신제품</div>
          </div>
        </div>

        {/* 빠른 작업 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 작업</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/admin/products"
              className="bg-blue-50 hover:bg-blue-100 rounded-xl p-6 transition-all border border-blue-200"
            >
              <div className="text-3xl mb-3">📦</div>
              <h4 className="font-semibold text-blue-900 mb-1">
                제품 관리
              </h4>
              <p className="text-sm text-blue-700">
                제품을 추가하거나 수정합니다
              </p>
            </Link>

            <Link
              href="/admin/brands"
              className="bg-purple-50 hover:bg-purple-100 rounded-xl p-6 transition-all border border-purple-200"
            >
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="font-semibold text-purple-900 mb-1">
                브랜드 관리
              </h4>
              <p className="text-sm text-purple-700">
                브랜드를 추가하거나 수정합니다
              </p>
            </Link>

            <Link
              href="/admin/images"
              className="bg-pink-50 hover:bg-pink-100 rounded-xl p-6 transition-all border border-pink-200"
            >
              <div className="text-3xl mb-3">🖼️</div>
              <h4 className="font-semibold text-pink-900 mb-1">
                이미지 관리
              </h4>
              <p className="text-sm text-pink-700">
                제품 이미지를 업로드합니다
              </p>
            </Link>
          </div>
        </div>

        {/* 시스템 정보 */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            시스템 정보
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">데이터 저장 방식</span>
              <span className="font-medium text-gray-900">JSON 파일</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">인증 시스템</span>
              <span className="font-medium text-gray-900">NextAuth.js</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">배포 플랫폼</span>
              <span className="font-medium text-gray-900">Netlify</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">프레임워크</span>
              <span className="font-medium text-gray-900">
                Next.js 15.5.6
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

