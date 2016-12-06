import helper from './helper';

const dic = {
	vendor: (function(){
		var vendors = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
		for(var i = 0, max = vendors.length; i < max; i++){
			if(vendors[i] in document.createElement('div').style){
				return vendors[i].substr(0, vendors[i].length - 9);
			}
		}
		return false;
	})(),
	
	isMobile: (function(){
		var agent = navigator.userAgent;
		return helper.getTrueKey({
			'android': agent.match(/Android/i),
			'blackberry': agent.match(/BlackBerry/i),
			'opera': agent.match(/Opera Mini/i),
			'window': agent.match(/IEMobile/i),
			'ios': agent.match(/iPhone|iPad|iPod/i)
		});
	}()),
	
	isBadAndroid: /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion))
};

export default dic;