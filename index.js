function saveToLocal(event) {
	event.preventDefault();
	//difining variable to both the entities of the UI 
	const name = event.target.name.value;
	const des = event.target.des.value;
	const categ=event.target.categ.value;

	//creating object so that we can access it
	const obj = {
		name,
		des,
		categ,
	};

	axios.post("https://crudcrud.com/api/7926794122ff4488b8a0dec50ea3c9be/tracker",obj)
	.then((response)=>{
		getUserList(response.data);
		// console.log(response.data);
	})
	.catch((err)=>{
		document.body.innerHTML+="<h1>Something went wrong</h1>";
		console.log(err);
	})

}
window.addEventListener("DOMContentLoaded", ()=>{
	axios.get("https://crudcrud.com/api/7926794122ff4488b8a0dec50ea3c9be/tracker")
	.then((response)=>{
		console.log(response.data);
		for(var i=0;i<response.data.length;i++){
			getUserList(response.data[i]);
		}
	})
	.catch((err)=>{
		document.body.innerHTML+="<h1>Something went wrong</h1>";
		console.log(err);
	})
})



function getUserList(user) {
	document.getElementById('name').value='';
	document.getElementById('des').value='';
	document.getElementById('categ').value='';

	const pntNode=document.getElementById('userList');
	console.log(user);

	const childNode=`<li id=${user._id}>${user.name}-${user.des}-${user.categ}
	<button onclick=deleteUser("${user._id}")>DeleteUser</button>
	<button onclick=editUser('${user.name}','${user.des}','${user.categ}','${user._id}')>EditUser</button>
	</li>`;

	pntNode.innerHTML=pntNode.innerHTML+childNode;

}

function editUser(name,des,categ,id){
	document.getElementById('name').value=name;
	document.getElementById('des').value=des;
	document.getElementById('categ').value=categ;

	deleteUser(id);
}

function deleteUser(userId){
	axios.delete(`https://crudcrud.com/api/7926794122ff4488b8a0dec50ea3c9be/tracker/${userId}`)
  .then((res)=>{
    removeUserFromScreen(userId)
  })
  .catch((err)=>{
      console.log(err)
    })
	removeUserFromScreen(userId);
}

function removeSameUser(des){
	console.log(des);
    const parentNode=document.getElementById('userList');
    const childNodeToBeDeleted=document.getElementById(des);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}


function removeUserFromScreen(userId){
	const parentNode=document.getElementById('userList');
	console.log(parentNode);
	const childNodeToBeDeleted=document.getElementById(userId);
	console.log(childNodeToBeDeleted);

	if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}