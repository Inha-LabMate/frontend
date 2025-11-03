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
        "[data-block-id]",
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
        contentText = $("body").text().replace(/\s+/g, " ").trim();
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
      return NextResponse.json(
        { error: "노션 페이지를 가져올 수 없습니다." },
        { status: 502 }
      );
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
    const match = url.match(
      /([a-f0-9]{32})|([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i
    );
    return match ? match[0].replace(/-/g, "") : null;
  } catch {
    return null;
  }
}
