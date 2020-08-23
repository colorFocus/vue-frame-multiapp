var aDom = document.createElement("a");

export default {
    //获取uuid的方法
    uuid(){
        return Date.now().toString(15);
    },
    fileBytesToSize(e){
        var r = ["B", "KB", "MB", "GB", "TB"];
        if (0 == e)
            return "0 B";
        var n = parseInt(Math.floor(Math.log(e) / Math.log(1024)))
          , t = (Math.round(10 * e / Math.pow(1024, n)) / 10).toString();
        return -1 === t.indexOf(".") && (t += ".0"),
        t + " " + r[n]
    },
    getFileName(fileName){
        if(fileName && fileName.length > 0){
            fileName = fileName.substring(0, fileName.lastIndexOf("."));
        }
        return fileName;  
    },
    //获取文件扩展名
    getFileExtName(fileName) {
        let r = "";
        if (fileName && fileName.length > 0) {
            let spl = fileName.split(".");
            r = spl[spl.length - 1];
        }
        return r;
    },
    //简化克隆对象或数组（但对对象中的undefined、function、Date字段不友好）
    clone(collection) {
        return JSON.parse(JSON.stringify(collection));
    },
    //给URL添加search
	addUrlSearch(url,key,value){
		aDom.href = url;
		if(aDom.search.indexOf("?")==-1){
			aDom.search = aDom.search + "?"+key+"="+value;
		}else{
			aDom.search = aDom.search + "&"+key+"="+value;
		}
		return aDom.href;
    },
    isMobile:function(){
        let r = false;
		if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
			r = true;
		}
		return r;
    }
}