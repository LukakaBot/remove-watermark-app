<template>
  <div class="page-wrapper flex flex-col items-center py-3 px-5">
    <div
      class="m-b-40rpx w-full bg-#fff border-solid border-1px border-gray-300 border-rd-10rpx overflow-hidden"
    >
      <wd-textarea
        v-model="shareContent"
        placeholder="请粘贴视频/图片地址"
        :maxlength="200"
        show-word-limit
      />
    </div>
    <div class="flex gap-x-20rpx w-full">
      <wd-button
        class="w-full !min-w-unset"
        type="error"
        :round="false"
        block
        plain
        :disabled="isNoShareContent"
        @click="handleClear"
      >
        清空
      </wd-button>
      <wd-button
        class="w-full !min-w-unset"
        type="info"
        :round="false"
        block
        plain
        @click="handlePaste"
      >
        粘贴
      </wd-button>
      <wd-button
        class="w-full !min-w-unset"
        type="primary"
        :round="false"
        block
        plain
        :disabled="isNoShareContent"
        @click="handleSubmit"
      >
        解析
      </wd-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VideoInfo } from "@/api/video/types";
import { fetchVideoInfo } from "@/api/video";
import { useVideoStore } from "@/store";
import router from "@/router";

const videoStore = useVideoStore();

// const shareContent = ref('');
// TODO: debug
const shareContent = ref(
  "8.18 https://v.douyin.com/JyCk5gy/ 复制佌鏈接，da鐦Dou音搜索，直接观看視频！"
);

const videoInfo = ref<VideoInfo>();

const isNoShareContent = computed(() => !shareContent.value);

function handleClear() {
  shareContent.value = "";
}

function handlePaste() {
  uni.getClipboardData({
    success: (res) => {
      shareContent.value = res.data.trim();
    },
    fail: (err) => {
      console.log(err);
      uni.showToast({ title: "获取剪贴板内容失败", icon: "none" });
    },
    complete: () => {
      // do something
    },
  });
}

async function handleSubmit() {
  if (isNoShareContent.value) {
    uni.showToast({
      title: "请输入视频/图片地址",
      icon: "none",
    });
    return;
  }

  try {
    uni.showLoading({
      title: "加载中",
    });
    videoInfo.value = await fetchVideoInfo(shareContent.value);
    videoStore.setVideoInfo(videoInfo.value);
    uni.showToast({
      title: "获取视频信息成功",
      icon: "none",
      complete: () => {
        router.push({
          path: "/pages/video/index",
        });
      },
    });
  } finally {
    uni.hideLoading();
  }
}
</script>

<style scoped>
.logo {
  height: 200rpx;
  width: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}
</style>
