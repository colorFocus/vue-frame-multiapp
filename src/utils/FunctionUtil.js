
export default {
	/**
	 * 一个简单的函数防抖
	 * @param {Function} fun 需要限制执行频率的函数
	 * @param {Number} delay 延迟时间，这段时间过后，才可触发第二次
	 */
	debounce:function(fun, delay, ...args){
		let timer = null;
		let tmpfun = function () {
			let ctx = this;
			if (timer) clearTimeout(timer);
			timer = setTimeout(function () {
				fun.apply(ctx, args);
			}, delay);
		};
		return tmpfun;
	}
}