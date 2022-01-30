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

//dar click al boton del header cuando la pagina esta en mobile
document.getElementById('btn-collapse').addEventListener('click', function() {
    if (document.getElementById('navbarNav').classList.contains('show')) {
        document.getElementById('navbarNav').classList.remove('show');
    } else {
        document.getElementById('navbarNav').classList.add('show');
    }
});


//seguridad a la imagen
$('#inp-img').change(function(e){
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    var size = file.size;
    //mostrar el tamaño del archivo en kb y mb
    var sizeKb = size / 1024;
    var sizeMb = sizeKb / 1024;
    if(sizeKb > 1024){
        size = sizeMb.toFixed(2) + ' MB';
    }else{
        size = sizeKb.toFixed(2) + ' KB';
    }
    $('#infoImg').html(file.name + ' - ' + size);
    console.log(size);
    if(sizeKb > 1024){
        $('#errorModal').modal('show');
        $('#erroDescrip').html('El archivo es muy grande (max 1mb = 1024kb), su archivo tiene ' + size);;
        $('#inp-img').val('');
        $('#infoImg').html('Seleccione una imagen');
        $('#btnPostE').attr('disabled', true);
    }else{$('#btnPostE').attr('disabled', false);}

    if (!file.type.match('image.*')) {
        console.log('es una imagen');
        $('#errorModal').modal('show');
        $('#erroDescrip').html('El archivo no es una imagen');
        $('#inp-img').val('');
        $('#infoImg').html('Seleccione una imagen');
        $('#btnPostE').attr('disabled', true);
    }else{$('#btnPostE').attr('disabled', false);}
});