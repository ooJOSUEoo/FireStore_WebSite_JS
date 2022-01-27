
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
    $('#googleLogin').on('click', (e) => {
        e.preventDefault();

        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                $('#loginForm').trigger('reset');
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
    $('#facebookLogin').on('click', (e) => {
        e.preventDefault();

        const provider = new firebase.auth.FacebookAuthProvider();

        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                $('#loginForm').trigger('reset');
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
    //crear cuenta en firebase Email y contraseña
    $('#signup-form').on('submit', (e) => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword($('#signup-email').val(), $('#signup-password').val())
            .then((userCredential) => {
                // Signed in
                //clear form
                $('#signup-form').trigger('reset');
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
    $('#login-form').on('submit', (e) => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword($('#login-email').val(), $('#login-password').val())
            .then((userCredential) => {
                // Signed in
                //clear form
                $('#login-form').trigger('reset');
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
    $('#logout').on('click', (e) => {
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