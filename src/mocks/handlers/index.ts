import { kopisHandlers, kopisDetailHandlers } from "./kopis";
import { kakaoHandlers } from "./kakao";
import { recordHandlers } from "./record";
import { commentHandlers } from "./comment";

export const handlers = [
  ...kopisHandlers,
  ...kopisDetailHandlers,
  ...kakaoHandlers,
  ...recordHandlers,
  ...commentHandlers,
];
