
/**/
/*
	@author ABHISHEK BHASKAR @IIT MANDI

	
	--HOW TO USE--
		1) Define a class named parallax
			.parallax{
				position:fixed !important;
				top:0;
				left:0
			}
	   	2) Add class="parallax" to the elements to be parallaxed.

	   	3) set attribute parallaxspeed="required speed" to the elements ("required speed" should be in numbers).

	   	4) -(IMPORTANT)- Add class="mainBck" to the longest background element (if background is not being parallaxed add 
	   				   the class to the element having largest width), 

	   	5) set attribute dimensions="height x width" to the longest background element(for example dimensions="500x1000")
	   				dont insert spaces while writing dimensions value and write HEIGHTxWIDTH only.
	   	6) style elements with either .parallax or some other class or ID.
	   	7) for scroller at bottom Add this to HTML 
	   						<div class="scroller" onmousemove="scrollit(event)" onmouseenter="getentrycord(event)"></div>
	   			and this to css
	   				.scroller{
						position:fixed !important;
						z-index:1000;
						//top,left,width,height and other properties : as required;
	   				}

			if dont't want to use scroller remove this->
		*/var scroller=document.getElementsByClassName("scroller");/*
	   	 
	   	 --- Avoid use of window.pageYOffset or any such property or method that provide scrolled amount.
	   	 		(well, if necessary subtract 7000 from returned value of these properties or methods) 

	   	 --- Set scrollbar width to 0 for better view.

	   	You are done!
*/
/**/



window.requestAnimationFrame = window.requestAnimationFrame
							||window.mozRequestAnimationFrame
							||window.webkitRequestAnimationFrame
							||window.msRequestAnimationFrame
							||function(f){setTimeout(f,1000/60)}

function crossBtransform(selector,value){
	selector.style.transform=value;
			selector.style.webkitTransform=value;
			selector.style.mozTransform=value;
			selector.style.msTransform=value;
			selector.style.oTransform=value;

}
var parallax=document.getElementsByClassName("parallax");
function setparallax(){

	for(var i=0;i<parallax.length;i++){
		var attvalue=parallax[i].getAttribute("parallaxspeed")
		var speed=parseFloat(attvalue)
		crossBtransform(parallax[i],"translate3d("+(-movedata)*speed/5+"px,0,0)");
	}
}
document.body.style.height='20000px';
var mainBck=document.getElementsByClassName("mainBck");
var mbdV=mainBck[0].getAttribute("dimensions"),mbd=0,num=5,den=5;
for(var i=0;i< mbdV.length;i++){
	if(mbdV.charAt(i)=='x'){
		num=mbdV.slice(i+1,mbdV.length);
		den=mbdV.slice(0,i);
		mbd=num/den;
	}
}
var startpoint=7000,scrollcount=1,scrolling=false,scrolled=false;
var currentpoint=0,reqdiff=0,endpos=0;
var totalscrolled=0,instantscroll=0,directionchange=0,windowWidth=window.innerWidth;

window,scrollTo(0,7000);
function setscroll(){
	scrolling=true;
	theta=0;
	reqdiff=instantscroll/scrollcount;
	if(difference>0)
		scrolldirection=1;
	else
		scrolldirection=-1;
}
requestAnimationFrame(getdelay);
windowWidth=window.innerWidth;
var getdelaydata=0,gddcount=1,diffdelaydata=0;
var lastpoint=7000,difference=0;
function getdelay(){
	scrollcount+=1;
	directionchange+=.2;
	currentpoint=window.pageYOffset;
	if(gddcount==1){
		getdelaydata+=1;
		startpoint=currentpoint;
	}
	diffdelaydata+=1;
	if(diffdelaydata==3)
	{
		diffdelaydata=0;
		difference=currentpoint-lastpoint;
		if(instantscroll*difference<0){
			scrollcount=1;
			instantscroll=0;
		}
		if(difference>0&&difference>=reqdiff*2){
			reqdiff=difference/2;
			instantscroll=reqdiff*scrollcount;
			}
		if(difference<0&&difference<=reqdiff*2){
			reqdiff=difference/2;
			instantscroll=reqdiff*scrollcount;
		}
		instantscroll+=difference;
		totalscrolled+=difference;
		lastpoint=currentpoint;
	}
	requestAnimationFrame(getdelay);
}
var scrolldirection=0;
requestAnimationFrame(setmove);
var movedata=0,divider=48*60/1000,theta=0;
var backgroundWidth=window.innerHeight*mbd;
var angle=0,halfpisquare=Math.pow(Math.PI/2,2),mbsC=0;
function setmove(){
	backgroundWidth=window.innerHeight*mbd;
	for(var j=0;j<parallax.length;j++){
		parallax[j].style.width=backgroundWidth+'px'
	}
	mbsC=parseFloat(mainBck[0].getAttribute("parallaxspeed"));
	angle+=.2;
		
			theta+=.03;
			if(theta<=Math.PI/2){
				
				
				movedata=movedata+ reqdiff*Math.pow(Math.PI/2-theta,2)/halfpisquare;
			}
			else{
				gddcount=0;
			}
			if(theta>=.5){
					scrollcount=1;
					startpoint=currentpoint;
					instantscroll=0;
				}
		
	if(movedata<0){
		lastpoint=7000;
		movedata=1;
		window.scrollTo(0,7001);
	}
	if(movedata>=0&&movedata<=(backgroundWidth- windowWidth)*5/mbsC){
		endpos=window.pageYOffset;
		setparallax();
	}
	if(movedata>(backgroundWidth- windowWidth)*5/mbsC){
		window.scrollTo(0,endpos-1);
		movedata=(backgroundWidth- windowWidth)*5/mbsC;
		lastpoint=endpos;
	}
	requestAnimationFrame(setmove);
}
var starty,startx,currenty,currentx;
var scrollerPosition=0,translated=0,xcord=0;
function getentrycord(event){
	translated=(window.pageYOffset-7000)/5;
	scrollerPosition=event.clientX-translated;
}

////hover////

var hovering=false;
function sethover(event){
	hovering=true;
}
function scrollit(event){
	xcord=event.clientX;
	translated=xcord- scrollerPosition;
		window.scrollTo(0,(7000+translated*5))

	if(movedata<=1){
		translated=0;
		scrollerPosition=xcord;
	}

}
window.addEventListener('scroll',function(){
	requestAnimationFrame(setscroll);
},false);
