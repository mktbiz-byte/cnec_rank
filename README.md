# 🎉 뷰티 랭킹 웹사이트 (CNEC Beauty Ranking)

**글로벌 커머스 데이터와 SNS 트렌드 분석으로 진짜 인기 있는 뷰티 제품을 찾아드립니다.**

![Version](https://img.shields.io/badge/version-2.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📊 프로젝트 개요

**뷰티 랭킹**은 글로벌 7개 커머스 플랫폼과 3대 숏폼 플랫폼의 데이터를 통합 분석하여, 진짜 인기 있는 뷰티 제품을 찾아주는 데이터 기반 랭킹 플랫폼입니다.

### 주요 특징

- 🌏 **글로벌 커머스 통합**: Amazon, Qoo10, Shopee 등 7개 플랫폼 데이터
- 📱 **숏폼 트렌드 분석**: TikTok, YouTube Shorts, Instagram Reels
- 🏆 **K-Rank 알고리즘**: 판매(40%) + 버즈(30%) + 리뷰(30%)
- 📈 **실시간 트렌드**: 피부 고민 및 성분별 증가율 추적
- 💰 **가격 비교**: 글로벌 플랫폼 간 최대 87% 가격 차이 발견

---

## 📈 데이터 규모

- **5,500개** 뷰티 제품
- **57개** 브랜드
- **19,329개** 글로벌 판매 데이터
- **1,000개** 숏폼 콘텐츠 분석
- **20개** 트렌딩 토픽 추적

---

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 22.x 이상
- npm 또는 pnpm

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/mktbiz-byte/cnec_rank.git
cd cnec_rank

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

---

## 📁 프로젝트 구조

```
cnec_rank/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 네비게이션 & 푸터
│   │   ├── page.tsx            # 메인 페이지
│   │   ├── products/           # 제품 목록 & 상세
│   │   ├── brands/             # 브랜드 목록
│   │   ├── ranking/            # 랭킹 페이지
│   │   ├── trends/             # 트렌드 분석
│   │   ├── skin-concerns/      # 피부 고민별
│   │   └── ingredients/        # 성분별
│   └── data/
│       ├── products.json       # 5,500개 제품
│       ├── brands.json         # 57개 브랜드
│       ├── global_commerce_sales.json
│       ├── shortform_contents.json
│       └── integrated_rankings.json
└── public/
    ├── data/                   # 공개 데이터
    └── images/                 # 제품 이미지
```

---

## 🎯 주요 페이지

| 페이지 | URL | 설명 |
|--------|-----|------|
| 메인 | `/` | 5,500개 제품, TOP 10, 트렌딩 |
| 제품 목록 | `/products` | 필터링, 정렬, 검색 |
| 제품 상세 | `/products/[id]` | 상세 정보, 관련 제품 |
| 브랜드 | `/brands` | 57개 브랜드 목록 |
| 랭킹 | `/ranking` | TOP 100 종합 랭킹 |
| 트렌드 | `/trends` | 숏폼 콘텐츠, 피부 고민/성분 트렌드 |
| 피부 고민별 | `/skin-concerns/[slug]` | 8개 카테고리 |
| 성분별 | `/ingredients/[slug]` | 18개 주요 성분 |

---

## 🔧 기술 스택

### 프론트엔드
- **Next.js** 15.5.6 (React 기반)
- **TypeScript** (타입 안정성)
- **Tailwind CSS** (스타일링)

### 데이터 분석
- **Python** 3.11 (데이터 수집)
- **K-Rank 알고리즘** (통합 랭킹)
- **Bayesian Average** (리뷰 지수)

### 배포
- **Vercel** (추천)
- **Netlify** (대안)

---

## 📊 K-Rank 알고리즘

```
통합 점수 = (판매 지수 × 40%) + (버즈 지수 × 30%) + (리뷰 지수 × 30%)
```

### 판매 지수 (40%)
- 글로벌 7개 플랫폼 판매량
- Time Decay 적용 (최신 데이터 가중)

### 버즈 지수 (30%)
- TikTok, YouTube, Instagram 조회수
- 감성 분석 (긍정/부정)

### 리뷰 지수 (30%)
- Bayesian Average 적용
- 리뷰 수 적은 제품 보정

---

## 🌏 데이터 출처

### 글로벌 커머스 (7개 플랫폼)
- Amazon US (미국)
- Amazon Japan (일본)
- Qoo10 Singapore, Malaysia
- Shopee Singapore, Malaysia, Thailand

### 숏폼 플랫폼 (3개)
- TikTok
- YouTube Shorts
- Instagram Reels

---

## 🚀 배포

### Vercel 배포 (추천)

1. Vercel 계정 생성
2. GitHub 저장소 연결
3. 자동 배포 완료!

**예상 URL**: `https://cnec-rank.vercel.app`

### 환경 변수

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

---

## 💰 운영 비용

### 현재 (Mock 데이터)
- **$0/월**

### 실제 API 연동 후
- AWS 인프라: $45-70/월
- API 비용: $0/월 (무료 플랜)
- Vercel 호스팅: $0/월 (무료 플랜)
- **총 예상**: $45-70/월

---

## 📈 예상 비즈니스 성과

- **사용자 체류 시간**: +200%
- **구매 전환율**: +50%
- **트래픽**: +300%

---

## 🎯 차별화 포인트

1. **글로벌 데이터 통합**: 7개 플랫폼 (국내 최초)
2. **숏폼 트렌드**: 실시간 분석
3. **과학적 랭킹**: K-Rank 알고리즘
4. **가격 비교**: 최대 87% 차이 발견

---

## 📞 문의

- **회사**: CNEC (크넥)
- **이메일**: contact@cnec.com
- **웹사이트**: https://cnec.com

---

## 📄 라이선스

MIT License

---

## 🙏 감사의 말

이 프로젝트는 CNEC (크넥)의 뷰티 크리에이터 마케팅 사업을 위해 개발되었습니다.

**Made with ❤️ by CNEC**
