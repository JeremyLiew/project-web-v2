<template>
	<v-sheet class="fill-height" style="background:linear-gradient(0deg,#242424, #000000);">
		<section>
			<page-title :title="$t('about-us-page.title')" mobile="/images/aboutUs/aboutUsBg_v2.png" desktop="/images/aboutUs/aboutUsBg_desktop.png" />
		</section>
		<section :style="$vuetify.breakpoint.smAndDown ? 'padding-bottom:120px; padding-left: 35px; padding-right: 35px;' : 'padding-bottom: 150px'" class="pt-10">
			<v-sheet color="transparent">
				<v-container>
					<v-card flat tile><v-img :aspect-ratio="$vuetify.breakpoint.smAndDown ? '1' : ''" src="/images/aboutUs/aboutUsContent1_v2.png"></v-img></v-card>
					<div class="py-4">
						<div class="py-4 font-weight-bold">About Us</div>
						<div style="line-height:24px;" class="text-caption text-justify">CronusArt was founded in 2021. A bespoke fashion watches brand made with massive artisanship and excellent hand-crafted quality, every single pieces are made in one of a kind design, to suit every special occasion you will be presenting in. Our mission is to constantly produce premium watches with the finest standard, helping people to look stylish yet unique in their wrist games.</div>
					</div>
					<div class="py-4">
						<div class="py-4 font-weight-bold">What we achieved</div>
						<template v-if="$vuetify.breakpoint.mdAndUp">
							<v-row>
								<v-col>
									<v-row>
										<v-icon>mdi-palette-swatch</v-icon>
										<v-col cols="10">
											<div class="text-caption">Superior materials of highest quality</div>
										</v-col>
									</v-row>
								</v-col>
								<v-divider class="secondary" vertical></v-divider>
								<v-col class="pl-md-16">
									<v-row>
										<v-icon>mdi-watch</v-icon>
										<v-col cols="10" class="mx-auto">
											<div class="text-caption">Timeless & fashionable watchmaking</div>
										</v-col>
									</v-row>
								</v-col>
								<v-divider class="secondary" vertical></v-divider>
								<v-col class="pl-md-16">
									<v-row>
										<v-icon>mdi-anvil</v-icon>
										<v-col cols="10" class="mx-auto">
											<div class="text-caption">Artistic craftsmanship</div>
										</v-col>
									</v-row>
								</v-col>
								<v-divider class="secondary" vertical></v-divider>
								<v-col class="pl-16">
									<v-row>
										<v-icon>mdi-check-decagram</v-icon>
										<v-col cols="10" class="mx-auto">
											<div class="text-caption">Perfect Addition to any Outfit</div>
										</v-col>
									</v-row>
								</v-col>
							</v-row>
						</template>
						<template v-else>
							<v-container>
								<v-row>
									<v-col cols="6" class="pb-10 pr-10 pl-0 pt-0">
										<v-icon>mdi-palette-swatch</v-icon>
										<div class="text-caption">Superior materials of highest quality</div>
									</v-col>
									<v-divider class="secondary" vertical></v-divider>
									<v-col cols="6" class="pb-10 pl-10 pr-0 pt-0">
										<v-icon>mdi-watch</v-icon>
										<div class="text-caption">Timeless & fashionable watchmaking</div>
									</v-col>
								</v-row>
								<v-row>
									<v-divider class="secondary"></v-divider>
								</v-row>
								<v-row>
									<v-col cols="6" class="mx-auto pt-10 pr-10 pl-0 pb-0">
										<v-icon>mdi-anvil</v-icon>
										<div class="text-caption">Artistic craftsmanship</div>
									</v-col>
									<v-divider class="secondary" vertical></v-divider>
									<v-col cols="6" class="mx-auto pt-10 pl-10 pr-0 pb-0">
										<v-icon>mdi-check-decagram</v-icon>
										<div class="text-caption">Award Wining</div>
									</v-col>
								</v-row>
							</v-container>
						</template>
					</div>
				</v-container>
			</v-sheet>
		</section>
	</v-sheet>
</template>

<script>
import PageTitle from '@web/components/PageTitle.vue'

export default {
	components:{
		PageTitle,
	},
	data(){
		return{
		}
	},
	mounted(){
	},
	methods: {
	}
}
</script>
