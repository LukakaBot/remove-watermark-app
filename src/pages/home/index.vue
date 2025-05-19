<template>
	<div class="page-wrapper flex flex-col justify-center items-center">
		<div
			class="bg-#fff border-solid border-1px border-gray-300 border-rd-10rpx overflow-hidden"
		>
			<wd-textarea
				v-model="shareContent"
				placeholder="请粘贴视频/图片地址"
				:maxlength="200"
				show-word-limit
			/>
		</div>
		<div class="flex gap-x-20rpx pt-20rpx">
			<wd-button
				type="error"
				:round="false"
				block
				plain
				:disabled="isNoShareContent"
				@click="handleClear"
			>
				清空
			</wd-button>
			<wd-button type="info" :round="false" block plain @click="handlePaste">
				粘贴
			</wd-button>
			<wd-button
				type="primary"
				:round="false"
				block
				plain
				:disabled="isNoShareContent"
				@click="handleSubmit"
			>
				提交
			</wd-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { fetchNoWatermarkVideoUrl } from '@/api/video';

const shareContent = ref('');

const isNoShareContent = computed(() => !shareContent.value);

function handleClear() {
	shareContent.value = '';
}

function handlePaste() {
	uni.getClipboardData({
		success: (res) => {
			shareContent.value = res.data.trim();
		},
		fail: (err) => {
			console.log(err);
			uni.showToast({ title: '获取剪贴板内容失败', icon: 'none' });
		},
		complete: () => {
			// do something
		},
	});
}

async function handleSubmit() {
	if (isNoShareContent.value) {
		uni.showToast({
			title: '请输入视频/图片地址',
			icon: 'none',
		});
		return;
	}

	try {
		uni.showLoading({
			title: '加载中',
			mask: true,
		});
		const data = await fetchNoWatermarkVideoUrl(shareContent.value);
		console.log(data);
	} finally {
		uni.hideLoading();
	}
}

onMounted(() => {
	shareContent.value =
		'8.18 https://v.douyin.com/JyCk5gy/ 复制佌鏈接，da鐦Dou音搜索，直接观看視频！';
});
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
