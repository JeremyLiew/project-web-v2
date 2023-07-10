<template>
	<v-sheet color="transparent" class="fill-height">
		<section>
			<page-title :title="$t('products-page.title')" mobile="/images/products/productsBg_v2.png" desktop="/images/products/productsBg_desktop.png" />
		</section>
		<section>
			<v-container style="padding-bottom:100px;" fluid class="pt-10 px-md-16">
				<v-row>
					<v-col>
						<section>
							<v-row align="center">
								<v-col
									cols="7" sm="9"
									md="12"
									order="0"
									class="pb-md-4 pr-1"
								>
									<v-text-field
										id="searchBar"
										v-model="search"
										class="border"
										:class=" ! $vuetify.breakpoint.mdAndUp ? 'searchIcon' : ''"
										:style="$vuetify.breakpoint.mdAndUp ? '' : 'font-size:10px;'"
										placeholder="Search for product"
										append-icon="mdi-magnify"
										outlined
										hide-details
										dense
										color="white"
										@keyup.enter="getProductList(1)"
									></v-text-field>
								</v-col>
								<v-col
									cols="12" md="10" order="2"
									order-md="1" class="pr-md-0 pt-md-0"
								>
									<v-tabs
										v-model="tab" slider-color="secondary"
										slider-size="2"
										color="white"
										center-active
									>
										<template v-for="(category,i) in categoryList">
											<v-tab
												:key="i" class="text-caption"
												:ripple="false" @click="filterProduct(category)"
											>
												{{ category.name }}
											</v-tab>
										</template>
									</v-tabs>
									<v-divider class="grey"></v-divider>
								</v-col>
								<v-col
									cols="5" sm="3" md="2"
									class="align-self-center align-md-self-end pl-1 pl-md-0 pt-md-0"
									order="1" order-md="2"
								>
									<v-select
										v-model="selectedSortOption"
										append-icon="mdi-chevron-down"
										:items="sortOptions"
										solo flat height="35"
										item-color="grey"
										color="secondary"
										outlined
										dense
										hide-details
										class="border mb-md-2"
										:style="$vuetify.breakpoint.mdAndUp?'font-size:12px;':'font-size:10px;'"
										@input="getProductList(1)"
									></v-select>
									<v-divider v-if="$vuetify.breakpoint.mdAndUp" class="grey"></v-divider>
								</v-col>
							</v-row>
							<v-container fluid class="pt-6">
								<template v-if="modelLoading">
									<v-row>
										<template v-for="i in 12">
											<v-col
												:key="i" cols="6" md="3"
											>
												<v-skeleton-loader type="image"></v-skeleton-loader>
											</v-col>
										</template>
									</v-row>
								</template>
								<template v-else>
									<v-row class="pt-4">
										<template v-for="(product, i) in productList">
											<v-col
												:key="i"
												cols="6" md="3"
												:style="$vuetify.breakpoint.mdAndUp?'':'padding:6px;'"
											>
												<product-card
													:item="product"
													class="fill-height"
												></product-card>
											</v-col>
										</template>
										<v-col v-if="paginator.total == 0" cols="12">
											<div class="text-center pa-16">
												<div><v-icon class="text-h2 text-md-h1">mdi-package-variant</v-icon></div>
												<div class="pt-2 font-italic">No Data Available</div>
											</div>
										</v-col>
									</v-row>
									<v-row v-if="paginationLength > 1" class="pt-4 pt-md-0">
										<v-col
											cols="12" md="3" align-self="center"
											class="pr-0 py-2"
										>
											<div class="text-center text-md-start">Showing {{ paginator.from }} - {{ paginator.to }} of {{ paginator.total }} results</div>
										</v-col>
										<v-col
											cols="12" md="3" align-self="center"
											class="pl-0 py-2 pb-0"
										>
											<v-pagination
												v-model="selectedPage"
												circle
												:length="paginationLength"
												total-visible="6"
												color="transparent"
												class="custom-pagination"
												@input="getProductList(selectedPage)"
											>
											</v-pagination>
										</v-col>
										<v-col class="pa-0" cols="0" md="6"></v-col>
									</v-row>
								</template>
							</v-container>
						</section>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</v-sheet>
