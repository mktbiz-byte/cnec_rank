#!/bin/bash

# 뷰티 랭킹 웹사이트 배포 스크립트

echo "======================================"
echo "뷰티 랭킹 웹사이트 배포 준비"
echo "======================================"

# 현재 디렉토리 확인
if [ ! -f "package.json" ]; then
    echo "❌ 오류: package.json을 찾을 수 없습니다."
    echo "프로젝트 디렉토리에서 실행하세요."
    exit 1
fi

echo ""
echo "1️⃣  의존성 설치 중..."
npm install

echo ""
echo "2️⃣  프로덕션 빌드 중..."
npm run build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 빌드 성공!"
    echo ""
    echo "======================================"
    echo "배포 옵션"
    echo "======================================"
    echo ""
    echo "A. Vercel 배포 (추천)"
    echo "   1. GitHub에 코드 푸시"
    echo "   2. https://vercel.com 방문"
    echo "   3. GitHub 저장소 연결"
    echo "   4. 자동 배포"
    echo ""
    echo "B. 로컬 서버 실행"
    echo "   npm run start"
    echo "   (http://localhost:3000)"
    echo ""
    echo "C. PM2로 백그라운드 실행"
    echo "   pm2 start npm --name beauty-ranking -- start"
    echo ""
    echo "======================================"
    echo ""
    echo "📖 자세한 배포 가이드:"
    echo "   /home/ubuntu/deployment_guide.md"
    echo ""
else
    echo ""
    echo "❌ 빌드 실패!"
    echo "오류 메시지를 확인하세요."
    exit 1
fi

