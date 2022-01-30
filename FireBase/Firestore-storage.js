//firestore
getPosts();
clickFormPost();

//post

function getPosts() {
    const setupPosts = data => {
        if (data.length) {
            let html = '';
            data.forEach(doc => {
                const post = doc.data();
                const li = `
                    <li class="list-group-item list-group-item-action position-relative mb-1" 
                    style="list-style: none; min-width: 295px; max-width: 90vh;">
                        <div class="position-absolute end-0 me-3" style="z-index: 10">
                            <button class="btn btn-danger btn-sm ms-auto" id="delete" iddoc="${doc.id}">
                                <i class="fa-regular fa-trash"></i>
                            </button>
                        </div>
                        <a id="${doc.id}" class="post" style="text-decoration:none; color:black; cursor:pointer; z-index: 5">
                            <div class="card card-body mb-3 border-0">
                                <h4>${post.title}</h4>
                                <img src="${post.img}" class="img-fluid w-50 h-50 ms-auto me-auto" alt="${post.title}">
                                <small>${post.description}</small>
                            </div>
                        </a>
                    </li>
                `;
                html += li;
            });
            $('#posts').html(html);
            getPostID();
            deletePost();

        } else {
            $('#posts').html(`<p class="text-center">Logeate para ver las publicaciones</p>`);
        }
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            //obtener datos de firestore y mostrarlos por el mas actual
            fs.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            //fs.collection('posts').get().then(snapshot => {
                    setupPosts(snapshot.docs);
                    setTimeout(() => {
                        //ponerle overflow-y: scroll al body
                        $('body').css('overflow-y', 'scroll');
                        $('body').css('overflow', 'auto');
                    }, 2000);
                })
                .catch(error => {
                    console.log(error);
                    showError(error)
                })
        } else {
            setupPosts([]);
        }
    })
}

function clickFormPost() {
    $('#addPost').on('click', (e) => {
        $('#post-form').trigger('reset');
        $('#idDoc').val('');
        $('#btnPostC').removeClass('d-none');
        $('#btnPostE').addClass('d-none');
        $('#formModalLabel').html('Crear Post');
        $('#imgPost').addClass('d-none');
        $('#infoImg').html('Seleccione una imagen');
    });
    setPost();

}

function setPost() {
    if ($('#idDoc').val() == '') {
        $('#btnPostC').on('click', (e) => {
            e.preventDefault();
            if (validateFormPost()) {
                $('#btnPostC').attr('disabled', true);

                //id del documento
                idNewDoc = fs.collection('posts').doc().id;

                console.log(idNewDoc);
                //subir imagen a storage
                const file = $('#inp-img').prop('files')[0];
                const filePath = `images/${idNewDoc}`;
                const uploadTask = storageRef.child(filePath).put(file)
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $('#progressPostform').width(progress + '%');
                    $('#progressPostform').html(progress.toFixed(0) + '%');
                }, (error) => {
                    console.log(error);
                    showError(error)
                }, () => {
                    //obtener url de la imagen
                    uploadTask.snapshot.ref.getDownloadURL().then(url => {
                        console.log(url);

                        //subir datos a firestore
                        fs.collection('posts').doc(idNewDoc).set({

                            title: $('#inp-title').val(),
                            description: $('#inp-description').val(),
                            img: url,
                            owner: auth.currentUser.uid,
                            createdAt: new Date()
                        }).then(() => {

                            setTimeout(() => {
                                $('#btnPostC').attr('disabled', false);
                                //clear form
                                $('#post-form').trigger('reset');
                                $('#formModal').modal('hide');
                                $('.modal-backdrop.fade.show').addClass('d-none');
                                $('#progressPostform').width('0%');
                            }, 1000);
                            console.log('Publicación agregada');
                            getPosts();
                        }).catch(error => {
                            showError(error)
                        })
                    }).catch(error => {
                        console.log(error);
                        showError(error)
                    });

                })
            }
        })
    }
}

