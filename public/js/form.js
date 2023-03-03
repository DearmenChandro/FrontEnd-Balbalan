//Feather Icons
feather.replace();
        function goBack() {
            window.history.back();
        }

//Form validation
const email = document.querySelector('.email') || null;
const username = document.querySelector('.username');
const phoneNum = document.querySelector('.phone_num');
const password = document.querySelector('.password');
const passwordConfirm = document.querySelector('.password_confirm');
const submitButton = document.querySelector('#register-button');

if (email == null){
    //Kalau email kosong, berarti lagi di login page
    
} else{
    //Kalau email ngga null, maka lagi di register page

    submitButton.addEventListener('click', () =>{
        fetch('register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                phoneNum: phoneNum.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value
            })
            .then(res => res.json())
            .then(data => {
                if(data.username){
                    alert('register success');
                } else{
                    alert(data);
                }
            })
        })
    })
}