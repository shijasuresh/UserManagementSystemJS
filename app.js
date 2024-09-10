let users = [];
let usersContainer = document.getElementById('usersContainer');
let alert = document.getElementById('alert');

function renderUsers(){
    usersContainer.innerHTML = "";
        users.forEach((user, index)=>{
            let div = document.createElement('div');
            let flexDiv = document.createElement('div');
            let name = document.createElement('p');
            let email = document.createElement('p');
            let delButton = document.createElement('button');

            div.classList.add('user');
            flexDiv.classList.add('flex-div');
            name.innerText = user.name;
            email.innerText = user.email;

            // delButton.innerText = 'Delete';
            delButton.innerHTML = '<i class="bi bi-trash"></i>';
            delButton.classList.add('btn-delete');
            delButton.onclick = () => deleteUser(index);

            usersContainer.appendChild(div);
            div.appendChild(flexDiv);
            div.appendChild(delButton);
            flexDiv.appendChild(name);
            flexDiv.appendChild(email);
        })
}

function doesUserExist(email){
    let user = users.filter((user)=>{
        return user.email == email
    })
    return user.length > 0 ? true : false;
}

function hideAlert(){
    setTimeout(()=>{
        alert.classList.remove('success', 'danger')
    }, 2000)
}

function addUser(){
    let name = document.getElementById('name');
    let email = document.getElementById('email');

    let user = {
        name: name.value,
        email: email.value,
    };
    let userExists = doesUserExist(email.value);
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(name.value == ""){
        alert.classList.add('danger');
        alert.innerText = 'Please provide a name!';
        hideAlert();
    }
    else if(email.value == "")
    {
        alert.classList.add('danger');
        alert.innerText = 'Please provide an email!';
        hideAlert();
    }
    else if(!emailPattern.test(email.value)){
        alert.classList.add('danger');
        alert.innerText = 'Please provide a valid email!';
        hideAlert();
    }
    else if(userExists){
        alert.classList.add('danger');
        alert.innerText = 'Email already exists!';
        hideAlert();
    }
    else{
        users.push(user);
        alert.classList.add('success');
        alert.innerText = 'User added successfully!';
        hideAlert();
    }
    renderUsers();
}

function deleteUser(index){
    users.splice(index, 1);
    renderUsers();
    alert.classList.add('success');
    alert.innerText = 'User deleted successfully!';
    hideAlert();
}