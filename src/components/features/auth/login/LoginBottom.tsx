import { Button } from "@/components/ui/button/Button";

export default function LoginBottom({
  onClickNavigation,
}: {
  onClickNavigation: () => void;
}) {
  return (
    <Button
      variant="outline"
      tone="primary"
      size="lg"
      onClick={onClickNavigation}
      className="w-full"
    >
      회원가입
    </Button>
  );
}