import { useTranslation } from "i18nexus";import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: NextRequest) {const { t } = useTranslation();
  try {
    const { notionUrl } = await request.json();

    if (!notionUrl || !notionUrl.includes("notion.")) {
      return NextResponse.json(
        { error: t("유효한 노션 URL이 아닙니다.") },
        { status: 400 }
      );
    }

    // 노션 페이지 ID 추출
    const pageId = extractPageId(notionUrl);
    if (!pageId) {
      return NextResponse.json(
        { error: t("노션 페이지 ID를 추출할 수 없습니다.") },
        { status: 400 }
      );
    }

    try {
      // 공개 노션 페이지 HTML 가져오기
      const response = await fetch(notionUrl, {
        headers: {
          "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });

      if (!response.ok) {
        throw new Error(t("노션 페이지를 가져올 수 없습니다."));
      }

      const html = await response.text();

      // Cheerio로 HTML 파싱
      const $ = cheerio.load(html);

      // 페이지 제목 추출
      const title =
      $("title").text() ||
      $('meta[property="og:title"]').attr("content") || t("제목 없음");


      // 본문 텍스트 추출
      let contentText = "";

      // 노션 페이지의 주요 컨텐츠 선택자들
      const selectors = [
      ".notion-page-content",
      '[data-block-id]',
      ".notion-selectable",
      "article",
      "main"];


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
        contentText = $("body").
        text().
        replace(/\s+/g, " ").
        trim();
      }

      // 결과 포맷팅
      const formattedText = t("[노션 페이지에서 추출된 텍스트]\n\n페이지 URL: {{notionUrl}}\n페이지 제목: {{title}}\n추출 일시: {{expr2}}\n\n{{expr3}}\n\n{{contentText}}\n\n{{expr5}}\n\n※ 이 내용은 공개 노션 페이지에서 자동으로 추출되었습니다.\n※ 더 정확한 추출을 위해서는 노션 Integration을 사용하세요.", { notionUrl:

        notionUrl, title:
        title, expr2:
        new Date().toLocaleString("ko-KR"), expr3:

        "=".repeat(60), contentText:

        contentText, expr5:

        "=".repeat(60) });




      return NextResponse.json({ text: formattedText });
    } catch (fetchError) {
      console.error(t("노션 페이지 가져오기 실패:"), fetchError);

      // 실패 시 시뮬레이션 데이터 반환 (개발용)
      const simulatedText = t("[노션 페이지 접근 실패 - 시뮬레이션 데이터]\n\n페이지 URL: {{notionUrl}}\n페이지 ID: {{pageId}}\n\n⚠️ 노션 페이지를 가져올 수 없습니다.\n다음 사항을 확인해주세요:\n1. 페이지가 \"웹에 게시\" 설정이 되어 있는지 확인\n2. 페이지 링크가 올바른지 확인\n3. 페이지가 공개되어 있는지 확인\n\n{{expr2}}\n\n[시뮬레이션 데이터]\n\n프로젝트 개요\n이 프로젝트는 현대적인 웹 기술 스택을 활용하여 사용자 경험을 극대화한 애플리케이션입니다.\n\n핵심 기능\n1. 사용자 인증 및 권한 관리\n   - JWT 기반 인증 시스템\n   - Role-based Access Control (RBAC)\n   \n2. 실시간 데이터 동기화\n   - WebSocket을 통한 실시간 업데이트\n   - Optimistic UI 업데이트\n   \n3. 반응형 디자인\n   - 모바일 퍼스트 접근\n   - 다크 모드 지원\n\n기술 스택\n• Frontend: React 18, Next.js 14, TypeScript\n• Styling: Tailwind CSS, Framer Motion\n• State Management: Zustand, React Query\n• Backend: Node.js, Express, PostgreSQL\n• DevOps: Docker, AWS ECS, GitHub Actions\n\n주요 성과\n✅ 페이지 로딩 속도 60% 개선\n✅ 사용자 만족도 95% 달성\n✅ 월간 활성 사용자 10,000명 이상\n✅ 코드 커버리지 85% 달성\n\n기술적 도전과 해결\n복잡한 비즈니스 로직을 효율적으로 처리하기 위해 상태 관리 패턴을 최적화하고,\n캐싱 전략을 통해 성능을 크게 향상시켰습니다.\n\n배운 점\n- 확장 가능한 아키텍처 설계의 중요성\n- 사용자 피드백의 가치\n- 팀 협업과 코드 리뷰 문화\n\n{{expr3}}\n\n작성일: {{expr4}}", { notionUrl:

        notionUrl, pageId:
        pageId, expr2:







        "=".repeat(60), expr3:









































        "=".repeat(60), expr4:

        new Date().toLocaleDateString("ko-KR") });

      return NextResponse.json({ text: simulatedText });
    }
  } catch (error) {
    console.error(t("노션 텍스트 추출 오류:"), error);
    return NextResponse.json(
      { error: t("노션 텍스트 추출에 실패했습니다.") },
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