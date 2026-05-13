import { JSX } from "react";
import { MOCK_FEELLOG_KEYWORDS, MOCK_MARKET_KEYWORDS } from "../../constants";
import KeywordDashBoard from "../KeywordDashBoard/KeywordDashBoard";
import { Button } from "@/components/ui/button/Button";

export default function SingleDashBoard({
  activeKeywordType,
  handleManualSwitch,
}: {
  activeKeywordType: "feelog" | "market";
  handleManualSwitch: (type: "feelog" | "market") => void;
}): JSX.Element {
  return (
    <div className="lg:hidden">
      {/* TODO: mock데이터 말고 실제 데이터로 넘겨주기 */}
      {MOCK_FEELLOG_KEYWORDS.length > 0 && MOCK_MARKET_KEYWORDS.length > 0 && (
        <section>
          {/* Switch Buttons */}
          <div className="flex gap-2 mb-4">
            <Button
              size="md"
              variant={activeKeywordType === "feelog" ? "solid" : "outline"}
              tone={activeKeywordType === "feelog" ? "accent" : "primary"}
              onClick={() => handleManualSwitch("feelog")}
              className="flex-1"
            >
              필로그 키워드
            </Button>
            <Button
              size="md"
              variant={activeKeywordType === "market" ? "solid" : "outline"}
              tone={activeKeywordType === "market" ? "accent" : "primary"}
              onClick={() => handleManualSwitch("market")}
              className="flex-1"
            >
              마켓 키워드
            </Button>
          </div>

          {/* Content Container */}
          <div className="relative">
            <div
              className={`transition-opacity duration-500 ${
                activeKeywordType === "feelog"
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              {MOCK_FEELLOG_KEYWORDS.length > 0 && (
                <section>
                  <KeywordDashBoard
                    keywords={MOCK_FEELLOG_KEYWORDS}
                    variant="feelog"
                  />
                </section>
              )}
            </div>
            <div
              className={`transition-opacity duration-500 ${
                activeKeywordType === "market"
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              {MOCK_MARKET_KEYWORDS.length > 0 && (
                <section>
                  <KeywordDashBoard
                    keywords={MOCK_MARKET_KEYWORDS}
                    variant="market"
                  />
                </section>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
