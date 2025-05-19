import request from '@/utils/service';
import type { VideoDetail } from './types';

/** 获取无水印视频地址 */
export function fetchNoWatermarkVideoUrl(shareContent: string): Promise<VideoDetail> {
  return request.post('/douyin', {
    'share_content': shareContent
  })
}