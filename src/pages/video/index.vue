<template>
	<div class="flex flex-col gap-20rpx">
		<div>解析结果</div>
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
import { useVideoStore } from '@/store';

const videoStore = useVideoStore();

/** 短视频地址 */
const shortVideoUrl = ref('');

/** 处理后的视频信息 */
const videoInfo = ref<VideoInfo>();

const progress = ref('0');

function handleDownload() {
	uni.showLoading({
		title: `下载进度：${progress.value}%`,
	});
	const downloadTask = uni.downloadFile({
		url: shortVideoUrl.value,
		success: (res) => {
			console.log(res);
			uni.saveVideoToPhotosAlbum({
				filePath: res.tempFilePath,
				success: () => {
					uni.showToast({
						icon: 'success',
						title: '保存成功',
					});
				},
				fail: (err) => {
					console.log(err);
					uni.showToast({
						icon: 'error',
						title: '保存失败',
					});
				},
				complete: () => {
					uni.hideLoading();
				},
			});
		},
	});

	downloadTask.onProgressUpdate((res) => {
		console.log('下载进度：' + res.progress);
		console.log('已经下载的数据长度：' + res.totalBytesWritten);
		console.log('预期需要下载的数据长度：' + res.totalBytesExpectedToWrite);
		if (res.progress >= 100) {
			uni.hideLoading();
		}
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
