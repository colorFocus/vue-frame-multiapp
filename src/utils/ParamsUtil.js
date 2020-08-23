export default {
    getToken(){
        var params = this.__parseParams();
        if(params.urlToken){
            return params.urlToken;
        }else{
            return "";
        } 
    },
    getParams(){
        return this.__parseParams();
    },
    __parseParams(){
        var search = window.location.search;
        if (self != top) { 
            search = self.location.search; 
        }
        var result =  new Object();
        if(search.indexOf("?") != -1){
            let idx = search.indexOf("?");
            search = search.substr(idx,search.length);
            search = search.substr(1);
            var params = search.split("&");
            for(var i in params){
                if(params[i].indexOf("=") > 0){
                    var param = params[i].split("=");
                    var name = param[0];
                    var value = param[1];
                    result[name] = value;
                }    
            }
        }
        return result;
    }
}