<template>
	<v-sheet style="background:linear-gradient(0deg,#242424, #000000);" class="fill-height">
		<section v-if="hasData">
			<v-sheet color="transparent">
				<v-container fill-height class="justify-center align-center" :style="$vuetify.breakpoint.mdAndUp?'padding-top:150px;':'padding-top:90px;'">
					<v-row class="font-family-secondary text-center white--text text-h6 text-md-h5 custom-transform-class align-center">
						<v-col
							class="pt-0 text-start" cols="6" md="3"
							order="0" order-md="0"
						>
							<v-btn
								plain depressed :ripple="false"
								class="px-0" @click="$router.go(-1)"
							>
								<v-icon v-if="$vuetify.breakpoint.mdAndUp" color="secondary" large>mdi-chevron-left</v-icon><v-icon v-else color="secondary" small>mdi-chevron-left</v-icon> Back
							</v-btn>
						</v-col>
						<v-col
							class="pt-10 pt-md-0 px-1" cols="12" md="6"
							order="2" order-md="1"
						>
							<span class="font-weight-black mr-n1">{{ titlePrefix.cronus }}</span>
							<span class="font-weight-light">{{ titlePrefix.art }}</span>
							{{ productInfo.name }}
						</v-col>
						<v-col
							class="pt-0 text-end" cols="6" md="3"
							order="1" order-md="2" style="word-break:break-word;"
						>
							<span class="font-weight-medium text-body-2 px-4">{{ productInfo.model }}</span>
						</v-col>
					</v-row>
					<v-row class="flex-column text-center" style="word-break:break-word;">
						<v-col class="pt-0">{{ productInfo.subtitle }}</v-col>
						<v-col v-if="productInfo.lowest_price == 0" class="font-weight-light">Price Upon Request</v-col>
						<v-col v-else class="font-weight-light">From MYR {{ thousandFilter(productInfo.lowest_price) }}</v-col>
						<v-col>
							<v-btn
								tile outlined color="white"
								href="https://api.whatsapp.com/send?phone=60177891551"
								target="_blank" :class="!$vuetify.breakpoint.mdAndUp?'px-2':''"
							>
								<v-icon class="pr-1" :class="!$vuetify.breakpoint.mdAndUp?'text-h6':''">mdi-whatsapp</v-icon> <span :class="!$vuetify.breakpoint.mdAndUp?'text-caption':''">Contact Us</span>
							</v-btn>
						</v-col>
					</v-row>
					<v-container class="pt-6">
						<template v-if="modelLoading">
							<v-skeleton-loader
								type="image"
								class="mb-5"
								width="100%"
							>
							</v-skeleton-loader>
						</template>
						<template v-else>
							<v-img
								contain width="100%"
								:aspect-ratio="$vuetify.breakpoint.mdAndUp ? 14/6 : 1"
								:src="productInfo.image.path_url"
							>
							</v-img>
						</template>
					</v-container>
				</v-container>

				<v-container class="px-6">
					<template v-if="modelLoading">
						<!-- Overview section -->
						<v-row class="pt-6" style="word-break:break-word;">
							<v-col>
								<v-skeleton-loader
									type="paragraph"
									class="mb-5"
								>
								</v-skeleton-loader>
							</v-col>
						</v-row>
						<v-skeleton-loader
							type="image"
							class="mb-5"
							width="100%"
						>
						</v-skeleton-loader>
					</template>
					<template v-else>
						<template v-if="productInfo.detail.description != null || productInfo.detail.poster != null">
							<!-- Overview section -->
							<v-row class="pt-6" style="word-break:break-word;">
								<v-col class="font-weight-bold" cols="12">
									Overview
								</v-col>
								<template v-if="productInfo.detail.description != null">
									<v-col class="text-caption" cols="12">
										{{ productInfo.detail.description }}
									</v-col>
								</template>
							</v-row>
							<template v-if="productInfo.detail.poster != null">
								<v-img class="mt-14" :aspect-ratio="$vuetify.breakpoint.mdAndUp?8/2:1.2/1" :src="productInfo.detail.poster.path_url">
								</v-img>
							</template>
						</template>
					</template>
				</v-container>

				<v-container v-if="productInfo.galleries != 0" class="px-6">
					<!-- Gallery section -->
					<div class="py-6">Gallery</div>
					<!-- <v-tabs
						slider-color="secondary"
						slider-size="2"
						color="white"
						background-color="transparent"
					>
						<v-tab class="text-caption">Photo</v-tab>
					</v-tabs> -->
					<div class="d-inline-block" style="border-bottom:2px solid white; padding-bottom:2px;"><span>Photo</span></div>
					<v-divider class="secondary"></v-divider>
					<template v-if="modelLoading">
						<v-skeleton-loader
							type="image"
							class="mb-5"
							width="100%"
						>
						</v-skeleton-loader>
					</template>
					<template v-else>
						<custom-carousel
							:length="productInfo.galleries.length"
							:show-arrows="true"
							cycle
							eager
							class="py-5"
						>
							<template v-for="(gallery, i) in productInfo.galleries">
								<v-carousel-item
									:key="i"
									eager
									fill-height
								>
									<!-- $vuetify.breakpoint.mdAndUp -->
									<div>
										<v-img
											:src="gallery.content.path_url"
											eager
											:aspect-ratio="$vuetify.breakpoint.mdAndUp? 2.5/1 : 1"
										></v-img>
									</div>
								</v-carousel-item>
							</template>
						</custom-carousel>
					</template>
				</v-container>

				<v-container class="px-6" style="padding-bottom:150px;">
					<!-- Specification section -->
					<div class="py-5 pb-10">Specifications</div>
					<v-expansion-panels
						flat tile style="border:2px solid white;"
						:mandatory="open"
					>
						<v-expansion-panel @click="open = !open">
							<v-expansion-panel-header style="word-break:break-word;" color="transparent" class="text-subtitle-2 text-md-h6">
								<div>
									{{ titlePrefix.cronus }} <span class="font-weight-light ml-md-n1" :style="$vuetify.breakpoint.smAndDown?'margin-left:-3px;':''">{{ titlePrefix.art }}</span> {{ productInfo.name }}
								</div>
							</v-expansion-panel-header>
							<v-expansion-panel-content color="transparent">
								<v-row>
									<v-col class="px-1" cols="12"><v-divider class="white"></v-divider></v-col>
								</v-row>
								<v-row
									v-for="(spec,i) in productInfo.specifications"
									:key="i"
								>
									<v-col class="px-5" cols="6"><div style="word-break:break-word;">{{ spec.title }}</div></v-col>
									<v-col class="px-5" cols="6"><div style="word-break:break-word;">{{ spec.value }}</div></v-col>
									<v-col class="px-1" cols="12"><v-divider class="white"></v-divider></v-col>
								</v-row>
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-container>
			</v-sheet>
		</section>
		<section v-else>
			<v-sheet color="transparent">
				<v-container style="padding-top:100px;">
					<v-sheet class="px-5 pt-5 pb-16">
						<v-row>
							<v-col cols="12">
								<div class="text-center pa-16">
									<div><v-icon class="text-h2 text-md-h1">mdi-package-variant</v-icon></div>
									<div class="pt-2 font-italic">No Data Available</div>
								</div>
							</v-col>
						</v-row>
					</v-sheet>
				</v-container>
			</v-sheet>
		</section>
	</v-sheet>