function getPostID() {
    const post = document.querySelectorAll('.post');
    post.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            $('#formModal').modal('show');
            fs.collection('posts').doc(item.id).get().then(doc => {
                    const post = doc.data();
                    $('#inp-title').val(post.title);
                    $('#inp-description').val(post.description);
                    $('#imgPost').removeClass('d-none');
                    $('#imgPost').attr('src', post.img);
                    $('#infoImg').html('Seleccione una imagen nueva (obcional)');
                    $('#idDoc').val(item.id);
                    $('#btnPostE').removeClass('d-none');
                    $('#btnPostC').addClass('d-none');
                    $('#formModalLabel').html('Editar Post');
                    editPost();
                })
                .catch(error => {
                    $('#errorModal').modal('show');
                    $('#erroDescrip').val(error.message);
                    showError(error)
                })
        })
    })
}

function editPost() {
    $('#btnPostE').on('click', (e) => {
        e.preventDefault();
        if (validateFormPost(true)) {
            $('#btnPostE').attr('disabled', true);

            if ($('#inp-img').val() == '') {
                fs.collection('posts').doc($('#idDoc').val()).update({
                    title: $('#inp-title').val(),
                    description: $('#inp-description').val()
                    //owner: auth.currentUser.uid,
                    //createdAt: new Date()
                }).then(() => {
                    $('#progressPostform').width('100%');
                    setTimeout(() => {
                        $('#btnPostE').attr('disabled', false);
                        //clear form
                        $('#post-form').trigger('reset');
                        $('#formModal').modal('hide');
                        $('.modal-backdrop.fade.show').addClass('d-none');
                        $('#progressPostform').width('0%');
                    }, 1000);
                    console.log('Publicación editada');
                    getPosts();
                }).catch(error => {
                    console.log(error);
                    showError(error)
                })
            } else {
                //subir imagen a storage
                const file = $('#inp-img').prop('files')[0];
                const filePath = `images/${$('#idDoc').val()}`;
                const uploadTask = storageRef.child(filePath).put(file)
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    $('#progressPostform').width(progress + '%');
                    $('#progressPostform').html(progress.toFixed(0) + '%');
                }, (error) => {
                    console.log(error);
                    showError(error)
                }, () => {
                    //obtener url de la imagen
                    uploadTask.snapshot.ref.getDownloadURL().then(url => {
                        console.log(url);

                        fs.collection('posts').doc($('#idDoc').val()).update({
                            title: $('#inp-title').val(),
                            description: $('#inp-description').val(),
                            img: url,
                            //owner: auth.currentUser.uid,
                            //createdAt: new Date()
                        }).then(() => {
                            $('#progressPostform').width('100%');
                            setTimeout(() => {
                                $('#btnPostE').attr('disabled', false);
                                //clear form
                                $('#post-form').trigger('reset');
                                $('#formModal').modal('hide');
                                $('.modal-backdrop.fade.show').addClass('d-none');
                                $('#progressPostform').width('0%');
                            }, 1000);
                            console.log('Publicación editada');
                            getPosts();
                        }).catch(error => {
                            console.log(error);
                            showError(error)
                        })
                    }).catch(error => {
                        console.log(error);
                        showError(error)
                    });
                })

            }
        }

    })
}

function deletePost() {
    document.querySelectorAll('#delete').forEach(item => {
        item.addEventListener('click', (e) => {
            idDoc = ''
            if (e.target.getAttribute('idDoc')) {
                idDoc = e.target.getAttribute('idDoc');
            } else {
                idDoc = e.target.parentElement.getAttribute('idDoc');
            }
            if (confirm('¿Estás seguro de eliminar esta publicación?')) {
                console.log(idDoc);
                fs.collection('posts').doc(idDoc).delete().then(() => {
                    alert('Publicación eliminada');
                    storageRef.child(`images/${idDoc}`).delete().then(() => {}).catch(error => {
                        showError(error)
                    });
                    getPosts();
                }).catch(error => {
                    console.log(error);
                    showError(error)
                })
            }
        })
    })
}