function getProfile(){
    fetch('http://localhost:3000/api/profiles')
    .then(response => response.json())
    .then(handleData)
}

function handleData(data){
    console.log(data);
}

getProfile();