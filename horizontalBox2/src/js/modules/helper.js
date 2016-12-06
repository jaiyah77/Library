const helper = {
	getTrueKey: function(data){
		for(var key in data){
			if(data[key]){
				return key;
			}
		}
		return false;
	},
	getTime: Date.now || function(){
		return new Date().getTime();
	}
};

export default helper;