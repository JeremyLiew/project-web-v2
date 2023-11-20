<template>
	<div>
		<!-- top bar -->
		<v-app-bar class="bg-default">
			<template v-if="$vuetify.display.mdAndUp">
				<v-row no-gutters align="center" class="px-9 py-9">
					<v-col cols="1"></v-col>
					<v-col cols="10">
						<v-row justify="center" no-gutters>
							<template v-for="(nav_link,i) in nav_links" :key="i">
								<v-col cols="auto">
									<v-btn
										variant="text"
										:to="nav_link.to"
										:ripple="false"
										class="font-weight-bold"
										exact
									>
										{{ nav_link.title }}
									</v-btn>
								</v-col>
							</template>
						</v-row>
					</v-col>
					<v-col cols="1" class="d-flex justify-content-end">
						<!-- <v-card
							:to="{ name: 'login' }" flat style="width:28px"
							color="transparent"
						>
							<v-icon icon="mdi-login"></v-icon>
						</v-card> -->
					</v-col>
				</v-row>
			</template>

			<template v-else>
				<v-row justify="end" no-gutters class="px-5">
					<v-card
						color="transparent" flat
						@click.stop="isOpen = !isOpen"
					>
						<v-icon icon="mdi-menu" size="x-large"></v-icon>
					</v-card>
				</v-row>
			</template>
		</v-app-bar>

		<!-- side bar -->
		<v-navigation-drawer
			ref="sidebar"
			v-model="isOpen"
			temporary
			floating
			class="elevation-1"
			location="right"
		>
			<v-list class="py-0" dense flat>
				<v-card color="transparent" class="white--text pa-5 mb-3" tile>
					<v-row justify="start">
						<v-card color="transparent" flat @click.stop="isOpen = !isOpen">
							<v-icon icon="mdi-alpha-x" size="x-large"></v-icon>
						</v-card>
					</v-row>
				</v-card>
				<template v-for="(nav_link,i) in nav_links" :key="i">
					<v-list-item
						:to="nav_link.to"
						exact
						class="font-primary"
						:ripple="false"
						exact-active-class="btnActive"
					>
						<v-list-item-subtitle class="text-subtitle-2 ">
							<div class="font-weight-medium">{{ nav_link.title }}</div>
						</v-list-item-subtitle>
					</v-list-item>
				</template>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>

export default {
	props: {
	},
	data(){
		return {
			nav_links : [],
			isOpen: null,
			hover:false,
		}
	},
	created(){
		this.nav_links = [
			{ title : "Home", to : { name: "home-page" } },
			{ title : "Contact Us", to : { name: "contact-us-page" } },
		];
	},
	methods: {
	}
}
</script>

<style scoped>
.custom-icon {
  width: 32px !important; /* Adjust the width to your desired size */
  height: 32px !important; /* Adjust the height to your desired size */
}



</style>