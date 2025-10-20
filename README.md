# 뷰티 랭킹 - 데이터 기반 K-뷰티 제품 랭킹 웹사이트

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

**5,500개 이상의 한국 뷰티 제품**을 판매량, 평점, 리뷰를 기반으로 랭킹하는 데이터 기반 웹사이트입니다.

## 🌟 주요 기능

- ✨ **5,500개 제품 데이터** - 스킨케어, 메이크업 전 카테고리
- 🏆 **종합 랭킹 시스템** - 판매량(50%) + 평점(30%) + 리뷰(20%)
- 🎯 **피부 고민별 필터** - 여드름, 모공, 수분부족, 주름 등 8개 카테고리
- 🧪 **성분별 검색** - PDRN, 트라넥삼산, 나이아신아마이드, 레티놀 등 18개 성분
- 🏢 **57개 브랜드** - 한국 및 글로벌 뷰티 브랜드
- 📱 **반응형 디자인** - 모바일, 태블릿, 데스크톱 완벽 지원

## 🚀 빠른 시작

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build
npm run start
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## 📊 데이터 통계

- **총 제품**: 5,500개
- **스킨케어**: 4,376개 (79.6%)
- **메이크업**: 1,124개 (20.4%)
- **평균 가격**: 34,445원
- **평균 평점**: 4.49점

## 🚀 배포

### Vercel 배포 (추천)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com) 방문
3. GitHub 저장소 연결
4. 자동 배포

자세한 배포 방법은 [배포 가이드](../deployment_guide.md)를 참조하세요.

## 📁 프로젝트 구조

```
beauty-ranking-site/
├── src/app/              # Next.js 페이지
├── src/data/             # 제품 & 브랜드 데이터
├── public/images/        # 제품 이미지
└── beauty_products.db    # SQLite DB
```

## 🛠️ 기술 스택

- **프레임워크**: Next.js 15.5.6
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **데이터베이스**: SQLite

## 📝 라이선스

MIT License

---

**Made with ❤️ for K-Beauty lovers**

