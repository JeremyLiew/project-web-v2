<template>
	<v-card flat color="transparent">
		<div
			id="swiper"
			class="overflow-hidden"
		>
			<div class="swiper-wrapper">
				<template v-for="(photo, i) in items">
					<div
						:key="i"
						class="swiper-slide"
					>
						<div class="swiper-zoom-container">
							<slot
								name="image"
								:item="photo"
								:index="i"
							></slot>
						</div>
					</div>
				</template>
			</div>
		</div>
		<div
			id="thumbSwiper"
			class="overflow-hidden mt-1 position-relative"
		>
			<div class="swiper-wrapper">
				<template v-for="(photo, i) in items">
					<div
						:key="i"
						class="swiper-slide"
					>
						<slot
							name="image"
							:item="photo"
							:index="i"
						></slot>
					</div>
				</template>
			</div>
			<div id="thumbSwiper-button-next" class="position-absolute transform-center-y" style="right: 1px; top:40%; z-index: 1;">
				<v-btn
					depressed x-small
					dark plain :ripple="false"
				>
					<v-icon>mdi-chevron-right</v-icon>
				</v-btn>
			</div>
			<div id="thumbSwiper-button-prev" class="position-absolute transform-center-y" style="left: 1px; top:40%; z-index: 1;">
				<v-btn
					depressed x-small
					dark plain :ripple="false"
				>
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</div>
		</div>
	</v-card>
</template>

<script>
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
export default {
	props:{
		items: {
			type: Array,
			default: () => [],
		}
	},
	data() {
		return {
			swiper: null,
			thumbSwiper: null,
		}
	},
	mounted(){
		this.initSwiper()
	},
	methods:{
		initSwiper(){
			this.thumbSwiper = new Swiper("#thumbSwiper", {
				loop: false,
				spaceBetween: 5,
				slidesPerView: 4,
				freeMode: true,
				watchSlidesProgress: true,
				navigation: {
					nextEl: "#thumbSwiper-button-next",
					prevEl: "#thumbSwiper-button-prev",
				},
			});

			this.swiper = new Swiper("#swiper", {
				loop: false,
				spaceBetween: 1,
				grabCursor: true,
				thumbs: {
					swiper: this.thumbSwiper,
				},
				zoom: {
					maxRatio: 3.5,
					minRation: 1
				},
				on: {
					tap: function () {
						this.zoom.toggle();
					},
					slideChangeTransitionEnd: function(){
						this.zoom.out();
					},
				},
			});
		},
	}
}
</script>

<style scoped>
.swiper-slide {
	background-position: center;
	background-size: cover;
}

.thumbSwiper .swiper-slide {
	width: 25%;
	height: 100%;
	opacity: 0.4;
}

.thumbSwiper .swiper-slide-thumb-active {
	opacity: 1;
}
</style>