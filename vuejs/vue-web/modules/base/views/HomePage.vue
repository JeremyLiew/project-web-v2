<template>
	<v-sheet class="fill-height" color="transparent">
		<section class="fill-height">
			<v-carousel
				ref="carouselBanner"
				v-model="carousel"
				continuous
				hide-delimiter-background
				hide-delimiters
				:show-arrows="false"
				height="100%"
				class="position-relative"
			>
				<template v-for="(banner, i) in banners">
					<v-carousel-item
						:key="i"
						eager
					>
						<template v-if="$vuetify.breakpoint.mdAndUp">
							<v-img
								:src="banner.image.path_url"
								eager
								:aspect-ratio="16/7"
								height="100%"
							>
								<div
									v-if="banner.title && banner.subtitle"
									class="web-banner-section"
									:class="$vuetify.breakpoint.lgAndUp ? 'largeView-banner-section' : ''"
								>
									<div class="web-banner-sub-title text-uppercase">{{ banner.subtitle }}</div>
									<div class="web-banner-title">{{ banner.title }}</div>
									<div class="mt-5" style="display: inline-flex">
										<v-img
											id="banner-arrow-left"
											style="cursor: pointer"
											src="/images/homePage/previous.png"
											class="mr-10"
											width="70"
											height="70"
											@click="arrowPrev"
										></v-img>
										<v-img
											id="banner-arrow-right"
											style="cursor: pointer"
											src="/images/homePage/next.png"
											class="mr-10"
											width="70"
											height="70"
											@click="arrowNext"
										></v-img>
									</div>
								</div>
							</v-img>
						</template>
						<template v-else>
							<v-img
								:src="banner.mobile_image.path_url"
								eager
								:aspect-ratio="1/2"
							>
								<div v-if="banner.title && banner.subtitle" class="mobile-banner-section">
									<div class="mobile-banner-sub-title text-uppercase">{{ banner.subtitle }}</div>
									<div class="mobile-banner-title mt-2">{{ banner.title }}</div>
									<div class="mt-5" style="display: inline-flex">
										<v-img
											id="banner-arrow-left"
											src="/images/homePage/previous.png"
											class="mr-10"
											width="50"
											height="50"
											@click="arrowPrev"
										></v-img>
										<v-img
											id="banner-arrow-left"
											src="/images/homePage/next.png"
											class="mr-10"
											width="50"
											height="50"
											@click="arrowNext"
										></v-img>
									</div>
								</div>
							</v-img>
						</template>
					</v-carousel-item>
				</template>
				<div :class="$vuetify.breakpoint.mdAndUp ? 'position-absolute banner-pagination-section' : 'position-absolute mobile-banner-pagination-section'">
					<v-item-group
						v-model="carousel"
						class="transform-center-x fill-height"
					>
						<v-row>
							<template v-for="(banner, i) in banners">
								<v-col :key="i" cols="auto">
									<v-item v-slot="{ active, toggle }">
										<v-card class="banner-pagination-circle" @click="toggle">
											<div v-if="active">
												<div :class="$vuetify.breakpoint.smAndDown ? 'mobile-banner-pagination' : 'banner-pagination'" class="active"></div>
											</div>
											<div v-else>
												<div
													:class="$vuetify.breakpoint.smAndDown ? 'mobile-banner-pagination' : 'banner-pagination'"
												></div>
											</div>
										</v-card>
									</v-item>
								</v-col>
							</template>
						</v-row>
					</v-item-group>
				</div>
			</v-carousel>
		</section>
	</v-sheet>
</template>


<script>
import { errorHandlerMixin } from "@web/mixins/ErrorHandlerMixin";

import BaseClient from "../client";

export default {
	components: {
	},
	mixins: [
		errorHandlerMixin,
	],
	props: {
		showArrows: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			banners: [],
			carousel: 0,
		}
	},
	created(){
		this.getData()
	},
	methods: {
		getData() {
			BaseClient.getHomePage().then((res) => {
				let result = res.data.data;
				// banners
				this.banners = result.banners;
			});
		},
		arrowPrev() {
			this.$refs.carouselBanner.prev()
		},
		arrowNext() {
			this.$refs.carouselBanner.next()
		}
	},
};
</script>

<style scoped>
/* Web Banner section */
.web-banner-section {
	height: 100%;
	padding: 200px 150px;
	background-color: rgb(0,0,0,0.4);
}

.web-banner-section.largeView-banner-section{
	height: 100%;
	padding: 300px 150px;
	background-color: rgb(0,0,0,0.4);
}
.web-banner-title {
	font-size: 64px;
	color: #ffffff;
	text-transform: capitalize;
}
.web-banner-subtitle {
	font-size: 20px;
	color: #ffffff;
	font-weight: 900;
}
/* Mobile Banner section */
.mobile-banner-section {
	height: 100%;
	word-break: break-word;
	padding: 300px 50px;
	background-color: rgb(0,0,0,0.6);
}
.mobile-banner-title {
	font-size: 24px;
	color: #ffffff;
}
.mobile-banner-subtitle {
	font-size: 12px;
	color: #ffffff;
	font-weight: 900;
}

#mobile-banner-arrow-left,
#mobile-banner-arrow-right {
    padding: 30px 0px;
	background: none !important;
	box-shadow: none !important;
}

#mobile-banner-arrow-left-icon,
#mobile-banner-arrow-right-icon {
	font-size: 30px !important;
	background: rgba(0, 0, 0, 0.6) !important;
	border: 1px solid #ffffff;
    border-radius: 30px;
	padding: 0px 5px;
}
.mobile-banner-title {
	text-transform: capitalize;
}
/* Banner pagination */
.banner-pagination-section {
	width: 100%;
	display: flex;
	bottom: 5%;
}
.banner-pagination {
	width: 20px;
	height: 20px;
	border: 3px solid #ffffff;
	border-radius: 50%;
}

.banner-pagination.active {
	background: #ffffff;
}

.banner-pagination-circle {
	background-color: transparent !important;
}

.mobile-banner-pagination-section {
	width: 100%;
	display: flex;
	bottom: 5%;
}

.mobile-banner-pagination {
	width: 15px;
	height: 15px;
	border: 3px solid #ffffff;
	border-radius: 50%;
}
.mobile-banner-pagination.active {
	background: #ffffff;
}
</style>