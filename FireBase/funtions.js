function showError(error) {
    $('.modal.fade').modal('hide');
    $('.modal-backdrop.fade.show').addClass('d-none');
    $('#errorModal').modal('show');
    $('#erroDescrip').html(error.message);
    $('#progressPostform').width('0%');
}

function validateFormAuth(){
    if($('#signup-email').val() == '' || $('#signup-password').val() == ''){
        $('#errorModal').modal('show');
        $('#erroDescrip').html('Por favor, llene todos los campos');
        $('#progressPostform').width('0%');
        return false;
    }else if($('#login-email').val() == '' || $('#login-password').val() == ''){
        $('#errorModal').modal('show');
        $('#erroDescrip').html('Por favor, llene todos los campos');
        $('#progressPostform').width('0%');
        return false;
    }else{
        return true;
    }
}

function validateFormPost(edit){
    if(edit){
        if($('#inp-title').val() == '' || $('#inp-description').val() == ''){
            $('#errorModal').modal('show');
            $('#erroDescrip').html('Por favor, llene todos los campos');
            $('#progressPostform').width('0%');
            return false;
        }else{
            return true;
        }
    }else{
        if($('#inp-title').val() == '' || $('#inp-description').val() == '' || $('#inp-img').val() == ''){
            $('#errorModal').modal('show');
            $('#erroDescrip').html('Por favor, llene todos los campos');
            $('#progressPostform').width('0%');
            return false;
        }else{
            return true;
        }
    }
}

document.getElementById('btn-collapse').addEventListener('click', function() {
    if (document.getElementById('navbarNav').classList.contains('show')) {
        document.getElementById('navbarNav').classList.remove('show');
    } else {
        document.getElementById('navbarNav').classList.add('show');
    }
});

