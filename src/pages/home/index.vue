<template>
	<div class="page-wrapper flex flex-col justify-center items-center">
		<image class="logo" src="/static/images/logo.png" />
		<h1 class="text-center">Serene Mobile</h1>
	</div>
</template>

<script setup lang="ts">
import { fetchNoWatermarkVideoUrl } from '@/api/video';
import { useLoading } from '@/hooks';

const [loading, setLoading] = useLoading();

const shareContent = ref('');

async function getNoWatermarkVideoUrl() {
	try {
		setLoading(true);
		const data = await fetchNoWatermarkVideoUrl(shareContent.value);
		console.log(data.play_addr.url_list[0]);
	} finally {
		setLoading(false);
	}
}

onMounted(() => {
	shareContent.value =
		'8.18 https://v.douyin.com/JyCk5gy/ 复制佌鏈接，da鐦Dou音搜索，直接观看視频！';
	getNoWatermarkVideoUrl();
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
