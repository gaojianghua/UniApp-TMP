(function() {
	function YBBarrage ({container, barrages = [], config = {}}){
		if(!(this instanceof YBBarrage)){ //如果this不是指向MyClass
		    throw new TypeError("TypeError: Class constructor YBBarrage cannot be invoked without 'new'")
		}
	   this.container = container
	   this.canvas = null
	   this.paused = true
	   this.barrages = barrages
	   this.config = {}
	   this._ctx = null
	   this._barrages = []
	   this._w = 0
	   this._h = 0
	   this._drawTimer = null
	   this._drawAnima = null
	   this.currentTime = 0
	   this._count = 0
	   this._startTime = 0
	   this._refreshTimer = null
	   this.setConfig(config)
	   this._init()
	}
	Object.defineProperty(YBBarrage.prototype,'_init',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._init is not a constructor")
	        }
	        this.canvas = document.createElement('CANVAS');
	        this.canvas.setAttribute('width', this.container.offsetWidth);
	        this.canvas.setAttribute('height', this.container.offsetHeight);
	        this.container.appendChild(this.canvas);
	        this._ctx = this.canvas.getContext('2d');
	        let rect = this.canvas.getBoundingClientRect();
	        this._w = rect.right - rect.left;
	        this._h = rect.bottom - rect.top;
	        this.currentTime = this.config.initialTime;
	        window.addEventListener('resize', this.refresh.bind(this))
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_destroy',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._destroy is not a constructor")
	        }
	        this.paused = true;
	        this._clearTimer();
	        this._cancelAnima();
	        this._clear();
	        this.barrages = [];
	        this._barrages = [];
	        this.container = null;
	        this._ctx = null;
	        if ( this.canvas ) {
	        	this.canvas.remove();
	        	this.canvas = null;
	        }
	        window.removeEventListener('resize', this.refresh.bind(this))
	    },
	    enumerable:false
	})
	//开始绘制
	Object.defineProperty(YBBarrage.prototype,'_render',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._render is not a constructor")
	        }
	        this._cancelAnima();
	        if ( this.paused ) return;
	        if (this._barrages.length) {
	        	this._clear();
	        	for (let i = 0; i < this._barrages.length; i++) {
	        		let b = this._barrages[i];
	        		if (b.left + b.width <= 0) {
	        			this._barrages.splice(i, 1);
	        			i--;
	        			continue;
	        		}
	        		b.offset = this._detectionBump(b);
	        		let offset = b.offset * this.config.playbackRate;
	        		b.left -= offset;
	        		this._drawText(b);
	        	}
	        }
	        this._drawAnima = window.requestAnimationFrame(this._render.bind(this));
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_cancelAnima',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._cancelAnima is not a constructor")
	        }
	        if ( this._drawAnima ) {
	        	window.cancelAnimationFrame(this._drawAnima)
	        	this._drawAnima = null
	        }
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_clear',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._clear is not a constructor")
	        }
	        this._ctx && this._ctx.clearRect(0, 0, this._w, this._h);
	    },
	    enumerable:false
	})
	//绘制文字
	Object.defineProperty(YBBarrage.prototype,'_drawText',{
	    value:function(barrage){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._drawText is not a constructor")
	        }
	        if ( this._ctx ) {
	        	this._ctx.beginPath();
	        	this._ctx.font = `${barrage.fontSize || this.config.fontSize}px ${this.config.fontFamily}`;
	        	this._ctx.strokeStyle = this._hex2rgba(this._getStrokeColor(barrage.color || this.config.defaultColor), this.config.opacity);
	        	this._ctx.strokeText(barrage.text, barrage.left, barrage.top);
	        	this._ctx.fillStyle = this._hex2rgba(barrage.color || this.config.defaultColor, this.config.opacity);
	        	this._ctx.fillText(barrage.text, barrage.left, barrage.top);
	        	this._ctx.closePath();
	        }
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_startTimer',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._startTimer is not a constructor")
	        }
	       this._startTime = new Date().getTime();
	       this._count = 0;
	       this._drawTimer = window.setTimeout(this._fixed.bind(this), 1000);
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_clearTimer',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._clearTimer is not a constructor")
	        }
			if ( this._drawTimer ) {
				window.clearTimeout(this._drawTimer)
				this._drawTimer = null
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_fixed',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._fixed is not a constructor")
	        }
			this._clearTimer();
			if ( this.paused ) return;
			if ( this.config.duration > -1 && this.currentTime >= this.config.duration ) {
				this.seek(0);
				return;
			} 
			this._count++;
			this.currentTime += (1 * this.config.playbackRate);
			let barrages = this.barrages.filter(barrage => parseInt(barrage.time) == parseInt(this.currentTime));
			for ( let i = 0; i < barrages.length; i++ ) {
				let bar = this._getBarrage(barrages[i]);
				bar && this._barrages.push(bar);
			}
			let offset = new Date().getTime() - (this._startTime + (this._count * 1000));
			let nextTime = 1000 - offset;
			if (nextTime < 0) nextTime = 0;
			this._drawTimer = window.setTimeout(this._fixed.bind(this), nextTime);
	    },
	    enumerable:false
	})
	//测绘弹幕
	Object.defineProperty(YBBarrage.prototype,'_getBarrage',{
	    value:function(barrage, isVisible = false){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._getBarrage is not a constructor")
	        }
			let fontSize = barrage.fontSize || this.config.fontSize;
			let offset = this._getOffset();
			this._ctx.font = `${barrage.fontSize || this.config.fontSize}px ${this.config.fontFamily}`;
			let width = Math.ceil(this._ctx.measureText(barrage.text).width);
			let top = this._getTop(fontSize, width, offset, isVisible);
			if ( top > -1 ) {
				return {
					text: barrage.text,
					time: barrage.time,
					fontSize: fontSize,
					color: barrage.color || this.config.defaultColor,
					top: top,
					left: this._w,
					offset: offset,
					width: width
				}
			}
			return false;
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_getStrokeColor',{
	    value:function(color){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._getStrokeColor is not a constructor")
	        }
			let hex = color.length == 7 ? color : '#' + color.slice(1, 4) + color.slice(1, 4)
			const r = parseInt(hex.slice(1,3),16);
			const g = parseInt(hex.slice(3,5),16);
			const b = parseInt(hex.slice(5,7),16);
			let $grayLevel = (r * 0.299) + (g * 0.587) + (b * 0.144);
			if ($grayLevel >= 120) {
				return '#000000';
			} else {
			　	return '#ffffff';
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'_hex2rgba',{
	    value:function(hex, opacity){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._hex2rgba is not a constructor")
	        }
			hex = hex.length == 7 ? hex : '#' + hex.slice(1, 4) + hex.slice(1, 4)
			let str="rgba("
			const r = parseInt(hex.slice(1,3),16).toString();
			const g = parseInt(hex.slice(3,5),16).toString();
			const b = parseInt(hex.slice(5,7),16).toString();
			str += r+","+g+","+b+","+opacity+")";
			return str;
	    },
	    enumerable:false
	})
	//计算弹幕距离顶部位置
	Object.defineProperty(YBBarrage.prototype,'_getTop',{
	    value:function(size, width, offset, isVisible = false){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._getTop is not a constructor")
	        }
			//canvas绘制文字x,y坐标是按文字左下角计算，预留30px
			let top = -1;
			let len = -1
			//根据弹幕高度分割轨道
			for ( let i = 0; i < Math.floor(this._h / (size + this.config.lineHeight)); i++ ) {
				//当前轨道的顶部位置
				let nowTop = ((i + 1) * size) + (i * this.config.lineHeight);
				//当前轨道上有多少条弹幕
				let barrages = this._barrages.filter(barrage => barrage.top < nowTop + size && barrage.fontSize + barrage.top > nowTop );
				if ( barrages.length > 0 ) {
					//当前轨道有弹幕运行
					let arr = barrages.map(barrage => barrage.left + barrage.width);
					if ( !this.config.overlap || isVisible ) {
						//开启防重叠会取消多余弹幕显示
						if ( arr.length < len || len < 0 ) {
							len = arr.length;
							top = nowTop;
						}
					}
					//获取当前轨道最右的弹幕
					let max = Math.max(...arr);
					//如果当前轨道还有空位则将弹幕放入当前轨道
					if ( max < this._w - 10 ) {
						top = nowTop;
						break;
					}
				} else {
					//当前轨道没有弹幕运行
					top = nowTop;
					break;
				}
			}
			return top;
	    },
	    enumerable:false
	})
	//获取偏移量
	Object.defineProperty(YBBarrage.prototype,'_getOffset',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._getOffset is not a constructor")
	        }
			return parseFloat( ((this.config.speed / 70) + Math.random()).toFixed(1) );
	    },
	    enumerable:false
	})
	//碰撞检测 速度计算
	Object.defineProperty(YBBarrage.prototype,'_detectionBump',{
	    value:function(bar){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage._detectionBump is not a constructor")
	        }
			let nowTop = bar.top;
			let offset = bar.offset;
			//检测当前弹幕轨道有多少条弹幕
			let barrages =  this._barrages.filter(barrage => barrage.top < nowTop + bar.fontSize && barrage.fontSize + barrage.top > nowTop && bar.left != barrage.left);
			//检测当前弹幕轨道前方有多少条弹幕
			let headbarrages = barrages.filter(barrage => bar.left + bar.width >= barrage.left + barrage.width + 10 && barrage.left + barrage.width > 0);
			//检测当前弹幕轨道后方有多少条弹幕
			let footbarrages = barrages.filter(barrage => bar.left + bar.width + 10 < barrage.left && barrage.left + barrage.width > 0);
			if ( headbarrages.length > 0 ) {
				let arr = headbarrages.map(barrage => barrage.left + barrage.width);
				//取出离当前弹幕最近的那条弹幕
				let max = Math.max(...arr);
				let i = arr.indexOf(max);
				if ( bar.left > max + 20 ) {
					//如果离最近弹幕距离大于10，则加速
					offset = headbarrages[i].offset + 0.01;
				} else {
					//否则减速
					offset = headbarrages[i].offset - 0.01;
				}
			}
			if ( footbarrages.length > 0 ) {
				//前方一条弹幕都没有 且 未弹幕未完全显示 则加速
				if ( bar.left + bar.width > this._w && headbarrages.length == 0 ) {
					offset = bar.offset + 0.01;
				} else {
					let arr = footbarrages.map(barrage => barrage.left);
					//取出离当前弹幕最近的那条弹幕
					let min = Math.min(...arr);
					let i = arr.indexOf(min);
					//如果后方存在弹幕 且距离小于10则加速
					if ( min - (bar.left + bar.width) <= 20 ) {
						offset = bar.offset + 0.01;
					}
				}
			}
			if ( offset < 0.5 ) offset = 0.5;
			if ( offset > 3 ) offset = 3;
			return offset;
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'setBarrages',{
	    value:function(barrages){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.setBarrages is not a constructor")
	        }
			this.barrages = barrages
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'add',{
	    value:function(barrage){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.add is not a constructor")
	        }
			barrage.time = barrage.time || this.currentTime;
			this.barrages.push(barrage);
			if ( parseInt(barrage.time) == parseInt(this.currentTime) ) {
				let bar = this._getBarrage(barrage, true);
				bar.left = this._w - bar.width;
				this._barrages.push(bar);
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'setConfig',{
	    value:function(config){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.setConfig is not a constructor")
	        }
			this.config = Object.assign({}, {
				duration: -1, // 弹幕动画的循环周期，-1 表示不循环播放
				speed: 150, // 弹幕的运动速度
				fontSize: 24, // 文字大小，单位：像素
				fontFamily: 'Microsoft Yahei', // 字体，默认值：微软雅黑
				opacity: 1, // 透明度，有效值 0-1
				defaultColor: '#fff', // 默认颜色，与 CSS 颜色属性一致
				lineHeight: 5,//行间距
				overlap: true,//开启防重叠 可能会导致部分弹幕不显示
				playbackRate: 1.0,//播放倍速
				initialTime: 0//初始时间
			}, this.config, config)
	    },
	    enumerable:false
	})
	//刷新尺寸（当容器大小变化时调用此接口）
	Object.defineProperty(YBBarrage.prototype,'refresh',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.refresh is not a constructor")
	        }
			if ( this._refreshTimer ) {
				window.clearTimeout(this._refreshTimer)
				this._refreshTimer = null
			}
			this._refreshTimer = window.setTimeout(() => {
				if ( this.canvas && this.container ) {
					this.canvas.width = this.container.offsetWidth;
					this.canvas.height = this.container.offsetHeight;
					this._w = this.container.offsetWidth;
					this._h = this.container.offsetHeight;
					let paused = this.paused;
					if ( !paused ) {
						this.play()
					}
					window.clearTimeout(this._refreshTimer)
					this._refreshTimer = null
				}
			}, 200)
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'play',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.play is not a constructor")
	        }
			if ( this.paused ) {
				this.paused = false;
				this._startTimer();
				this._render();
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'pause',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.pause is not a constructor")
	        }
			if ( !this.paused ) {
				this.paused = true;
				this._clearTimer();
				this._cancelAnima();
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'stop',{
	    value:function(){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.stop is not a constructor")
	        }
			this._destroy();
	    },
	    enumerable:false
	})
	Object.defineProperty(YBBarrage.prototype,'seek',{
	    value:function(time){
	        if(!(this instanceof YBBarrage)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBBarrage.seek is not a constructor")
	        }
			this._barrages = [];
			this.currentTime = parseInt(time);
			this._clear();
			let paused = this.paused;
			if ( !paused ) {
				this.play()
			}
	    },
	    enumerable:false
	})
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = YBBarrage;
	else if ("function" == typeof define && define.amd) define([], YBBarrage);
	else {
		var t;
		t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.YBPlayer = YBBarrage
	}
})();