function showError(error) {
    $('.modal.fade').modal('hide');
    $('.modal-backdrop.fade.show').addClass('d-none');
    $('#errorModal').modal('show');
    $('#erroDescrip').html(error.message);
}