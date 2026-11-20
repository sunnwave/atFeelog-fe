import { Button } from "@/components/ui/button/Button";
import { IconButton } from "@/components/ui/button/IconButton";
import { Menu } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { useState } from "react";

export default function WriterMenu({
  onEditClick,
  onDeleteClick,
  icon = "v",
}: {
  icon?: "m" | "v";
  onEditClick: () => void;
  onDeleteClick: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <IconButton
        aria-label="메뉴 아이콘"
        onClick={() => setShowMenu(!showMenu)}
        size="xs"
      >
        {icon === "m" ? <Menu /> : <MoreVertical />}
      </IconButton>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-5 flex flex-col z-20 w-24 bg-card border  shadow-lg">
            <Button
              onClick={() => {
                onEditClick();
                setShowMenu(false);
              }}
              variant="ghost"
              size="sm"
              className="w-full font-normal "
            >
              수정하기
            </Button>
            <Button
              onClick={() => {
                onDeleteClick();
                setShowMenu(false);
              }}
              variant="ghost"
              tone="destructive"
              size="sm"
              className="w-full  font-normal"
            >
              삭제하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
