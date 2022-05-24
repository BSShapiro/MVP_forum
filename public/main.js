let current;

function getProfile(){
    // fetch('http://localhost:3000/api/profiles')
    // .then(response => response.json())
    // .then(handleData)
    let nav = document.getElementById('navcontainer');
    nav.style.display = 'none';
    let makepost = document.getElementById('makepost');
    makepost.style.display = 'none';
    let loginbtn = document.getElementById('loginbtn');
    let createAccount = document.getElementById('createAccount');
    let username = document.getElementById('username');
    let password = document.getElementById('password');

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
          method: 'POST', // or 'PUT'
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
          method: 'POST', // or 'PUT'
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

        let login = document.getElementById('login');
        login.style.display = 'none';
    }
}

getProfile();