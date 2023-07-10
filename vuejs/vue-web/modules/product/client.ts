import axios from 'axios';

const prefix = "/products"

const ProductClient = {

	getList(payload){
		return axios.get( prefix + "/list", { params: payload })
	},
	getProductPageInfo(){
		return axios.get( prefix + "/products/page-info")
	},
	getProductInfo(id, payload){
		return axios.get( prefix + "/info/" + id, { params: payload })
	},

}

export default ProductClient;