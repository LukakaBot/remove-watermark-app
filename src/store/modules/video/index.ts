import { defineStore } from "pinia";
import type { VideoInfo } from '@/api/video/types';

interface VideoState {
  videoInfo?: VideoInfo | null;
}

export const useVideoStore = defineStore('video-store', {
  persist: true,
  state: (): VideoState => ({
    videoInfo: null
  }),
  actions: {
    setVideoInfo(videoInfo: VideoInfo) {
      this.videoInfo = videoInfo;
    },
    clearVideoInfo() {
      this.videoInfo = null;
    },
    getVideoInfo() {
      return this.videoInfo;
    }
  }
})