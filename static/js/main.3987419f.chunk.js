(this["webpackJsonpglyphs-no-1"]=this["webpackJsonpglyphs-no-1"]||[]).push([[0],{17:function(e,i,t){},30:function(e,i,t){"use strict";t.r(i);var n=t(1),s=t.n(n),a=t(9),r=t.n(a),d=(t(17),t(2));window.p5=d;t(19);var c=t(10),o=t(0);function u(){return Object(o.jsxs)("svg",{id:"play-icon",className:"fade-out",xmlns:"http://www.w3.org/2000/svg",height:"24",viewBox:"0 0 24 24",width:"24",children:[Object(o.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),Object(o.jsx)("path",{d:"M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"})]})}var l=t(11),h=t(12),m=function(){function e(i,t,n,s,a,r){var d=arguments.length>6&&void 0!==arguments[6]?arguments[6]:.1;Object(l.a)(this,e),this.p=i,this.origin=this.p.createVector(t,n),this.hue=s,this.size=0,this.maxSize=a,this.setLifeTime(r),this.opacity=d}return Object(h.a)(e,[{key:"setLifeTime",value:function(e){var i=this.p.getFrameRate()?this.p.getFrameRate():60;this.totalsFrames=i*e}},{key:"draw",value:function(){for(var e=0;e<this.maxSize/this.totalsFrames;e++)this.p.stroke(this.hue,0,0),this.p.fill(this.hue,100,100,this.opacity),this.p.ellipse(this.origin.x,this.origin.y,this.size,this.size),this.size<this.maxSize&&this.size++}}]),e}(),C=t.p+"static/media/circles-no-5.684b96df.ogg",g=t.p+"static/media/circles-no-5.b54c0b1d.mid",p=function(){var e=Object(n.useRef)(),i=function(e){e.canvas=null,e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.audioLoaded=!1,e.player=null,e.PPQ=15360,e.tempo=86,e.barAsSeconds=60/e.tempo*4,e.loadMidi=function(){c.Midi.fromUrl(g).then((function(i){var t=i.tracks[6].notes,n=i.tracks[1].notes;e.scheduleCueSet(t,"executeCueSet1"),e.scheduleCueSet(n,"executeCueSet2",!0),e.audioLoaded=!0,document.getElementById("loader").classList.add("loading--complete"),document.getElementById("play-icon").classList.remove("fade-out")}))},e.preload=function(){e.song=e.loadSound(C,e.loadMidi),e.song.onended(e.logCredits)},e.scheduleCueSet=function(i,t){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=-1,a=1,r=0;r<i.length;r++){var d=i[r],c=d.ticks,o=d.time;(c!==s||n)&&(d.currentCue=a,e.song.addCue(o,e[t],d),s=c,a++)}},e.bgHue=0,e.packedCirclesSet=[],e.setup=function(){for(e.canvas=e.createCanvas(e.canvasWidth,e.canvasHeight),e.colorMode(e.HSB),e.bgHue=e.random(0,360),e.background(e.bgHue,100,100,.2);e.packedCirclesSet.length<200;){var i=e.random(e.width/6,e.width/3)/2;e.packedCirclesSet.length>=13?i=e.random(e.width/64,e.width/32)/2:e.packedCirclesSet.length>=5&&(i=e.random(e.width/24,e.width/12)/2);for(var t={x:e.random(0,e.width),y:e.random(0,e.height),r:i},n=!1,s=0;s<e.packedCirclesSet.length;s++){var a=e.packedCirclesSet[s];if(e.dist(t.x,t.y,a.x,a.y)<t.r+a.r){n=!0;break}}n||e.packedCirclesSet.push(t)}},e.draw=function(){if(e.audioLoaded&&e.song.isPlaying())for(var i=0;i<e.mainCircleSet.length;i++){e.mainCircleSet[i].draw()}},e.mainCircleSet=[],e.bigCircleIndex=0,e.xPos=0,e.yPos=0,e.hue=0,e.hueDirection=0,e.size=0,e.sizeReducer=0,e.executeCueSet1=function(i){var t=i.duration,n=i.currentCue;if(n%16==1&&n<81){var s=e.packedCirclesSet[e.bigCircleIndex];e.hue=e.random(0,360),e.hueDirection=Math.random()<.5?"up":"down",e.xPos=s.x,e.yPos=s.y,e.size=2*s.r,e.sizeReducer=e.size/8,e.bigCircleIndex++}if(n<81){var a=t>1?e.size:e.size/16;e.mainCircleSet.push(new m(e,e.xPos,e.yPos,e.hue,a,e.barAsSeconds/2)),t>1&&(e.size=e.size-e.sizeReducer,"up"===e.hueDirection?e.hue=e.hue+15<360?e.hue+15:e.hue+15-360:e.hue=e.hue-15>0?e.hue-15:e.hue-15+360)}else e.mainCircleSet.push(new m(e,e.width/2,e.height/2,e.hue,2*e.width,e.barAsSeconds/2,.002))},e.mediumCircleIndex=5,e.mediumCircleHue=5,e.mediumCircleSize=0,e.mediumCircleIndexCount=0,e.smallCircleIndex=13,e.executeCueSet2=function(i){var t=i.duration,n=i.midi,s=!1,a=0,r=0,d=0,c=1,o=1e3*t;switch(e.stroke(0),n){case 36:s=!0,d=100;break;case 37:s=!0;break;case 42:s=!0,a=e.random(0,360),r=100,d=100,c=.1;break;case 44:s=!0,e.mediumCircleHue=0===e.mediumCircleIndexCount?e.random(0,360):e.mediumCircleHue,r=75,d=75;break;case 45:s=!0,a=e.bgHue,r=100,d=100,c=.5;break;default:s=!1}s&&function(){for(var i=44===n?e.packedCirclesSet[e.mediumCircleIndex]:e.packedCirclesSet[e.smallCircleIndex],t=i.x,s=i.y,u=2*i.r,l=function(i){44===n?(e.mediumCircleSize=0===e.mediumCircleIndexCount?u:u-u/6*e.mediumCircleIndexCount,setTimeout((function(){var n=i>2?e.mediumCircleSize/2:e.mediumCircleSize;e.stroke(0,0,100),e.fill(e.mediumCircleHue,r,d,c),e.ellipse(t,s,n,n),e.mediumCircleHue=e.mediumCircleHue+60>360?e.mediumCircleHue+60-360:e.mediumCircleHue+60}),o*i)):setTimeout((function(){45===n?e.stroke(0,0,100):42===n&&e.stroke(a,r,d,c),e.fill(a,r,d,c),e.ellipse(t,s,u/i,u/i),36!==n&&37!==n||(d=d?0:100)}),o*i)},h=1;h<4;h+=h/2)l(h);44===n?(e.mediumCircleIndexCount++,e.mediumCircleIndexCount>5&&(e.mediumCircleIndexCount=0,e.mediumCircleIndex++)):e.smallCircleIndex++}()},e.mousePressed=function(){e.audioLoaded&&(e.song.isPlaying()?e.song.pause():(parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&e.reset(),document.getElementById("play-icon").classList.add("fade-out"),e.canvas.addClass("fade-in"),e.song.play()))},e.creditsLogged=!1,e.logCredits=function(){!e.creditsLogged&&parseInt(e.song.currentTime())>=parseInt(e.song.buffer.duration)&&(e.creditsLogged=!0,console.log("Music By: http://labcat.nz/","\n","Animation By: https://github.com/LABCAT/"),e.song.stop())},e.reset=function(){},e.updateCanvasDimensions=function(){e.canvasWidth=window.innerWidth,e.canvasHeight=window.innerHeight,e.canvas=e.resizeCanvas(e.canvasWidth,e.canvasHeight)},window.attachEvent?window.attachEvent("onresize",(function(){e.updateCanvasDimensions()})):window.addEventListener&&window.addEventListener("resize",(function(){e.updateCanvasDimensions()}),!0)};return Object(n.useEffect)((function(){new d(i,e.current)}),[]),Object(o.jsx)("div",{ref:e,children:Object(o.jsx)(u,{})})};var f=function(){return Object(o.jsx)(p,{})};r.a.render(Object(o.jsx)(s.a.StrictMode,{children:Object(o.jsx)(f,{})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.3987419f.chunk.js.map