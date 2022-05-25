let current;

function getProfile(){
    let nav = document.getElementById('navcontainer');
    nav.style.display = 'none';
    let makepost = document.getElementById('makepost');
    makepost.style.display = 'none';
    let loginbtn = document.getElementById('loginbtn');
    let createAccount = document.getElementById('createAccount');
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let usernameLogged = document.getElementById('usernamelogged');
    usernameLogged.style.display = 'none';

    loginbtn.addEventListener('click', () =>{
        const data = {
            user_name: username.value,
            password: password.value
         };
         if(data.user_name.length === 0 || data.password.length === 0){
             window.alert('Please enter your username and password or create an account.');
             return undefined;
         }
         console.log(data);
         fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(handleData)
        .catch((error) => {
          console.error('Error:', error);
        });
    })

    createAccount.addEventListener('click', () => {
        const data = {
            user_name: username.value,
            password: password.value
         };
         if(data.user_name.length === 0 || data.password.length === 0){
            window.alert('Please enter your username and password or create an account.');
            return undefined;
        }
         console.log(data);
         fetch('http://localhost:3000/api/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(handleData)
        .catch((error) => {
          console.error('Error:', error);
        });
    })
}

function handleData(data){
    console.log(data);
    if(data === 'Account does not exist, please make a new account.'){
        window.alert('Account does not exist, please make a new account.')
        return undefined;
    } else if(data === 'Password is incorrect.'){
        window.alert('Password is incorrect')
        return undefined;
    } else if(data === 'An error has occured.'){
        window.alert('An error has occured.')
        return undefined;
    } else if(data === 'Username already exists, please enter a new username.'){
        window.alert('Username already exists, please enter a new username.')
        return undefined;
    } else{
        let profilePosts = document.getElementById('profileposts');
        profilePosts.style.display = 'none';
        let nav = document.getElementById('navcontainer');
        nav.style.display = 'block';
        current = data.id;
        
        let usernameLogged = document.getElementById('usernamelogged');
        usernameLogged.style.display = 'block';
        usernameLogged.append(`Logged in as: ${data.user_name}`);

        let login = document.getElementById('login');
        login.style.display = 'none';

        let makepost = document.getElementById('makepost');
        makepost.style.display = 'block';
    }
    window.setInterval(()=>{
        fetch('http://localhost:3000/api/posts')
          .then(response => response.json())
          .then(exploreData)
    }, 500)
    makePost();
}

function makePost(){
    let postArea = document.getElementById('post');
    let postbtn = document.getElementById('postbtn');
    postbtn.addEventListener('click', () => {
        data = {
            post: postArea.value,
            user_id: current
        }
        if(data.post.length === 0){
            window.alert('Please type a post first.');
            return undefined;
        }
        fetch('http://localhost:3000/api/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(appendPost)
        .catch((error) => {
          console.error('Error:', error);
        });
        postArea.value = '';
    })
}

function appendPost(data){
    
}

function explore(){
    let data;
    let exploreBtn = document.getElementById('explore');
    let postArea = document.getElementById('postarea');
    postArea.style.display = 'block';
    exploreBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/api/posts')
          .then(response => response.json())
          .then(exploreData)
    })    
}

function exploreData(data){
    let postArr = [];
    let userArr = [];
    let dateArr = [];
    let useridArr = [];
    let postArea = document.getElementById('postarea');
    postarea.innerHTML = '';
    for(let i = 0; i < data.length; i++){
        postArr.push(data[i].post);
        userArr.push(data[i].user_name);
        dateArr.push(data[i].date);
        useridArr.push(data[i].user_id);
        
        let mainPost = document.createElement('div');
        let newPost = document.createElement('div');
        let postDate = document.createElement('div');
        let userPost = document.createElement('div');


        userPost.append('@' + userArr[i]);
        newPost.append(postArr[i]);
        postDate.append(dateArr[i]);

        mainPost.append(userPost);
        mainPost.append(newPost);
        mainPost.append(postDate);
        //mainPost.className = 'poststyle';
        mainPost.className = 'postself';
        
        postArea.appendChild(mainPost);
        postArea.className = 'poststyle';
    }
}
function profileBtn(){
    let profileBtn = document.getElementById('profile');
    profileBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/api/posts/${current}`)
          .then((response) => response.json())
          .then(profileFunc)
    })
}

function profileFunc(data){
    let postArr = [];
    let userArr = [];
    let dateArr = [];
    let useridArr = [];
    let profilePosts = document.getElementById('profileposts');
    profilePosts.innerHTML = '';
    let postArea = document.getElementById('postarea');
    postArea.style.display = 'none';
    for(let i = 0; i < data.length; i++){
        postArr.push(data[i].post);
        userArr.push(data[i].user_name);
        dateArr.push(data[i].date);
        useridArr.push(data[i].user_id);
        
        let mainPost = document.createElement('div');
        let newPost = document.createElement('div');
        let postDate = document.createElement('div');
        let userPost = document.createElement('div');


        userPost.append('@' + userArr[i]);
        newPost.append(postArr[i]);
        postDate.append(dateArr[i]);

        mainPost.append(userPost);
        mainPost.append(newPost);
        mainPost.append(postDate);
        //mainPost.className = 'poststyle';
        mainPost.className = 'postself';
        
        profilePosts.appendChild(mainPost);
        profilePosts.className = 'poststyle';
    }
}

profileBtn();

explore();

getProfile();