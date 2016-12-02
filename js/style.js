var wrap=document.getElementById("wrap");
var inner=document.getElementById("inner");
var spanList=document.getElementById("paganation").getElementByTagName("span");
var left=document.getElementById("left");
var right=document.getElementById("right");

var clickFlag=true;
var time
var index=0;
var Distance=wrap.offsetWidth;

function AutoGo(){
	var start=inner.offsetLeft;
	var end=index*Distance*(-1);
	var change=end-start;

	var timer;
	var t=0;
	var maxT=30;
	clear();
	if(index==spanList.length){
		spanList[0].className="selected";
	}else{
		spanList[index].className="selected";
	}
	clearInterval(timer);
	timer=setInterval(function(){
		t++;
		if(t>=maxT){
			clearInterval(timer);
			clickFlag=true;
		}
		inner.style.left=change/maxT*t+start+"px";
		if(index==spanList.length&&t>=maxT){
			inner.style.left=0;
			index=0;
		}
	},17);
}

function forward(){
	index++;
	if(index>spanList.length){
		index=0;
	}
	AutoGo();
}

function backward(){
	index--;
	if(index<0){
		index=spanList.length-1;
		inner.style.left=(index+1)*Distance*(-1)+"px";
	}
	AutoGo();
}

time=setInterval(forward,3000);

wrap.onmouseover=function(){
	clearInterval(time);
}
wrap.onmouseout=function(){
	time=clearInterval(forward,3000);
}

for(var i=0;i<spanList.length;i++){
	spanList[i].onclick=function(){
		index=this.innerText-1;
		AutoGo();
	}
}

left.onclick=function(){
	if(clickFlag){
		backward();
	}
	clickFlag=false;
}

right.onclick=function(){
	if(clickFlag){
		forward();
	}
	clickFlag=false;
}

function clear() {
	for(var i=0;i<spanList.length;i++){
		spanList[i].className="";
	}
}