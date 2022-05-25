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
    } else if(data === 'Password is incorrect.'){
        window.alert('Password is incorrect')
    } else if(data === 'An error has occured.'){
        window.alert('An error has occured.')
    } else if(data === 'Username already exists, please enter a new username.'){
        window.alert('Username already exists, please enter a new username.')
    } else{
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
    exploreBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/api/posts')
          .then(response => response.json())
          .then(exploreData)
    })    
}

function exploreData(data){
    let postArr = [];
    let userArr = [];
    for(let i = 0; i < data.length; i++){
        
    }
}

explore();

getProfile();