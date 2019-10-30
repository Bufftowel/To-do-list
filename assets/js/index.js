let sample = document.getElementById("sample"), s;
let ol = document.querySelector("ol");
let list = [...document.querySelectorAll("li")],cnt = 0;
let css = document.querySelector("link");
let hasPrimaryTheme = false;
let input = document.querySelector("input");

function deleteNode(obj) {
	let id = obj.id.slice(2);
	for(let i = Number(id) + 1; i<=cnt; i++) {
		list[i-1].childNodes[0].textContent = list[i].textContent;
	}
	ol.removeChild(list[cnt]);
	list.pop();
	cnt--;
}

for(let i = 1; i < list.length; ++i) {
	cnt++;
	list[i].id = "id" + cnt;
	list[i].childNodes[0].addEventListener("mouseover",function(){
		this.classList.toggle("selected");
	});
	list[i].childNodes[0].addEventListener("mouseout",function(){
		this.classList.toggle("selected");
	});
	list[i].childNodes[0].addEventListener("click",function(){
		this.classList.toggle("checked");
	});
	if(i>1) list[i].childNodes[1].addEventListener("click",function(){
		s = list[i].textContent;
		list[i].childNodes[0].textContent = list[i-1].childNodes[0].textContent;
		list[i-1].childNodes[0].textContent = s;
	});
	 if(i!=list.length-1) list[i].childNodes[2].addEventListener("click",function(){
		s = list[i].textContent;
		list[i].childNodes[0].textContent = list[i+1].textContent;
		list[i+1].childNodes[0].textContent = s;
	});
	list[i].childNodes[3].addEventListener("click",function(){
		deleteNode(list[i]);
	});
}

document.getElementById("changeTheme").addEventListener("click",function(){
	if(hasPrimaryTheme)
		css.href = "assets/css/css2.css", hasPrimaryTheme = false;
	else css.href="assets/css/index.css", hasPrimaryTheme = true;
});

function add() {
								     // if x is declared globaly, then event functions will use it as it is,
	if(input.value=="")	{           // hence using last value of x, rather than the one intended.
		alert("Enter a valid task!");
		return;
	}
	let x = sample.cloneNode(1); 
	x.childNodes[0].textContent = input.value;
	cnt++;
	x.id = "id" + cnt;
	ol.appendChild(x);
	list.push(x);
	x.childNodes[0].addEventListener("mouseover",function(){
		this.classList.toggle("selected");
	});
	x.childNodes[0].addEventListener("mouseout",function(){
		this.classList.toggle("selected");
	});
	x.childNodes[0].addEventListener("click",function(){
		this.classList.toggle("checked");
	});
	x.childNodes[3].addEventListener("click",function(){
		deleteNode(x);
	});
	let y = document.getElementById("id" + (Number(x.id.slice(2))-1));
	x.childNodes[1].addEventListener("click",function(){
		if(cnt<=1) return;
		s = x.textContent;
		x.childNodes[0].textContent = y.textContent; // cannot use list[cnt-1] directly as when this function is called
		y.childNodes[0].textContent = s;            // value of cnt may not remain same.
	});
	y.childNodes[2].addEventListener("click",function(){
		s = y.textContent;
		y.childNodes[0].textContent = x.textContent;
		x.childNodes[0].textContent = s;
	});
}

document.querySelector(".add").addEventListener("click",add);

input.addEventListener("keypress",function(event){
	if(event.keyCode == 13) add();
});