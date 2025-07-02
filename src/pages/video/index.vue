<template>
	<div class="flex flex-col gap-20rpx">
		<div class="flex justify-center">
			<video
				id="myVideo"
				class="w-full"
				src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
				@error="loadVideoError"
				controls
			></video>
		</div>
		<div class="px-20rpx">
			<wd-button
				type="primary"
				:round="false"
				block
				plain
				@click="handleDownload"
			>
				下载
			</wd-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import type { VideoInfo } from '@/api/video/types';

/** 短视频地址 */
const shortVideoUrl = ref('');

/** 处理后的视频信息 */
const videoInfo = ref<VideoInfo>();

function handleDownload() {
	uni.downloadFile({
		url: shortVideoUrl.value,
		success: (res) => {
			console.log(res);
			uni.saveVideoToPhotosAlbum({
				filePath: res.tempFilePath,
				success: (res) => {
					uni.showToast({
						title: '保存成功',
					});
				},
				fail: (err) => {
					console.log(err);
				},
			});
		},
	});
}

function loadVideoError() {
	console.log('视频加载失败');
}

async function init() {}

onMounted(() => init());

onLoad((options) => {
	if (options?.url) {
		shortVideoUrl.value = options.url;
	}
});
</script>

<style scoped></style>
