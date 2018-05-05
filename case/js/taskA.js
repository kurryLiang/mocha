

//——————————————遮罩层{
window.onload=function(){
	var registerInstace , onMoveStartId , mousePos = {x:0,y:0};	
	function g(id){return document.getElementById(id);}

	function autoCenter( el ){
		var bodyW = document.documentElement.clientWidth;
		var bodyH = document.documentElement.clientHeight;

		var elW = el.offsetWidth;
		var elH = el.offsetHeight;

		el.style.left = (bodyW-elW)/2 + 'px';
		el.style.top = (bodyH-elH)/2 + 'px';
		
	}
	
	function fillToBody( el ){
		el.style.width  = document.documentElement.clientWidth  +'px';
		el.style.height = document.documentElement.clientHeight + 'px';
	}
}


//————————————————鼠标拖拽
window.onload=function(){		
	function Register( dragId , moveId ){

		var instace = {} ;

		instace.dragElement  = g(dragId);	
		instace.moveElement  = g(moveId);

		instace.mouseOffsetLeft = 0;			
		instace.mouseOffsetTop = 0;			

		instace.dragElement.addEventListener('mousedown',function(e){

			var e = e || window.event;

			registerInstace = instace;
			instace.mouseOffsetLeft = e.pageX - instace.moveElement.offsetLeft ;
			instace.mouseOffsetTop  = e.pageY - instace.moveElement.offsetTop ;
			
			onMoveStartId = setInterval(onMoveStart,10);
			return false;
			
		})

		return instace;
	}

	document.onmouseup = function(e){
		registerInstace = false;
		clearInterval(onMoveStartId);
	}
	document.onmousemove = function( e ){
		var e = window.event || e;
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;

		e.stopPropagation && e.stopPropagation();
		e.cancelBubble = true;
		e = this.originalEvent;
        e && ( e.preventDefault ? e.preventDefault() : e.returnValue = false );

        document.body.style.MozUserSelect = 'none';
	}	

	function onMoveStart(){

		var instace = registerInstace;
	    if (instace) {
	    	
	    	var maxX = document.documentElement.clientWidth -  instace.moveElement.offsetWidth;
	    	var maxY = document.documentElement.clientHeight - instace.moveElement.offsetHeight ;

			instace.moveElement.style.left = Math.min( Math.max( ( mousePos.x - instace.mouseOffsetLeft) , 0 ) , maxX) + "px";
			instace.moveElement.style.top  = Math.min( Math.max( ( mousePos.y - instace.mouseOffsetTop ) , 0 ) , maxY) + "px";

	    }

	}

	function showregister(){
		g('register').style.display = 'block';
		g('mask').style.display = 'block';
		autoCenter( g('register') );
		fillToBody( g('mask') );
	}

	function hideregister(){
		g('register').style.display = 'none';
		g('mask').style.display = 'none';
	}

	window.onresize = showregister;

	Register('registerDrag','register');
	showregister();
}

//——————————————————}

//——————————————表单验证

	function getLength(str){
	return str.replace(/[^\x00-xff]/g,"xx").length;
	}

	function findStr(str,n){
		var tmp=0;
		for(var i=0;i<str.length;i++){

			if (str.charAt(i)==n) {
				tmp++;
			}
		}

		return tmp;
	}


window.onload=function(){
	var ainput=document.getElementsByTagName('input');
	var oname=ainput[0];
	var pwd=ainput[1];
	var pwd2=ainput[2];
	var ap=document.getElementsByTagName('p');
	var name_msg=ap[0];
	var pwd_msg=ap[1];
	var pwd2_msg=ap[2];
	var count=document.getElementById('count');
	var aem=document.getElementsByTagName('em');
	var name_length=0;


//输入用户名

	oname.onfocus=function(){
		name_msg.style.display="block";
		name_msg.innerHTML='<i class="ati"></i>5~16characters,Composed of numbers and letters.'
	}

	oname.onkeyup=function(){
		count.style.visibility="visible";
		name_length=getLength(this.value);
		count.innerHTML=name_length+"characters";
		if (name_length==0) {
			count.style.visibility="hidden";
		}
	}

	oname.onblur=function(){
		var re1=/[^\w\u4e00-\u9fa5]/g;
		var re2=/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,}$/;
		if(re1.test(this.value)){
			name_msg.innerHTML='<i class="err"></i>Contains illegal characters!';
			}

		else if(this.value==""){
				name_msg.innerHTML='<i class="err"></i>Can not be empty!';
			}

		else if(name_length>16){
				name_msg.innerHTML='<i class="err"></i>More than 16 characters!';
			}

		else if(name_length<5){
				name_msg.innerHTML='<i class="err"></i>Less than 5 characters!';
			}

		else{
				if (re2.test(this.value)) {
					name_msg.innerHTML='<i class="err"></i>OK!';
				}

				else
					name_msg.innerHTML='<i class="ok"></i>Must consist of numbers and letters!';
		}	
	}

//输入密码
 
	pwd.onfocus=function(){
		pwd_msg.style.display="block";
		pwd_msg.innerHTML='<! class="ati"></i>Contains 6-20 characters, please use letters and numbers or symbols.';
	}

	pwd.onkeyup=function(){
		if(this.value.length>5){
			
			pwd2.removeAttribute("disabled");
			pwd2_msg.style.display="block";
		}

		else{ 
			
			pwd2.setAttribute("disabled","disabled");
			pwd2_msg.style.display="none";
		}

	}

	pwd.onblur=function(){
		var m=findStr(pwd.value,pwd.value[0]);
		var re_n=/[^\d]/g;
		var re_t=/[^a-zA-Z]/g;

		if (this.value=="") {
			pwd_msg.innerHTML='<i class"err"></i>Can not be empty!';
		}

		else if (m==this.value.length) {
			pwd_msg.innerHTML='<i class"err"></i>Can not use the same characters!';
		}

		else if (this.value.length<6||this.value.length>20) {
			pwd_msg.innerHTML='<i class"err"></i>The length should be 6-20 characters!';
		}

		else if (!re_n.test(this.value)) {
			pwd_msg.innerHTML='<i class"err"></i>Can not all be numbers!';
		}

		else if (!re_t.test(this.value)) {
			pwd_msg.innerHTML='<i class"err"></i>Can not all be letters!';
		}

		else{
			pwd_msg.innerHTML='<i class"ok"></i>OK';
		}

	}

//确认密码

	pwd2.onblur=function(){
		if (this.value!=pwd.value) {
			pwd2_msg.innerHTML='<i class"err"></i>The passwords entered twice are not the same!';
		}

		else{
			pwd2_msg.innerHTML='<i class"ok"></i>OK';
		}
	}
}