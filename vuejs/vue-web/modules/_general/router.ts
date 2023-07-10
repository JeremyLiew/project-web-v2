const ComingSoon = () => import( './views/Comingsoon.vue')
const Error404 = () => import( './views/404.vue')
const LandingPage = () => import( './views/LandingPage.vue')
const PrivacyPolicyPage = () => import('./views/PrivacyPolicyPage.vue')
const TermsAndConditionsPage = () => import('./views/TermsAndConditionsPage.vue')

export {
	ComingSoon,
	Error404,
	LandingPage,
	PrivacyPolicyPage,
	TermsAndConditionsPage
}