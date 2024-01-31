(function() {
	'use strict'
	function YBPlayer ({container, src, title, poster, formats, barrages, barrageShow, barrageGap, barrageConfig, controls, playShow=true, progressShow=true, timeShow = true, volumeShow=true, settingShow=true, fullscreenShow=true, autoplay, mirror, pictureInPicture, nextBtnShow, prevBtnShow, muted, loop, preload, settings, initialTime, duration, volume, playbackRate, objectFit, crossOrigin, segments, isLive, flvConfig, enableBlob }){
		if(!(this instanceof YBPlayer)){ //如果this不是指向MyClass
		    throw new TypeError("TypeError: Class constructor YBPlayer cannot be invoked without 'new'")
		}
	   this.container = typeof container == 'string' ? document.getElementById(container) : container
	   this.src = src || ''
	   this.title = title || ''
	   this.poster = poster || ''
	   this.formats = formats || 'auto'
	   this.barrages = barrages
	   this.barrageShow = barrageShow
	   this.barrageGap = barrageGap || 5
	   this.barrageConfig = barrageConfig
	   this.controls = controls
	   this.playShow = playShow
	   this.progressShow = progressShow
	   this.timeShow = timeShow
	   this.volumeShow = volumeShow
	   this.settingShow = settingShow
	   this.fullscreenShow = fullscreenShow
	   this.autoplay = autoplay
	   this.mirror = mirror
	   this.pictureInPicture = pictureInPicture
	   this.nextBtnShow = nextBtnShow
	   this.prevBtnShow = prevBtnShow
	   this.muted = muted
	   this.loop = loop
	   this.preload = preload || 'auto'
	   this.settings = settings || 'all'
	   this.initialTime = initialTime || 0
	   this.duration = duration || 0
	   this.volume = volume || 1
	   this.playbackRate = playbackRate || 1
	   this.objectFit = objectFit || 'contain'
	   this.crossOrigin = crossOrigin || ''
	   this.segments = segments
	   this.isLive = isLive
	   this.flvConfig = flvConfig || {}
	   this.enableBlob = enableBlob
	   this.video = null
	   this.hls = null
	   this.flv = null
	   this.barrage = null
	   this._eventCallback = {}
	   this._wrapperEl = null
	   this._videoEl = null
	   this._posterEl = null
	   this._videoBackground = 'inherit'
	   this._headersEl = null
	   this._controlsEl = null
	   this._barrageEl = null
	   this._settingEl = null
	   this._playbackRateEl = null
	   this._slotsEl = null
	   this._controlSlotsEl = null
	   this._isDrag = false
	   this._controlsTimer = null
	   this._init()
	}
	Object.defineProperty(YBPlayer.prototype,'_init',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._init is not a constructor")
	        }
	        if ( this.container && typeof this.container != 'undefined' ) {
	        	try{
	        		this.container.style.position = 'relative';
	        		this.container.style.overflow = 'hidden';
	        		//监听全屏事件
	        		this.container.addEventListener('fullscreenerror', this._fullscreenerror.bind(this));
	        		this.container.addEventListener('mozfullscreenerror', this._fullscreenerror.bind(this));
	        		this.container.addEventListener('msfullscreenerror', this._fullscreenerror.bind(this));
	        		this.container.addEventListener('webkitfullscreenerror', this._fullscreenerror.bind(this));
	        		this.container.addEventListener('fullscreenchange', this._fullscreenchanged.bind(this));
	        		this.container.addEventListener('mozfullscreenchange', this._fullscreenchanged.bind(this));
	        		this.container.addEventListener('msfullscreenchange', this._fullscreenchanged.bind(this));
	        		this.container.addEventListener('webkitfullscreenchange', this._fullscreenchanged.bind(this));
	        		this._wrapperEl = document.createElement('DIV')
	        		this._wrapperEl.setAttribute('class', 'ybplayer-video-wrapper')
	        		this.container.appendChild(this._wrapperEl)
	        		this._wrapperEl.onclick = () => {
	        			if ( this._playbackRateEl ) {
	        				this._hidePlaybackRate()
	        			} else if ( this._settingEl ) {
	        				this._hideSetting()
	        			} else if ( this._controlsEl ) {
	        				if ( this._controlsEl.classList.value.indexOf('ybplayer-controls-show') > -1 ) {
	        					this._hideControls()
	        				} else {
	        					this._showControls()
	        				}
	        			}
	        		}
	        		this._initVideo();
	        		this._initSlots();
	        		this._setVideoUrl();
	        		if ( this.controls ) this._initControls();
	        	}catch(e){
	        		throw new Error(e.toString());
	        	}
	        }
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_destroy',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._destroy is not a constructor")
	        }
	        if ( this.hls ) {
	        	this.hls.destroy();
	        	this.hls = null;
	        }
	        if ( this.flv ) {
	        	this.flv.pause();
	        	this.flv.destroy();
	        	this.flv = null;
	        }
	        this._destroyControls();
	        this._destroyHeaders();
	        this._destroyBarrage();
	        this._destroyVideo();
	        this._destroySlots();
	        if ( this._wrapperEl ) {
	        	this._wrapperEl.onclick = null;
	        	this._wrapperEl.remove();
	        	this._wrapperEl = null;
	        }
	        if ( this.container ) {
	        	this.container.removeEventListener('fullscreenerror', this._fullscreenerror.bind(this));
	        	this.container.removeEventListener('mozfullscreenerror', this._fullscreenerror.bind(this));
	        	this.container.removeEventListener('msfullscreenerror', this._fullscreenerror.bind(this));
	        	this.container.removeEventListener('webkitfullscreenerror', this._fullscreenerror.bind(this));
	        	this.container.removeEventListener('fullscreenchange', this._fullscreenchanged.bind(this));
	        	this.container.removeEventListener('mozfullscreenchange', this._fullscreenchanged.bind(this));
	        	this.container.removeEventListener('msfullscreenchange', this._fullscreenchanged.bind(this));
	        	this.container.removeEventListener('webkitfullscreenchange', this._fullscreenchanged.bind(this));
	        	this.container = null;
	        }
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_initVideo',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._initVideo is not a constructor")
	        }
	        this._videoEl = document.createElement('DIV');
	        this._videoEl.setAttribute('class', 'ybplayer-video-content');
	        this._wrapperEl.appendChild(this._videoEl);
	        this.video = document.createElement('VIDEO');
	        this.video.setAttribute('style', 'width: 100%;height:100%;flex:1;opacity:0;object-fit:' + this.objectFit + ';');
	        this.video.setAttribute('preload', this.preload);
	        this.video.setAttribute('playbackRate', this.playbackRate);
	        this.video.setAttribute('volume', this.volume);
	        this.video.setAttribute('x-webkit-airplay', 'allow');
	        this.video.setAttribute('webkit-playsinline', true);
	        this.video.setAttribute('playsinline', true);
	        this.video.setAttribute('x5-video-player-type', 'h5');
	        this.video.setAttribute('x5-video-play', true);
	        this.crossOrigin && this.video.setAttribute('crossOrigin', this.crossOrigin);
	        this.video.innerHTML = '您的浏览器不支持 video 标签。';
	        this._videoEl.appendChild(this.video);
	        this._showPoster()
	        this.video.muted = this.muted;
	        this.video.autoplay = this.autoplay;
	        this.video.loop = this.loop;
	        this.video.oncanplay = () => {
	        	this._eventCallback.canplay && this._eventCallback.canplay({
	        		duration: this.video.duration,
	        		width: this.video.videoWidth,//视频宽度
	        		height: this.video.videoHeight//视频高度
	        	});
	        }
	        this.video.oncanplaythrough = () => {
	        	this._eventCallback.canplaythrough && this._eventCallback.canplaythrough({
	        		duration: this.video.duration,
	        		width: this.video.videoWidth,//视频宽度
	        		height: this.video.videoHeight//视频高度
	        	});
	        }
	        this.video.onloadeddata = () => {
	        	this._eventCallback.loadeddata && this._eventCallback.loadeddata({
	        		duration: this.video.duration,
	        		width: this.video.videoWidth,//视频宽度
	        		height: this.video.videoHeight//视频高度
	        	});
	        	this.video.currentTime = this.initialTime;
	        	this.video.style.opacity = 1
	        }
	        this.video.onloadedmetadata = () => {
	        	this._eventCallback.loadedmetadata && this._eventCallback.loadedmetadata({
	        		duration: this.video.duration,
	        		width: this.video.videoWidth,//视频宽度
	        		height: this.video.videoHeight//视频高度
	        	});
	        	if ( this.barrageShow ) this._initBarrage();
	        }
	        this.video.onloadstart = () => {
	        	this._eventCallback.loadstart && this._eventCallback.loadstart();
	        }
	        this.video.onplay = () => {
	        	this._hidePoster()
	        	this._eventCallback.play && this._eventCallback.play()
	        	this.barrage && this.barrage.play();
	        	this._setControlsView('play')
	        	if ( this.duration && this.video.currentTime >= this.duration && !this.isLive ) this.seek(0)
	        }
	        this.video.onpause = () => {
	        	this._eventCallback.pause && this._eventCallback.pause();
	        	this.barrage && this.barrage.pause();
	        	this._setControlsView('play')
	        }
	        this.video.onended = () => {
	        	this._eventCallback.ended && this._eventCallback.ended();
	        }
	        this.video.onseeking = () => {
	        	this._eventCallback.seeking && this._eventCallback.seeking({
	        		currentTime: this.video.currentTime
	        	});
	        }
	        this.video.onseeked = () => {
	        	this._eventCallback.seeked && this._eventCallback.seeked({
	        		currentTime: this.video.currentTime
	        	});
	        	this.barrage && this.barrage.seek(this.video.currentTime);
	        }
	        this.video.ontimeupdate = () => {
	        	this._eventCallback.timeupdate && this._eventCallback.timeupdate({
	        		currentTime: this.video.currentTime
	        	})
	        	if ( this.duration && this.video.currentTime >= this.duration && !this.isLive ) {
	        		if ( this.loop ) {
	        			this.seek(0)
	        		} else {
	        			this.pause();
	        			this._eventCallback.ended && this._eventCallback.ended();
	        		}
	        	}
	        	this._setControlsView('timeUpdate')
	        }
	        this.video.ondurationchange = () => {
	        	this._eventCallback.durationchange && this._eventCallback.durationchange({
	        		duration: this.video.duration
	        	})
	        }
	        this.video.onwaiting = () => {
	        	this._eventCallback.waiting && this._eventCallback.waiting({
	        		currentTime: this.video.currentTime
	        	});
	        	this.barrage && this.barrage.pause();
	        }
	        this.video.onplaying = () => {
	        	this._eventCallback.playing && this._eventCallback.playing({
	        		currentTime: this.video.currentTime
	        	})
	        	this.barrage && this.barrage.play();
	        }
	        this.video.onprogress = () => {
	        	this._eventCallback.progress && this._eventCallback.progress({
	        		buffered: this.video.buffered
	        	})
	        }
	        this.video.onabort = () => {
	        	this._eventCallback.abort && this._eventCallback.abort();
	        }
	        this.video.onerror = (e) => {
	        	this._eventCallback.error && this._eventCallback.error(e);
	        }
	        this.video.onvolumechange = () => {
	        	this._eventCallback.volumechange && this._eventCallback.volumechange({
	        		volume: this.video.volume
	        	});
	        	this._setControlsView('volume')
	        }
	        this.video.onratechange = () => {
	        	this._eventCallback.ratechange && this._eventCallback.ratechange({
	        		playbackRate: this.video.playbackRate
	        	});
	        	if ( this._playbackRateEl && this._querySelector('ybplayer-setting') ) {
	        		for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
	        			this._querySelectorAll('ybplayer-setting')[i].getElementsByClassName('ybplayer-setting-text')[0].style.color = this.playbackRate == this._querySelectorAll('ybplayer-setting')[i].getAttribute('data-rate') ? '#2ca2f9' : '#333';
	        		}
	        	}
	        	this.barrage && this.barrage.setConfig({
	        		playbackRate: this.video.playbackRate
	        	});
	        }
	        this.video.onenterpictureinpicture = () => {
	        	this._eventCallback.enterpictureinpicture && this._eventCallback.enterpictureinpicture()
	        	this._setSettingView('pictureInPicture');
	        }
	        this.video.onleavepictureinpicture = () => {
	        	this._eventCallback.leavepictureinpicture && this._eventCallback.leavepictureinpicture()
	        	this._setSettingView('pictureInPicture');
	        }
	        this._barrageEl = document.createElement('DIV');
	        this._barrageEl.setAttribute('class', 'ybplayer-video-barrage');
	        this._barrageEl.setAttribute('style', 'margin:' + this.barrageGap + 'px 0;');
	        this._wrapperEl.appendChild(this._barrageEl);
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_destroyVideo',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._destroyVideo is not a constructor")
	        }
	        if ( this.video ) {
	        	this.video.pause();
	        	this.video.src = '';
	        	this.video.oncanplay = null;
	        	this.video.onloadedmetadata = null;
	        	this.video.onplay = null;
	        	this.video.onpause = null;
	        	this.video.onended = null;
	        	this.video.onseeking = null;
	        	this.video.onseeked = null;
	        	this.video.ontimeupdate = null;
	        	this.video.ondurationchange = null;
	        	this.video.onwaiting = null;
	        	this.video.onplaying = null;
	        	this.video.onprogress = null;
	        	this.video.onabort = null;
	        	this.video.onerror = null;
	        	this.video.onvolumechange = null;
	        	this.video.onratechange = null;
	        	this.video.onenterpictureinpicture = null;
	        	this.video.onleavepictureinpicture = null;
	        	this.video.remove();
	        	this.video = null;
	        }
	        this._hidePoster()
	        if ( this._videoEl ) {
	        	this._videoEl.remove();
	        	this._videoEl = null;
	        }
	        if ( this._barrageEl ) {
	        	this._barrageEl.remove();
	        	this._barrageEl = null;
	        }
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_showPoster',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._showPoster is not a constructor")
	        }
	        if ( this._videoEl && this.poster && this.video.paused ) {
	        	let img = new Image();
	        	img.onload = () => {
	        		if ( this.video.paused ) {
	        			this._posterEl = document.createElement('DIV');
	        			this._posterEl.setAttribute('class', 'ybplayer-video-poster');
	        			this._posterEl.setAttribute('style', `background-size: ${this.objectFit};background-image: url(${this.poster})`);
	        			this._videoEl.appendChild(this._posterEl);
	        		}
	        		img = null
	        	}
	        	img.onerror = () => {
	        		img = null
	        	}
	        	img.src = this.poster;
	        }
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_hidePoster',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._hidePoster is not a constructor")
	        }
	        if ( this._posterEl ) {
	        	this._posterEl.onerror = null
	        	this._posterEl.onload = null
	        	this._posterEl.remove()
	        	this._posterEl = null
	        }
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_initHeaders',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._initHeaders is not a constructor")
	        }
			if ( this.container && this.title ) {
				this._destroyHeaders()
				this._headersEl = document.createElement('DIV');
				this._headersEl.setAttribute('class', 'ybplayer-headers');
				this._headersEl.innerHTML = `
					<div class="ybplayer-headers-shadow"></div>
					<i class="ybplayerIconfont icon-angle-arrow-left ybplayer-icon ${this._setClassName('ybplayer-icon-back')}"></i>
					<span class="${this._setClassName('ybplayer-headers-title')}">${this.title}</span>
				`;
				this.container.appendChild(this._headersEl);
				this._querySelector('ybplayer-icon-back').onclick = () => {
					this.exitFullscreen()
				}
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_destroyHeaders',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._destroyHeaders is not a constructor")
	        }
			if ( this._headersEl ) {
				this._querySelector('ybplayer-icon-back').onclick = null
				this._headersEl.remove();
				this._headersEl = null;
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_initControls',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._initControls is not a constructor")
	        }
			if ( this.container ) {
				this._controlsEl = document.createElement('DIV');
				this._controlsEl.setAttribute('class', 'ybplayer-controls');
				this._controlsEl.innerHTML = `
					<div class="ybplayer-controls-top">
						<div class="${this._setClassName('ybplayer-icon-play-prev')}" style="margin-right: ${this.prevBtnShow ? '10px' : 0};">
							${this.prevBtnShow ? `
							<i class="ybplayerIconfont icon-play-prev-fill ybplayer-icon"></i>
							` : ''}
						</div>
						<div class="${this._setClassName('ybplayer-icon-play')}">
							${this.playShow ? `
							<i class="ybplayerIconfont ${this.video && !this.video.paused ? 'icon-pause' : 'icon-play'} ybplayer-icon"></i>
							` : ''}
						</div>
						<div class="${this._setClassName('ybplayer-icon-play-next')}" style="margin-left: ${this.nextBtnShow ? '10px' : 0};">
							${this.nextBtnShow ? `
							<i class="ybplayerIconfont icon-play-next-fill ybplayer-icon"></i>
							` : ''}
						</div>
						<span class="${this._setClassName('ybplayer-controls-time')}">
							${this.timeShow ? `
							00:00 / 00:00
							` : ''}
						</span>
						<div class="${this._setClassName('ybplayer-icon-volume')}" style="margin-left: ${this.volumeShow ? '25px' : 0};">
							${this.volumeShow ? `
							<i class="ybplayerIconfont icon-volume-${this.muted ? 'muted' : 'medium'} ybplayer-icon"></i>
							` : ''}
						</div>
						<div class="${this._setClassName('ybplayer-icon-setting')}" style="margin-left: ${this.settingShow ? '25px' : 0};">
							${this.settingShow ? `
							<i class="ybplayerIconfont icon-setting ybplayer-icon"></i>
							` : ''}
						</div>
						<div class="${this._setClassName('ybplayer-icon-fullscreen')}" style="margin-left: ${this.fullscreenShow ? '25px' : 0};">
							${this.fullscreenShow ? `
							<i class="ybplayerIconfont ${ this.fullscreen ? 'icon-out-fullscreen' : 'icon-in-fullscreen'} ybplayer-icon"></i>
							` : ''}
						</div>
					</div>
					<div class="${this._setClassName('ybplayer-controls-progress')}">
					</div>
					<div class="ybplayer-controls-shadow"></div>
				`;
				this.container.appendChild(this._controlsEl);
				this._controlsEl.onmousedown = () => {
					this._clear_controlsTimer()
				}
				this._controlsEl.onmouseleave = () => {
					this._start_controlsTimer()
				}
				if ( this.playShow ) {
					this._querySelector('ybplayer-icon-play').onclick = () => {
						this.toggle()
					}
				}
				if ( this.volumeShow ) {
					this._querySelector('ybplayer-icon-volume').onclick = () => {
						this.setConfig('muted', !this.muted)
					}
				}
				if  ( this.settingShow )  {
					this._querySelector('ybplayer-icon-setting').onclick = () => {
						this._showSetting()
					}
				}
				if ( this.fullscreenShow ) {
					this._querySelector('ybplayer-icon-fullscreen').onclick = () => {
						this.switchFullscreen()
					}
				}
				if ( this.prevBtnShow ) {
					this._querySelector('ybplayer-icon-play-prev').onclick = () => {
						this._eventCallback.prevBtnClick && this._eventCallback.prevBtnClick();
					}
				}
				if ( this.nextBtnShow ) {
					this._querySelector('ybplayer-icon-play-next').onclick = () => {
						this._eventCallback.nextBtnClick && this._eventCallback.nextBtnClick();
					}
				}
				this._initProgress()
				this._showControls();
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_destroyControls',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._destroyControls is not a constructor")
	        }
			if ( this._controlsEl ) {
				this._destroyProgress()
				this._controlsEl.onmousedown = null
				this._controlsEl.onmouseleave = null
				if ( this.playShow && this._querySelector('ybplayer-icon-volume') ) this._querySelector('ybplayer-icon-play').onclick = null
				if ( this.volumeShow && this._querySelector('ybplayer-icon-volume') ) this._querySelector('ybplayer-icon-volume').onclick = null
				if ( this.settingShow && this._querySelector('ybplayer-icon-setting') ) this._querySelector('ybplayer-icon-setting').onclick = null
				if ( this.fullscreenShow && this._querySelector('ybplayer-icon-fullscreen') ) this._querySelector('ybplayer-icon-fullscreen').onclick = null
				if ( this.prevBtnShow && this._querySelector('ybplayer-icon-play-prev') ) this._querySelector('ybplayer-icon-play-prev').onclick = null
				if ( this.nextBtnShow && this._querySelector('ybplayer-icon-play-next') ) this._querySelector('ybplayer-icon-play-next').onclick = null
				this._controlsEl.remove();
				this._controlsEl = null
			}
			if ( this._settingEl ) {
				for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
					this._querySelectorAll('ybplayer-setting').onclick = null
				}
				this._settingEl.remove();
				this._settingEl = null;
			}
			if ( this._playbackRateEl ) {
				for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
					this._querySelectorAll('ybplayer-setting')[i].onclick = null
				}
				this._playbackRateEl.remove();
				this._playbackRateEl = null;
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_showControls',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._showControls is not a constructor")
	        }
			this._clear_controlsTimer()
			if ( this._controlsEl ) {
				this._controlsEl.setAttribute('class', 'ybplayer-controls ybplayer-controls-show');
				if ( this._controlSlotsEl ) this._controlSlotsEl.style.visibility = 'visible';
				if ( this._headersEl ) this._headersEl.setAttribute('class', 'ybplayer-headers ybplayer-headers-show');
				this._eventCallback.controlsChange && this._eventCallback.controlsChange({
					controls: true
				});
				this._start_controlsTimer()
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_hideControls',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._hideControls is not a constructor")
	        }
			this._clear_controlsTimer()
			if ( this._controlsEl ) {
				this._controlsEl.setAttribute('class', 'ybplayer-controls ybplayer-controls-hide')
				if ( this._headersEl ) this._headersEl.setAttribute('class', 'ybplayer-headers ybplayer-headers-hide');
				if ( this._controlSlotsEl ) this._controlSlotsEl.style.visibility = 'hidden';
				this._eventCallback.controlsChange && this._eventCallback.controlsChange({
					controls: false
				});
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setControlsView',{
	    value:function(value){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setControlsView is not a constructor")
	        }
			if ( !this.controls ) return
			if ( value == 'play' && this._querySelector('ybplayer-icon-play') ) {
				if ( this.playShow ) {
					this._querySelector('ybplayer-icon-play').innerHTML = `<i class="ybplayerIconfont icon-${this.video.paused ? 'play' : 'pause'} ybplayer-icon"></i>`;
				} else {
					this._querySelector('ybplayer-icon-play').innerHTML = '';
				}
			} else if ( value == 'timeUpdate' ) {
				if ( !this._isDrag ) {
					if ( this.timeShow ) {
						var currentTime = this.video ? this.video.currentTime && this.video.currentTime != 'Infinity' ? this.video.currentTime : 0 : 0;
						var duration = this.video ? (this.duration || (this.video.duration && this.video.duration != 'Infinity' ? this.video.duration : 0) ) : 0;
						var timeEl = this._querySelector('ybplayer-controls-time')
						var rate = duration > 0 ? currentTime / duration : 0
						if ( this._querySelector('ybplayer-slider-focus') ) {
							this._querySelector('ybplayer-slider-focus').style.width = (rate * 100) + '%'
						}
						if ( this._querySelector('ybplayer-slider') ) {
							this._querySelector('ybplayer-slider').value = rate * 100
						}
						if ( this._querySelector('ybplayer-controls-time') ) {
							this._querySelector('ybplayer-controls-time').innerHTML = this.isLive ? this._timesFormat(parseInt(duration) + parseInt(currentTime)) : `${this._timesFormat(currentTime)} / ${this._timesFormat(duration)}`
						}
					} else {
						this._querySelector('ybplayer-controls-time').innerHTML = ''
					}
				}
			} else if ( value == 'volume' && this._querySelector('ybplayer-icon-volume') ) {
				if ( this.volumeShow ) {
					this._querySelector('ybplayer-icon-volume').style.marginLeft = '25px';
					this._querySelector('ybplayer-icon-volume').innerHTML = '<i class="ybplayerIconfont icon-volume-' + (this.muted ? 'muted' : 'medium') + ' ybplayer-icon"></i>'
					this._querySelector('ybplayer-icon-volume').onclick = () => {
						this.setConfig('muted', !this.muted)
					}
				} else {
					this._querySelector('ybplayer-icon-volume').style.marginLeft = '';
					this._querySelector('ybplayer-icon-volume').innerHTML = '';
					this._querySelector('ybplayer-icon-volume').onclick = null
				}
			} else if ( value == 'setting' && this._querySelector('ybplayer-icon-setting') ) {
				if ( this.settingShow ) {
					this._querySelector('ybplayer-icon-setting').style.marginLeft = '25px';
					this._querySelector('ybplayer-icon-setting').innerHTML = '<i class="ybplayerIconfont icon-setting ybplayer-icon"></i>';
					this._querySelector('ybplayer-icon-setting').onclick = () => {
						this._showSetting()
					}
				} else {
					this._querySelector('ybplayer-icon-setting').style.marginLeft = '';
					this._querySelector('ybplayer-icon-setting').innerHTML = '';
					this._querySelector('ybplayer-icon-setting').onclick = null;
				}
			} else if ( value == 'fullscreen' && this._querySelector('ybplayer-icon-fullscreen') ) {
				if ( this.fullscreenShow ) {
					this._querySelector('ybplayer-icon-fullscreen').style.marginLeft = '25px';
					this._querySelector('ybplayer-icon-fullscreen').innerHTML = '<i class="ybplayerIconfont icon-' + (this.fullscreen ? 'out-fullscreen' : 'in-fullscreen') + ' ybplayer-icon"></i>';
					this._querySelector('ybplayer-icon-fullscreen').onclick = () => {
						this.switchFullscreen()
					}
				} else {
					this._querySelector('ybplayer-icon-fullscreen').style.marginLeft = '';
					this._querySelector('ybplayer-icon-fullscreen').innerHTML = '';
					this._querySelector('ybplayer-icon-fullscreen').onclick = null;
				}
			} else if ( value == 'prevBtn' && this._querySelector('ybplayer-icon-play-prev') ) {
				if ( this.prevBtnShow ) {
					this._querySelector('ybplayer-icon-play-prev').style.marginRight = '10px';
					this._querySelector('ybplayer-icon-play-prev').innerHTML = '<i class="ybplayerIconfont icon-play-prev-fill ybplayer-icon"></i>';
					this._querySelector('ybplayer-icon-play-prev').onclick = () => {
						this._eventCallback.prevBtnClick && this._eventCallback.prevBtnClick()
					}
				} else {
					this._querySelector('ybplayer-icon-play-prev').style.marginRight = '';
					this._querySelector('ybplayer-icon-play-prev').innerHTML = '';
					this._querySelector('ybplayer-icon-play-prev').onclick = null;
				}
			} else if ( value == 'nextBtn' && this._querySelector('ybplayer-icon-play-next') ) {
				if ( this.nextBtnShow ) {
					this._querySelector('ybplayer-icon-play-next').style.marginLeft = '10px';
					this._querySelector('ybplayer-icon-play-next').innerHTML = '<i class="ybplayerIconfont icon-play-next-fill ybplayer-icon"></i>';
					this._querySelector('ybplayer-icon-play-next').onclick = () => {
						this._eventCallback.nextBtnClick && this._eventCallback.nextBtnClick()
					}
				} else {
					this._querySelector('ybplayer-icon-play-next').style.marginLeft = '';
					this._querySelector('ybplayer-icon-play-next').innerHTML = '';
					this._querySelector('ybplayer-icon-play-next').onclick = null;
				}
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_initProgress',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._initProgress is not a constructor")
	        }
			if ( this._querySelector('ybplayer-controls-progress') && this.progressShow && !this.isLive ) {
				this._querySelector('ybplayer-controls-progress').innerHTML = `
					<div class="ybplayer-slider-box">
						<div class="${this._setClassName('ybplayer-slider-track')}"></div>
						<div class="${this._setClassName('ybplayer-slider-focus')}"></div>
						<input class="${this._setClassName('ybplayer-slider')} ybplayer-controls-slider" value="0" type="range">
					</div>
				`
				this._querySelector('ybplayer-slider').onchange = (e) => {
					this._isDrag = false
					this.video && this.seek((this._querySelector('ybplayer-slider').value / 100) * (this.duration || this.video.duration));
					this._start_controlsTimer();
				}
				this._querySelector('ybplayer-slider').oninput = (e) => {
					this._isDrag = true
					if ( this._querySelector('ybplayer-slider-focus') ) this._querySelector('ybplayer-slider-focus').style.width = this._querySelector('ybplayer-slider').value + '%'
					this._clear_controlsTimer();
				}
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_destroyProgress',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._destroyProgress is not a constructor")
	        }
			if ( this._querySelector('ybplayer-controls-progress') ) {
				if ( this._querySelector('ybplayer-slider') ) this._querySelector('ybplayer-slider').onchange = null
				if ( this._querySelector('ybplayer-slider') ) this._querySelector('ybplayer-slider').oninput = null
				this._querySelector('ybplayer-controls-progress').innerHTML = ''
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_clear_controlsTimer',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._clear_controlsTimer is not a constructor")
	        }
			if ( this.controls && this._controlsTimer ) {
				window.clearTimeout(this._controlsTimer)
				this._controlsTimer = null
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_start_controlsTimer',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._start_controlsTimer is not a constructor")
	        }
			if (  this.controls ) {
				this._controlsTimer = window.setTimeout(() => {
					this._hideControls()
				}, 5000)
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_initSlots',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._initSlots is not a constructor")
	        }
			let nodes = this.container.childNodes;
			for ( let i = 0; i < nodes.length; i++ ) {
				if ( [].concat(nodes[i].classList).toString().indexOf('ybplayer-slots') > -1 ) {
					this._slotsEl = nodes[i]
					let childNodes = this._slotsEl.childNodes;
					for ( let j = 0; j < childNodes.length; j++ ) {
						if ( [].concat(childNodes[j].classList).toString().indexOf('ybplayer-controls-slots') > -1 ) {
							this._controlSlotsEl = childNodes[j];
						}
					}
					this._wrapperEl.appendChild(this._slotsEl);
				}
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_destroySlots',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._destroySlots is not a constructor")
	        }
			if ( this._controlSlotsEl ) this._controlSlotsEl = null
			if ( this._slotsEl && this.container ) {
				this.container.appendChild(this._slotsEl)
				this._slotsEl = null
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_showSetting',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._showSetting is not a constructor")
	        }
			if ( this.container ) {
				this._settingEl = document.createElement('DIV');
				this._settingEl.setAttribute('class', 'ybplayer-settings');
				let barrageHtml = '';
				let settings = this.settings.split(',').map(setting => setting.trim());
				try{
					barrageHtml = YBBarrage ? `
						<div class="${this._setClassName('ybplayer-setting')}" data-value="barrage">
							<i class="ybplayerIconfont icon-barrage-${this.barrageShow ? 'show' : 'hide'} ybplayer-setting-icon"></i>
							<p class="ybplayer-setting-text">${this.barrageShow ? '关闭弹幕' : '开启弹幕'}</p>
						</div>
					` : '';
				}catch(e){
				}
				this._settingEl.innerHTML = `
					${ this.settings == 'all' || settings.indexOf('barrage') > -1 ? barrageHtml : ''}
					${ this.settings == 'all' || settings.indexOf('playbackRate') > -1 ? `
						<div class="${this._setClassName('ybplayer-setting')}" data-value="playbackRate">
							<i class="ybplayerIconfont icon-play-rate-circle ybplayer-setting-icon"></i>
							<p class="ybplayer-setting-text">播放速度</p>
						</div>
					` : '' }
					${ this.settings == 'all' || settings.indexOf('mirror') > -1 ? `
						<div class="${this._setClassName('ybplayer-setting')}" data-value="mirror">
							<i class="ybplayerIconfont icon-mirror ybplayer-setting-icon"></i>
							<p class="ybplayer-setting-text">${this.mirror ? '关闭镜像' : '镜像画面'}</p>
						</div>
					` : '' }
					${ this.settings == 'all' || settings.indexOf('capture') > -1 ? `
						<div class="${this._setClassName('ybplayer-setting')}" data-value="capture">
							<i class="ybplayerIconfont icon-screenshot ybplayer-setting-icon"></i>
							<p class="ybplayer-setting-text">截取画面</p>
						</div>
					` : '' }
					${ (this.settings == 'all' || settings.indexOf('pictureInPicture') > -1) && document.pictureInPictureEnabled ? `
						<div class="${this._setClassName('ybplayer-setting')}" data-value="pictureInPicture">
							<i class="ybplayerIconfont icon-picture-in-picture-${this.pictureInPicture ? 'open' : 'exit'} ybplayer-setting-icon"></i>
							<p class="ybplayer-setting-text">${this.pictureInPicture ? '退出画中画' : '画中画'}</p>
						</div>
					` : '' }
				`;
				this.container.appendChild(this._settingEl);
				for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
					this._querySelectorAll('ybplayer-setting')[i].onclick = () => {
						let type = this._querySelectorAll('ybplayer-setting')[i].getAttribute('data-value');
						if ( type == 'barrage' ) {
							this.setConfig('barrageShow', !this.barrageShow);
						} else if ( type == 'playbackRate' ) {
							if ( this._playbackRateEl ) {
								this._hidePlaybackRate();
							} else {
								this._showPlaybackRate();
							}
						} else if ( type == 'mirror' ) {
							this.setConfig('mirror', !this.mirror);
						} else if ( type == 'capture' ) {
							this.capture();
							this._hideSetting();
						} else {
							this.setConfig('pictureInPicture', !this.pictureInPicture);
						}
					}
				}
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_hideSetting',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._hideSetting is not a constructor")
	        }
			if ( this.container && this._settingEl ) {
				this._settingEl.style.animation = ' settingHide .3s both';
				for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
					this._querySelectorAll('ybplayer-setting')[i].onclick = null
				}
				window.setTimeout(() => {
					this.container.removeChild(this._settingEl);
					this._settingEl = null;
				}, 300);
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setSettingView',{
	    value:function(value){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setSettingView is not a constructor")
	        }
			if ( this._querySelector('ybplayer-setting') ) {
				for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
					if ( this._querySelectorAll('ybplayer-setting')[i].getAttribute('data-value') == value ) {
						if ( value == 'barrage' ) {
							this._querySelectorAll('ybplayer-setting')[i].innerHTML = `
								<i class="ybplayerIconfont icon-barrage-${this.barrageShow ? 'show' : 'hide'} ybplayer-setting-icon"></i>
								<p class="ybplayer-setting-text">${this.barrageShow ? '关闭弹幕' : '开启弹幕'}</p>
							`;
						} else if ( value == 'mirror' ) {
							this._querySelectorAll('ybplayer-setting')[i].innerHTML = `
								<i class="ybplayerIconfont icon-mirror ybplayer-setting-icon"></i>
								<p class="ybplayer-setting-text">${this.mirror ? '关闭镜像' : '镜像画面'}</p>
							`;
						} else if ( value == 'pictureInPicture' ) {
							this._querySelectorAll('ybplayer-setting')[i].innerHTML = `
								<i class="ybplayerIconfont icon-picture-in-picture-${this.pictureInPicture ? 'open' : 'exit'} ybplayer-setting-icon"></i>
								<p class="ybplayer-setting-text">${this.pictureInPicture ? '退出画中画' : '画中画'}</p>
							`;
						}
					}
				}
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_showPlaybackRate',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._showPlaybackRate is not a constructor")
	        }
			if ( this.container ) {
				this._hideSetting();
				this._playbackRateEl = document.createElement('DIV');
				this._playbackRateEl.setAttribute('class', 'ybplayer-settings');
				let playbackRates = [{
					label: '0.25',
					value: 0.25
				},{
					label: '0.5',
					value: 0.5
				},{
					label: '0.75',
					value: 0.75
				},{
					label: '正常',
					value: 1.0
				},{
					label: '1.25',
					value: 1.25
				},{
					label: '1.5',
					value: 1.5
				},{
					label: '1.75',
					value: 1.75
				},{
					label: '2.0',
					value: 2.0
				}];
				for ( let rate of playbackRates ) {
					this._playbackRateEl.innerHTML += `
						<div class="${this._setClassName('ybplayer-setting')}" data-rate="${rate.value}">
							<p class="ybplayer-setting-text" style="color: ${rate.value == this.playbackRate ? '#2ca2f9' : '#333'};">${rate.label}</p>
						</div>
					`;
				}
				this.container.appendChild(this._playbackRateEl);
				let that = this
				for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
					this._querySelectorAll('ybplayer-setting')[i].onclick = function () {
						that.setConfig('playbackRate', this.getAttribute('data-rate'))
					}
				}
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_hidePlaybackRate',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._hidePlaybackRate is not a constructor")
	        }
			if ( this.container && this._playbackRateEl ) {
				this._playbackRateEl.style.animation = ' settingHide .3s both';
				for ( let i = 0; i < this._querySelectorAll('ybplayer-setting').length; i++ ) {
					this._querySelectorAll('ybplayer-setting')[i].onclick = null
				}
				window.setTimeout(() => {
					this.container.removeChild(this._playbackRateEl);
					this._playbackRateEl = null;
					this._showSetting();
				}, 300);
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_initBarrage',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._initBarrage is not a constructor")
	        }
			try{
				this.barrage = new YBBarrage({
					container: this._barrageEl,
					barrages: this.barrages,
					config: Object.assign({}, this.barrageConfig, {
						initialTime: this.video ? this.video.currentTime : 0
					})
				});
				if ( !this.video.paused ) this.barrage.play();
				this._setSettingView('barrage');
				this._eventCallback.barrageChange && this._eventCallback.barrageChange({
					show: true
				})
			}catch(e){
				//TODO handle the exception
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_destroyBarrage',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._destroyBarrage is not a constructor")
	        }
			if ( this.barrage ) {
				this.barrage.stop();
				this.barrage = null;
				this._setSettingView('barrage');
				this._eventCallback.barrageChange && this._eventCallback.barrageChange({
					show: false
				})
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setConfig',{
	    value:function(attribute, value){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setConfig is not a constructor")
	        }
			let videoAttributes = ['autoplay', 'loop', 'muted', 'preload', 'volume', 'playbackRate', 'crossOrigin'];
			if ( this.video && videoAttributes.indexOf(attribute) > -1 )
				this.video[attribute] = value;
			if ( this.video && attribute == 'objectFit' )
				this.video.style.objectFit = value;
			if ( this.video && attribute == 'mirror' ) {
				this.video.style.transform = 'rotateY(' + (value ? 180 : 0) + 'deg)';
				this._setSettingView('mirror');
			}
			if ( this.video && attribute == 'pictureInPicture' ) {
				if ( document.pictureInPictureEnabled ) {
					if ( value )
						this.video.requestPictureInPicture();
					else
						document.pictureInPictureElement && document.exitPictureInPicture();
				}
			}
			if ( attribute == 'controls' )  {
				if ( value )
					this._initControls()
				else
					this._destroyControls()
			}
			if ( attribute == 'prevBtnShow' )  {
				this._setControlsView('prevBtn')
			}
			if ( attribute == 'nextBtnShow' )  {
				this._setControlsView('nextBtn')
			}
			if ( attribute == 'timeShow' )  {
				this._setControlsView('timeUpdate')
			}
			if ( attribute == 'settingShow' )  {
				this._setControlsView('setting')
			}
			if ( attribute == 'progressShow' )  {
				if ( value )
					this._initProgress()
				else
					this._destroyProgress()
			}
			if ( attribute == 'barrageShow' )  {
				if ( value )
					this._initBarrage()
				else
					this._destroyBarrage()
			}
			if ( attribute == 'barrageConfig' )  {
				this.barrage && this.barrage.setConfig(value);
			}
			if ( attribute == 'barrageGap' )  {
				this.barrage && this.barrage.refresh();
			}
			if ( attribute == 'title' )  {
				if ( value ) {
					if ( this._querySelector('ybplayer-headers-title') ) {
						this._querySelector('ybplayer-headers-title').innerHTML = value;
					} else {
						this._initHeaders();
					}
				} else {
					this._destroyHeaders();
				}
			}
			if ( attribute == 'src' || attribute == 'segments' ) {
				this._destroyControls();
				this._destroyBarrage();
				this._destroyHeaders();
				if ( this.hls ) {
					this.hls.destroy();
					this.hls = null;
				}
				if ( this.flv ) {
					this.flv.pause();
					this.flv.destroy();
					this.flv = null;
				}
				this._destroyVideo();
				this._destroySlots();
				this._initVideo();
				this._initSlots();
				this._setVideoUrl();
				if ( this.fullscreen ) this._initHeaders();
				if ( this.controls ) this._initControls();
			}
	    },
	    enumerable:false
	})
	//获取后缀
	Object.defineProperty(YBPlayer.prototype,'_suffix',{
	    value:function(name){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._suffix is not a constructor")
	        }
			let fileName = name.lastIndexOf(".");
			let fileNameLength = name.length;
			let fileFormat = name.substring(fileName + 1, fileNameLength);
			return fileFormat;
	    },
	    enumerable:false
	})
	//格式化时间
	Object.defineProperty(YBPlayer.prototype,'_timesFormat',{
	    value:function(value){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._timesFormat is not a constructor")
	        }
			let hours = Math.floor(value / 60 / 60 % 60) >= 10 ? Math.floor(value / 60 / 60 % 60) : '0' + Math.floor(value / 60 / 60 % 60);
			let minutes = Math.floor(value / 60 % 60) >= 10 ? Math.floor(value / 60 % 60) : '0' + Math.floor(value / 60 % 60);
			let seconds = Math.floor(value % 60) >= 10 ? Math.floor(value % 60) : '0' + Math.floor(value % 60);
			return hours == '00' ? (minutes + ':' + seconds) : (hours + ':' + minutes + ':' + seconds);
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setClassName',{
	    value:function(className){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setClassName is not a constructor")
	        }
			return this.container.id + '_' + className + ' ' + className
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_querySelector',{
	    value:function(className){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._querySelector is not a constructor")
	        }
			return this.container && document.getElementsByClassName(this.container.id + '_' + className) && document.getElementsByClassName(this.container.id + '_' + className).length > 0 ? document.getElementsByClassName(this.container.id + '_' + className)[0] : null
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_querySelectorAll',{
	    value:function(className){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._querySelectorAll is not a constructor")
	        }
			return this.container ? document.getElementsByClassName(this.container.id + '_' + className) || [] : []
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setVideoUrl',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setVideoUrl is not a constructor")
	        }
			if ( this.src ) {
				let formats = '';
				if ( this.formats == 'auto'  )
					formats = this._suffix(this.src.split('?')[0]);
				else
					formats = this.formats;
				if ( formats == 'm3u8' )
					this._setM3u8();
				else if ( formats == 'flv' )
					this._setFlv();
				else
					this._setBlob();
			} else if ( this.segments ) {
				this._setFlv();
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setBlob',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setBlob is not a constructor")
	        }
			if ( this.enableBlob ) {
				let xhr = new XMLHttpRequest()
				xhr.open('GET', this.src, true)
				xhr.responseType = 'blob'
				xhr.onload = () => {
					if ( xhr.status == 200 ) {
						try {
							this.video.srcObject = xhr.response
						} catch (error) {
							const URL = window.URL || window.webkitURL
							this.video.src = URL.createObjectURL(xhr.response);
						}
					} else {
						this.video.src = this.src
					}
					// this.video.load()
					xhr.abort()
					xhr = null
				}
				xhr.onerror = () => {
					this.video.src = this.src
					// this.video.load()
					xhr = null
				}
				xhr.send()
			} else {
				this.video.src = this.src
				// this.video.load()
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setM3u8',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setM3u8 is not a constructor")
	        }
			try{
				if ( Hls.isSupported() ) {
					this.hls = new Hls();
					this.hls.loadSource(this.src);
					this.hls.attachMedia(this.video);
					// this.hls.on(Hls.Events.MANIFEST_PARSED, (e) => { });
					this.hls.on(Hls.Events.ERROR, (e, data) => {
						if ( data.type == 'networkError' ) {
							this._eventCallback.error && this._eventCallback.error(data);
							this.hls.destroy()
							this.hls = null
						}
					});
				} else {
					this.video.src = this.src;
					// this.video.load();
				}
			}catch(e){
				this._eventCallback.error && this._eventCallback.error(e)
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_setFlv',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._setFlv is not a constructor")
	        }
			try{
				if (flvjs.isSupported()) {
					this.flv = flvjs.createPlayer(
						{
							type: "flv",
							isLive: this.isLive,
							url: this.src,
							segments: this.segment && this.segments.length > 0 ? this.segment : null,
							cors: this.flvConfig.cors,
							withCredentials: this.flvConfig.withCredentials,
							hasAudio: this.flvConfig.hasAudio,
							hasVideo: this.flvConfig.hasVideo,
							duration: this.flvConfig.duration,
							filesize: this.flvConfig.filesize
						},
						Object.assign({}, {
							enableWorker: false, //不启用分离线程
							enableStashBuffer: false, //关闭IO隐藏缓冲区
							isLive: true,
							lazyLoad: false
						}, this.flvConfig)
					)
				} else {
					this.video.src = this.src;
					// this.video.load();
				}
				this.flv.on('error', e => {
					this._eventCallback.error && this._eventCallback.error(e);
					this.flv.pause();
					this.flv.destroy();
					this.flv = null;
				});
				this.flv.attachMediaElement(this.video);
				this.flv.load();
			}catch(e){
				this._eventCallback.error && this._eventCallback.error(e);
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_fullscreenerror',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._fullscreenerror is not a constructor")
	        }
			if ( this.container ) {
				this.container.style.position = 'fixed';
				this.container.style.left = 0;
				this.container.style.right = 0;
				this.container.style.bottom = 0;
				this.container.style.top = 0;
				this.container.style.width = '100vw';
				this.container.style.height = '100vh';
				this.container.style.zIndex = 999;
				this._videoBackground = this.container.style.background
				this.container.style.background = '#000'
				this._cssfullscreenchange();
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_fullscreenchanged',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._fullscreenchanged is not a constructor")
	        }
			if ( document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ) {
				this._eventCallback.fullscreenChange && this._eventCallback.fullscreenChange({
					fullscreen: true,
					type: 'requestfullscreen'
				});
				this.fullscreen = true;
				this._initHeaders();
			} else {
				this._eventCallback.fullscreenChange && this._eventCallback.fullscreenChange({
					fullscreen: false,
					type: 'requestfullscreen'
				});
				this.fullscreen = false;
				this._destroyHeaders();
			}
			this._setControlsView('fullscreen');
			this.refreshBarrage();
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'_cssfullscreenchange',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer._cssfullscreenchange is not a constructor")
	        }
			if ( this.container && this.container.style.position == 'fixed' ) {
				this._eventCallback.fullscreenChange && this._eventCallback.fullscreenChange({
					fullscreen: true,
					type: 'cssfullscreen'
				});
				this.fullscreen = true;
				this._initHeaders();
			} else {
				this._eventCallback.fullscreenChange && this._eventCallback.fullscreenChange({
					fullscreen: false,
					type: 'cssfullscreen'
				});
				this.fullscreen = false;
				this._destroyHeaders();
			}
			this._setControlsView('fullscreen');
			this.refreshBarrage();
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'on',{
	    value:function(event, callback){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.on is not a constructor")
	        }
			this._eventCallback[event] = callback;
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'play',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.play is not a constructor")
	        }
			this.video && this.video.play()
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'pause',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.pause is not a constructor")
	        }
			this.video && this.video.pause()
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'toggle',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.toggle is not a constructor")
	        }
			this.video && this.video.paused ? this.video.play() : this.video.pause()
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'seek',{
	    value:function(time){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.seek is not a constructor")
	        }
			if ( this.video ) this.video.currentTime = time
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'stop',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.stop is not a constructor")
	        }
			this._destroy()
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'capture',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.capture is not a constructor")
	        }
			const canvas = document.createElement('canvas');
			canvas.width = this.video.videoWidth;
			canvas.height = this.video.videoHeight;
			canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
			canvas.toBlob(blob => {
				this._eventCallback.captureFinish && this._eventCallback.captureFinish({
					blob: blob,
					base64: canvas.toDataURL('image/jpg')
				})
			}, 'image/jpg')
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'drawBarrage',{
	    value:function(barrage){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.drawBarrage is not a constructor")
	        }
			this.barrage && this.barrage.add(barrage);
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'refreshBarrage',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.refreshBarrage is not a constructor")
	        }
			this.barrage && this.barrage.refresh();
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'setBarrages',{
	    value:function(barrages){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.setBarrages is not a constructor")
	        }
			this.barrages = barrages;
			this.barrage && this.barrage.setBarrages(barrages);
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'setConfig',{
	    value:function(attribute, value){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.setConfig is not a constructor")
	        }
			this[attribute] = value;
			this._setConfig(attribute, value);
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'switchFullscreen',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.switchFullscreen is not a constructor")
	        }
			if ( document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || (this.container && this.container.style.position == 'fixed') ) {
				this.exitFullscreen()
			} else {
				this.lanuchFullscreen()
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'lanuchFullscreen',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.lanuchFullscreen is not a constructor")
	        }
			if ( document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ) return
			const rfs = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen || document.documentElement.mozRequestFullscreen || document.documentElement.requestFullScreen || document.documentElement.webkitRequestFullScreen || document.documentElement.mozRequestFullScreen
			if ( typeof rfs != 'undefined' && rfs && this.container ) {
				rfs.call(this.container)
			} else if (typeof window.ActiveXObject !== "undefined") {
				//IE浏览器，模拟按下F11全屏
				var wscript = new ActiveXObject("WScript.Shell");
				if (wscript != null) {
					wscript.SendKeys("{F11}");
				}
			} else {
				this._fullscreenerror()
			}
	    },
	    enumerable:false
	})
	Object.defineProperty(YBPlayer.prototype,'exitFullscreen',{
	    value:function(){
	        if(!(this instanceof YBPlayer)){//那么相反 不是正常调用的就是错误的调用
	           throw new TypeError("TypeError: YBPlayer.exitFullscreen is not a constructor")
	        }
			if ( document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ) {
				const cfs = document.exitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitExitFullscreen;
				if ( typeof cfs != 'undefined' && cfs ) {
					cfs.call(document)
				}
			} else if (typeof window.ActiveXObject !== "undefined") {
				//IE浏览器，模拟按下F11键退出全屏
				var wscript = new ActiveXObject("WScript.Shell");
				if (wscript != null) {
					wscript.SendKeys("{F11}");
				}
			} else {
				if ( this.container && this.container.style.position == 'fixed' ) {
					this.container.style.position = 'relative';
					this.container.style.width = '100%';
					this.container.style.height = '100%';
					this.container.style.top = 'inherit';
					this.container.style.left = 'inherit';
					this.container.style.right = 'inherit';
					this.container.style.bottom = 'inherit';
					this.container.style.zIndex = 'inherit';
					this.container.style.background = this._videoBackground
					this._videoBackground = 'inherit'
					this._cssfullscreenchange();
				}
			}
	    },
	    enumerable:false
	})
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = YBPlayer;
	else if ("function" == typeof define && define.amd) define([], YBPlayer);
	else {
		var t;
		t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.YBPlayer = YBPlayer
	}
})();