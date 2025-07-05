import type { VideoInfo } from "./types";
import request from "@/utils/service";


/** 获取视频信息 */
export function fetchVideoInfo(share_content: string): Promise<VideoInfo> {
  return request.post(
    "/douyin",
    { share_content }
  );
}