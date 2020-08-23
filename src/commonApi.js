import AxiosUtil from 'AxiosUtil';

export default {
    getCommonList(params){
		let uri = process.env.VUE_APP_API + '/common/list';
		return AxiosUtil.get(uri, params).then(function(data){
            return data.data;
        });
    },
};