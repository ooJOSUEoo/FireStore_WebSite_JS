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
        $('#googleLogin').attr('disabled', true);

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                $('#progressLogin').width('100%');
                setTimeout(() => {
                    $('#googleLogin').attr('disabled', false);
                    $('#login-form').trigger('reset');
                    // close the modal
                    $('#loginModal').modal('hide');
                    $('.modal-backdrop.fade.show').addClass('d-none');
                    $('#progressLogin').width('0%');
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                showError(error)
            })
    })
}

//auth facebook
function facebookLogIn(){
    $('#facebookLogin').on('click', (e) => {
        e.preventDefault();
        $('#facebookLogin').attr('disabled', true);

        const provider = new firebase.auth.FacebookAuthProvider();

        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                $('#progressLogin').width('100%');
                setTimeout(() => {
                    $('#facebookLogin').attr('disabled', false);
                    $('#login-form').trigger('reset');
                    // close the modal
                    $('#loginModal').modal('hide');
                    $('.modal-backdrop.fade.show').addClass('d-none');
                    $('#progressLogin').width('0%');
                }, 1000);
            })
            .catch(error => {
                console.log(error);
                showError(error)
            })
    })
}

//auth email and password
function signup(){
    //crear cuenta en firebase Email y contraseña
    $('#signup-form').on('submit', (e) => {
        e.preventDefault();
        $('#signup-form').attr('disabled', true);

        auth
            .createUserWithEmailAndPassword($('#signup-email').val(), $('#signup-password').val())
            .then((userCredential) => {
                $('#progressSignup').width('100%');
                setTimeout(() => {
                    $('#signup-form').attr('disabled', false);
                    //clear form
                    $('#signup-form').trigger('reset');
                    // close the modal
                    $('#signupModal').modal('hide');
                    $('.modal-backdrop.fade.show').addClass('d-none');
                    $('#progressSignup').width('0%');
                }, 1000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                showError(error)
                // ..
            });
    });
}

function login(){
    $('#login-form').on('submit', (e) => {
        e.preventDefault();
        $('#login-form').attr('disabled', true);

        auth
            .signInWithEmailAndPassword($('#login-email').val(), $('#login-password').val())
            .then((userCredential) => {
                $('#progressLogin').width('100%');
                setTimeout(() => {
                    $('#login-form').attr('disabled', false);
                    //clear form
                    $('#login-form').trigger('reset');
                    // close the modal
                    $('#loginModal').modal('hide');
                    $('.modal-backdrop.fade.show').addClass('d-none');
                    $('#progressLogin').width('0%');
                }, 1000);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                showError(error)
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
                showError(error)
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
            var name = user.displayName;
            if (name.length > 0 || name != undefined || name !=""){
                console.log('name: ', name);
                $('#userName').html("Hola " + name);
                $('#imgPhoto').attr('alt', name);
                $('#imgPhoto').attr('src', user.photoURL);
            }
        }
        else{
            logged_in.forEach(item => item.classList.add('d-none'));
            logged_out.forEach(item => item.classList.remove('d-none'));
            $('#addPost').addClass('d-none');
            $('#userName').html("");
            $('#imgPhoto').attr('src', "");
            $('#imgPhoto').attr('alt', "");
        }
    }