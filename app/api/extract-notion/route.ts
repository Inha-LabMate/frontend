import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: NextRequest) {
  try {
    const { notionUrl } = await request.json();

    if (!notionUrl || !notionUrl.includes("notion.")) {
      return NextResponse.json(
        { error: "유효한 노션 URL이 아닙니다." },
        { status: 400 }
      );
    }

    // 노션 페이지 ID 추출
    const pageId = extractPageId(notionUrl);
    if (!pageId) {
      return NextResponse.json(
        { error: "노션 페이지 ID를 추출할 수 없습니다." },
        { status: 400 }
      );
    }

    try {
      // 공개 노션 페이지 HTML 가져오기
      const response = await fetch(notionUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!response.ok) {
        throw new Error("노션 페이지를 가져올 수 없습니다.");
      }

      const html = await response.text();

      // Cheerio로 HTML 파싱
      const $ = cheerio.load(html);

      // 페이지 제목 추출
      const title =
        $("title").text() ||
        $('meta[property="og:title"]').attr("content") ||
        "제목 없음";

      // 본문 텍스트 추출
      let contentText = "";

      // 노션 페이지의 주요 컨텐츠 선택자들
      const selectors = [
        ".notion-page-content",
        '[data-block-id]',
        ".notion-selectable",
        "article",
        "main",
      ];

      for (const selector of selectors) {
        const elements = $(selector);
        if (elements.length > 0) {
          elements.each((_, element) => {
            const text = $(element).text().trim();
            if (text && text.length > 10) {
              contentText += text + "\n\n";
            }
          });
          break;
        }
      }

      // 텍스트가 추출되지 않은 경우 body 전체에서 추출
      if (!contentText || contentText.length < 100) {
        contentText = $("body")
          .text()
          .replace(/\s+/g, " ")
          .trim();
      }

      // 결과 포맷팅
      const formattedText = `[노션 페이지에서 추출된 텍스트]

페이지 URL: ${notionUrl}
페이지 제목: ${title}
추출 일시: ${new Date().toLocaleString("ko-KR")}

${"=".repeat(60)}

${contentText}

${"=".repeat(60)}

※ 이 내용은 공개 노션 페이지에서 자동으로 추출되었습니다.
※ 더 정확한 추출을 위해서는 노션 Integration을 사용하세요.`;

      return NextResponse.json({ text: formattedText });
    } catch (fetchError) {
      console.error("노션 페이지 가져오기 실패:", fetchError);

      // 실패 시 시뮬레이션 데이터 반환 (개발용)
      const simulatedText = `[노션 페이지 접근 실패 - 시뮬레이션 데이터]

페이지 URL: ${notionUrl}
페이지 ID: ${pageId}

⚠️ 노션 페이지를 가져올 수 없습니다.
다음 사항을 확인해주세요:
1. 페이지가 "웹에 게시" 설정이 되어 있는지 확인
2. 페이지 링크가 올바른지 확인
3. 페이지가 공개되어 있는지 확인

${"=".repeat(60)}

[시뮬레이션 데이터]

프로젝트 개요
이 프로젝트는 현대적인 웹 기술 스택을 활용하여 사용자 경험을 극대화한 애플리케이션입니다.

핵심 기능
1. 사용자 인증 및 권한 관리
   - JWT 기반 인증 시스템
   - Role-based Access Control (RBAC)
   
2. 실시간 데이터 동기화
   - WebSocket을 통한 실시간 업데이트
   - Optimistic UI 업데이트
   
3. 반응형 디자인
   - 모바일 퍼스트 접근
   - 다크 모드 지원

기술 스택
• Frontend: React 18, Next.js 14, TypeScript
• Styling: Tailwind CSS, Framer Motion
• State Management: Zustand, React Query
• Backend: Node.js, Express, PostgreSQL
• DevOps: Docker, AWS ECS, GitHub Actions

주요 성과
✅ 페이지 로딩 속도 60% 개선
✅ 사용자 만족도 95% 달성
✅ 월간 활성 사용자 10,000명 이상
✅ 코드 커버리지 85% 달성

기술적 도전과 해결
복잡한 비즈니스 로직을 효율적으로 처리하기 위해 상태 관리 패턴을 최적화하고,
캐싱 전략을 통해 성능을 크게 향상시켰습니다.

배운 점
- 확장 가능한 아키텍처 설계의 중요성
- 사용자 피드백의 가치
- 팀 협업과 코드 리뷰 문화

${"=".repeat(60)}

작성일: ${new Date().toLocaleDateString("ko-KR")}`;

      return NextResponse.json({ text: simulatedText });
    }
  } catch (error) {
    console.error("노션 텍스트 추출 오류:", error);
    return NextResponse.json(
      { error: "노션 텍스트 추출에 실패했습니다." },
      { status: 500 }
    );
  }
}

// 노션 URL에서 페이지 ID 추출
function extractPageId(url: string): string | null {
  try {
    // https://www.notion.so/myworkspace/Page-Title-abc123def456...
    // 또는 https://notion.so/abc123def456...
    const match = url.match(/([a-f0-9]{32})|([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i);
    return match ? match[0].replace(/-/g, "") : null;
  } catch {
    return null;
  }
}

