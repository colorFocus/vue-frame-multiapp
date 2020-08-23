/**
 * 浏览器辨别工具类
 * @copyright neusoft 2016
 * @version 0.0.1
 * @exports Browser
 * @author louis wen <wen-q@neusoft.com>
 */
let browserObj = function(){
    let agent = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        browser = {
            /**
             * @property {boolean} ie 检测当前浏览器是否为IE
             * @example
             * if ( Browser.ie ) {
             *     console.log( '当前浏览器是IE' );
             * }
             */
            ie		:  /(msie\s|trident.*rv:)([\w.]+)/.test(agent),

            /**
             * @property {boolean} opera 检测当前浏览器是否为Opera
             * @example
             * 
             * if ( Browser.opera ) {
             *     console.log( '当前浏览器是Opera' );
             * }
             * 
             */
            opera	: ( !!opera && opera.version ),

            /**
             * @property {boolean} webkit 检测当前浏览器是否是webkit内核的浏览器
             * @example
             * if ( Browser.webkit ) {
             *     console.log( '当前浏览器是webkit内核浏览器' );
             * }
             * 
             */
            webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),
            /**
             * @property {boolean} isFirefox 检测当前浏览器是否是firefox浏览器
             * @example
             * if ( Browser.isFirefox ) {
             *     console.log( '当前浏览器是firefox浏览器' );
             * }
             * 
             */
            isFirefox	: ( agent.indexOf( 'firefox/' ) > -1 ),
            /**
             * @property {boolean} isChrome 检测当前浏览器是否是chrome浏览器
             * @example
             * if ( Browser.isChrome ) {
             *     console.log( '当前浏览器是chrome浏览器' );
             * }
             * 
             */
            isChrome	: ( navigator.userAgent.toLowerCase().indexOf( 'chrome/' ) > -1 ),
            /**
             * @property {boolean} isSafari 检测当前浏览器是否是Safari浏览器
             * @example
             * if ( Browser.isSafari ) {
             *     console.log( '当前浏览器是Safari浏览器' );
             * }
             * 
             */
            isSafari	: ( navigator.userAgent.toLowerCase().indexOf( 'safari/' ) > -1 ) && (navigator.userAgent.toLowerCase().indexOf( 'chrome/' ) == -1),
            
            /**
             * @property {boolean} isIpad 检测当前浏览器是否是isIpad
             * @example
             * if ( Browser.isIpad ) {
             *     console.log( '当前浏览器是ipad浏览器' );
             * }
             * 
             */
            isIpad	: ( navigator.userAgent.toLowerCase().indexOf( 'iPad/' ) > -1 ),

            /**
             * @property {boolean} mac 检测当前浏览器是否是运行在mac平台下
             * @example
             * 
             * if ( Browser.mac ) {
             *     console.log( '当前浏览器运行在mac平台下' );
             * }
             */
            mac	: ( agent.indexOf( 'macintosh' ) > -1 ),

            /**
             * @property {boolean} quirks 检测当前浏览器是否处于“怪异模式”下
             * @example
             * 
             * if ( Browser.quirks ) {
             *     console.log( '当前浏览器运行处于“怪异模式”' );
             * }
             */
            quirks : ( document.compatMode == 'BackCompat' ),
            /**
             * @property {boolean} quirks 判断微信浏览器
             * @example
             * 
             * if ( Browser.quirks ) {
             *     console.log( '当前浏览器运行处于“怪异模式”' );
             * }
             */
            weixin:function(){
                let ua = window.navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    return true;
                }else{
                    return false;
                }
            },
            /**
             * 是否支持animation css3 动画
             */
            isAnimationSuport:function(){
                let test=document.getElementsByTagName("body")[0].style;
                if(typeof test.animation!="undefined"||typeof test.WebkitAnimation!="undefined"){
                    return true;
                }else{
                    return false;
                }
            }
        };

    /**
     * @property {boolean} gecko 检测当前浏览器内核是否是gecko内核
     * @example
     * if ( Browser.gecko ) {
     *     console.log( '当前浏览器内核是gecko内核' );
     * }
     */
    browser.gecko =( navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);

    let version = 0;

    // Internet Explorer 6.0+
    if ( browser.ie ){


        let v1 =  agent.match(/(?:msie\s([\w.]+))/);
        let v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
        if(v1 && v2 && v1[1] && v2[1]){
            version = Math.max(v1[1]*1,v2[1]*1);
        }else if(v1 && v1[1]){
            version = v1[1]*1;
        }else if(v2 && v2[1]){
            version = v2[1]*1;
        }else{
            version = 0;
        }

        browser.ie11Compat = document.documentMode == 11;
        /**
         * @property { boolean } ie9Compat 检测浏览器模式是否为 IE9 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * 
         * if ( Browser.ie9Compat ) {
         *     console.log( '当前浏览器运行在IE9兼容模式下' );
         * }
         */
        browser.ie9Compat = document.documentMode == 9;

        /**
         * @property { boolean } ie8 检测浏览器是否是IE8浏览器
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * 
         * if ( Browser.ie8 ) {
         *     console.log( '当前浏览器是IE8浏览器' );
         * }
         * 
         */
        browser.ie8 = !!document.documentMode;

        /**
         * @property { boolean } ie8Compat 检测浏览器模式是否为 IE8 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * 
         * if ( Browser.ie8Compat ) {
         *     console.log( '当前浏览器运行在IE8兼容模式下' );
         * }
         * 
         */
        browser.ie8Compat = document.documentMode == 8;

        /**
         * @property { boolean } ie7Compat 检测浏览器模式是否为 IE7 兼容模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * 
         * if ( Browser.ie7Compat ) {
         *     console.log( '当前浏览器运行在IE7兼容模式下' );
         * }
         * 
         */
        browser.ie7Compat = ( ( version == 7 && !document.documentMode )
            || document.documentMode == 7 );

        /**
         * @property { boolean } ie6Compat 检测浏览器模式是否为 IE6 模式 或者怪异模式
         * @warning 如果浏览器不是IE， 则该值为undefined
         * @example
         * 
         * if ( Browser.ie6Compat ) {
         *     console.log( '当前浏览器运行在IE6模式或者怪异模式下' );
         * }
         * 
         */
        browser.ie6Compat = ( version < 7 || browser.quirks );

        browser.ie9above = version > 8;

        browser.ie9below = version < 9;

    }

    // Gecko.
    if ( browser.gecko ){
        let geckoRelease = agent.match( /rv:([\d\.]+)/ );
        if ( geckoRelease )
        {
            geckoRelease = geckoRelease[1].split( '.' );
            version = geckoRelease[0] * 10000 + ( geckoRelease[1] || 0 ) * 100 + ( geckoRelease[2] || 0 ) * 1;
        }
    }

    
    // Opera 9.50+
    if ( browser.opera )
        version = parseFloat( opera.version() );

    // WebKit 522+ (Safari 3+)
    if ( browser.webkit ){
        version = parseFloat( agent.match( / applewebkit\/(\d+)/ )[1] );
    }
    //chrome 版本号
    if(browser.chrome){
        let temp = agent.match(/chrome\/[\d.]+/gi);
        version = (temp+"").replace(/[^0-9.]/ig,"");
    }
    
    if(browser.isSafari){
        let temp = agent.match(/version\/[\d.]+/gi);
        version = (temp+"").replace(/[^0-9.]/ig,"");
    }else{
        browser.safari = false;
    }
    /**
     * @property { Number } version 检测当前浏览器版本号
     * @remind
     * <ul>
     *     <li>IE系列返回值为5,6,7,8,9,10等</li>
     *     <li>gecko系列会返回10900，158900等</li>
     *     <li>webkit系列会返回其build号 (如 522等)</li>
     * </ul>
     * @example
     * 
     * console.log( '当前浏览器版本号是： ' + Browser.version );
     * 
     */
    browser.version = version;

    
    return browser;
}();
export default browserObj;