
//Auth
//google
googleLogIn()
//facebook
facebookLogIn();

//email, password
signup()
login()
logout()
//futions

//auth google
function googleLogIn(){
    const loginForm = document.querySelector('#login-form');
    const googleBtn = document.getElementById('googleLogin');

    googleBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                loginForm.reset();
                // close the modal
                $('#loginModal').modal('hide');
                $('.modal-backdrop.fade.show').addClass('d-none');
            })
            .catch(error => {
                console.log(error);
                if(error.code === 'auth/account-exists-with-different-credential'){
                    alert('Este usuario ya esta registrado con otra cuenta');
                }
            })
    })
}

//auth facebook
function facebookLogIn(){
    const loginForm = document.querySelector('#login-form');
    const facebookBtn = document.getElementById('facebookLogin');

    facebookBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const provider = new firebase.auth.FacebookAuthProvider();

        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                loginForm.reset();
                // close the modal
                $('#loginModal').modal('hide');
                $('.modal-backdrop.fade.show').addClass('d-none');
            })
            .catch(error => {
                console.log(error);
                if(error.code === 'auth/account-exists-with-different-credential'){
                    alert('Este usuario ya esta registrado con otra cuenta');
                }
            })
    })
}

//auth email and password
function signup(){
    const signupForm = document.querySelector('#signup-form');
    //crear cuenta en firebase Email y contraseña
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const signupEmail = document.getElementById('signup-email').value;
        const signupPassword = document.getElementById('signup-password').value;

        auth
            .createUserWithEmailAndPassword( signupEmail, signupPassword)
            .then((userCredential) => {
                // Signed in
                //clear form
                signupForm.reset();
                // close the modal
                $('#signupModal').modal('hide');
                $('.modal-backdrop.fade.show').addClass('d-none');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
    });
}

function login(){
    const loginForm = document.querySelector('#login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const loginEmail = document.getElementById('login-email').value;
        const loginPassword = document.getElementById('login-password').value;

        auth
            .signInWithEmailAndPassword( loginEmail, loginPassword)
            .then((userCredential) => {
                // Signed in
                //clear form
                loginForm.reset();
                // close the modal
                $('#loginModal').modal('hide');
                $('.modal-backdrop.fade.show').addClass('d-none');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
    })
}

function logout(){
    const logout = document.getElementById('logout');

    logout.addEventListener('click', (e) => {
        e.preventDefault();

        auth.signOut()
            .then(() => {
                // Sign-out successful.
                console.log('Sesión cerrada');
            })
            .catch((error) => {
                // An error happened.
                console.log(error);
            });
    })
}

//------------------------------------------------------------------

checkUser();

function checkUser(){
    auth.onAuthStateChanged(user => {
        if(user){
                loginCheck(user);
        }else{
            loginCheck(user);
        }
    })
}

const logged_out = document.querySelectorAll('.logged-out');
const logged_in = document.querySelectorAll('.logged-in');

    const loginCheck = user => {
        if(user){
            logged_in.forEach(item => item.classList.remove('d-none'));
            logged_out.forEach(item => item.classList.add('d-none'));
            $('#addPost').removeClass('d-none');
        }
        else{
            logged_in.forEach(item => item.classList.add('d-none'));
            logged_out.forEach(item => item.classList.remove('d-none'));
            $('#addPost').addClass('d-none');
        }
    }