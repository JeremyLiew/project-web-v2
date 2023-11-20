<template>
	<v-hover v-slot="{ hover }">
		<v-card
			:flat="!hover"
			elevation="5"
			color="#323232" class="text-center mx-auto clickable"
			max-width="900px"
			:to="{ name: 'products-info', params: { model: item.model } }"
		>
			<div class="pa-4 d-flex flex-column fill-height">
				<v-row>
					<v-col :style="$vuetify.breakpoint.mdAndUp?'font-size:16px;':'font-size:10px;'" class="text-start pb-2 px-2" cols="12">{{ product.model }}</v-col>
					<v-col cols="12" class="py-0">
						<v-img
							:src="product.thumbnail"
							:aspect-ratio="1"
							width="100%"
						></v-img>
					</v-col>
				</v-row>
				<div class="py-3 flex-grow fill-height">
					<div :style="$vuetify.breakpoint.mdAndUp?'font-size:16px;':'font-size:11px;'" class="white--text pt-2">{{ descTruncate(product.name,28) }}</div>
					<div v-if="product.lowest_price == 0" :style="$vuetify.breakpoint.mdAndUp?'font-size:12px;':'font-size:10px;'" class="grey--text py-1">Price Upon Request</div>
					<div v-else :style="$vuetify.breakpoint.mdAndUp?'font-size:12px;':'font-size:10px;'" class="grey--text py-1">From MYR{{ thousandFilter(product.lowest_price) }}</div>
					<v-card
						tile flat class="text-decoration-underline grey--text"
						:to="{ name: 'products-info', params: { model: item.model } }" color="transparent"
						:style="$vuetify.breakpoint.mdAndUp?'font-size:12px;':'font-size:10px;'"
					>
						View More
					</v-card>
				</div>
			</div>
		</v-card>
	</v-hover>
</template>

<script>
import Helper from '@shared/libs/HelperManager';
export default {
	props:{
		item: {
			type: Object,
			default: () => ({
				title: "Default Name",
				id:0,
				model: "Default Model",
			})
		},
		horizontalMode: {
			type: Boolean,
			default: false,
		},
	},
	data(){
		return {
			product:{}
		}
	},
	created(){
		this.product.name = this.item.name
		this.product.model = this.item.model
		this.product.lowest_price = this.item.lowest_price
		this.product.thumbnail = this.item.image.path_url
	},
	methods:{
		thousandFilter(price){
			return Helper.formatThousandSeparator(price.toString())
		},
		descTruncate(str , len){
			return Helper.truncate(str,len)
		}
	}
}
</script>