</template>

<script>
import ProductClient from "../client"
import Helper from '@shared/libs/HelperManager';
import CustomCarousel from '@web/components/CustomCarousel.vue';

export default {
	components:{
		CustomCarousel,
	},
	data() {
		return {
			productInfo: {},
			paramId:'',
			hasData:true,
			modelLoading:true,
			titlePrefix:{
				cronus:"CRONUS",
				art:"ART"
			},
			open:true,
		}
	},
	mounted(){
	},
	created(){
		this.paramId = this.$route.params.model
		this.getProductInfo()
	},
	methods:{
		handler() {
			let toggleDropdown = document.getElementById("description-dropdown-button");
			toggleDropdown.addEventListener("click", function() {
				document.querySelector(".description-details").classList.toggle("active");
				document.querySelector(".description-details").classList.toggle("hidden");

				document.querySelector(".description-arrow").classList.toggle("hidden");
			});
		},
		rowAlter(){
			if(this.$vuetify.breakpoint.smAndDown){
				return 'flex-column'
			}
		},
		getProductInfo()
		{
			this.modelLoading = true;
			ProductClient.getProductInfo(this.paramId).then((res) => {
				let result = res.data.data
				this.productInfo = result
			}).catch((err) => {
				this.$toast.error(err.data.message)
				this.hasData = false
			}).finally(()=>{
				this.modelLoading = false
			});
		},
		viewContent(item){
			// todo
		},
		thousandFilter(price){
			if(price){
				return Helper.formatThousandSeparator(price.toString())
			}
		},
	},
}
</script>

<style scoped>
.v-expansion-panel-content >>> .v-expansion-panel-content__wrap {
    padding: 0 16px 16px !important;
}
</style>