</template>

<script>
import { errorHandlerMixin } from "@web/mixins/ErrorHandlerMixin";
import PageTitle from '@web/components/PageTitle.vue'
import ProductCard from '@web/components/ProductCard.vue';
import ProductClient from "../client"

export default {
	components:{
		PageTitle,
		ProductCard,
	},
	mixins: [
		errorHandlerMixin,
	],
	data() {
		return {
			drawer: false,
			sortOptions: [],
			selectedSortOption: null,
			selectedPage: 1,
			productList: [],
			modelLoading: false,
			paginator: {},
			categoryList: [],
			selectedCategoryId: null,
			search: null,
			tab:null,
			paginationLength:null,
		}
	},
	computed: {
	},
	created(){

		this.sortOptions = [
			{ text: "Default Sorting", value: { sortBy: "created_at", sortDesc: 1 } },
			{ text: "Name, A to Z", value: { sortBy: "name", sortDesc: 0 } },
			{ text: "Name, Z to A", value: { sortBy: "name", sortDesc: 1 } },
			{ text: "Price, low to high", value: { sortBy: "price", sortDesc: 0 } },
			{ text: "Price, high to low", value: { sortBy: "price", sortDesc: 1 } },
		]

		this.categoryList = [
			{name:'ALL',id:null},
		]

		this.selectedSortOption = this.sortOptions[0].value

		this.selectedCategoryId = this.$route.query['category'] || null

		this.getProductPageInfo()

	},
	methods: {
		getProductPageInfo()
		{
			ProductClient.getProductPageInfo().then((res) => {
				let result = res.data.data
				this.categoryList = this.categoryList.concat(result.categories)

				this.getProductList()

			}).catch((err) => {
				this.errorHandler_(err);
			});
		},

		getProductList(page = null)
		{

			this.selectedCategoryId = this.$route.query['category'] || null

			let tabIndex = this.categoryList.findIndex((item) => item.id == this.selectedCategoryId)
			if(tabIndex>=0){
				this.tab = tabIndex
			}else{
				this.selectedCategoryId = null
			}

			if(page){
				this.selectedPage = page
				this.$vuetify.goTo('#searchBar')
			}

			this.modelLoading = true;
			this.productList = []
			let payload = {
				page: this.selectedPage,
				itemsPerPage: 12,
				search: this.search,
				searchBy: "name",
				category_id : this.selectedCategoryId,
				...this.selectedSortOption,
			}

			console.log(payload)

			ProductClient.getList(payload).then((res) => {
				let result = res.data.data
				let { data, ...paginator } = result;
				this.productList = data;
				this.paginationLength = Math.ceil(paginator.total/paginator.per_page);
				this.paginator = paginator
			}).catch((err) => {
				this.errorHandler_(err);
			}).finally(()=>{
				this.modelLoading = false;
			});
		},
		filterProduct(category){
			this.$router.replace({ name: 'products-page', query: { 'category': category.id }})
			this.getProductList()
		},
	},
}
</script>

<style scoped>
.border.v-text-field--outlined >>> fieldset {
	border-color:white;
}
.v-tabs:not(.v-tabs--vertical):not(.v-tabs--right) >>> .v-slide-group--is-overflowing.v-tabs-bar--is-mobile:not(.v-slide-group--has-affixes) .v-slide-group__prev {
    display: none!important;
}
.searchIcon >>> .v-icon.v-icon{
	font-size: 18px;
}
.custom-pagination >>> .v-pagination__navigation , .custom-pagination >>> .v-pagination__item{
	box-shadow: none!important;
	color: grey!important;
}
.custom-pagination >>> .v-pagination__item--active{
	color: white!important;
}

.v-tab{
	padding: 0 36px !important;
}

.v-select .v-text-field input {
	width: 0 !important;
}
</style>
