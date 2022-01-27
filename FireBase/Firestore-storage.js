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
                    <li class="list-group-item list-group-item-action position-relative" style="list-style: none;">
                        <div class="position-absolute end-0 me-3" style="z-index: 10">
                            <button class="btn btn-danger btn-sm ms-auto" id="delete">
                                <i class="fa-regular fa-trash"></i>
                            </button>
                        </div>
                        <a id="${doc.id}" class="post" style="text-decoration:none; color:black; cursor:pointer; z-index: 5">
                            <div class="card card-body mb-3 border-0">
                                <h4>${post.title}</h4>
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
            fs.collection('posts').get().then(snapshot => {
                setupPosts(snapshot.docs);
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
    });
    setPost();

}

function setPost() {
    if ($('#idDoc').val() == '') {
        $('#btnPostC').on('click', (e) => {
            e.preventDefault();
            $('#btnPostC').attr('disabled', true);
            //subir imagen a storage
            
            /*const file = document.getElementById('inp-img').files[0];
            const filePath = `images/${file.name}`;
            storageRef.child(filePath).put(file).then(snapshot => {
                console.log('Imagen subida');
            }).catch(error => {console.log(error.message);})*/


            //crear post en documento
            fs.collection('posts').add({
                title: $('#inp-title').val(),
                description: $('#inp-description').val(),
                //img: ,
                owner: auth.currentUser.uid,
                createdAt: new Date()
            }).then(() => {
                $('#progressPostform').width('100%');
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
                console.log(error);
                showError(error)
            })

        })
    } else {}
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
                $('#idDoc').val(item.id);
                $('#btnPostE').removeClass('d-none');
                $('#btnPostC').addClass('d-none');
                $('#formModalLabel').html('Editar Post');
                editPost();
            })
            .catch(error => {
                $('#errorModal').modal('show');
                $('#erroDescrip').val(error.message);
            })
        })
    })
}

function editPost() {
    $('#btnPostE').on('click', (e) => {
        e.preventDefault();
        $('#btnPostE').attr('disabled', true);

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

    })
}

function deletePost() {
    document.querySelectorAll('#delete').forEach(item => {
        item.addEventListener('click', (e) => {
            if (confirm('¿Estás seguro de eliminar esta publicación?')) {
                const idDoc = e.target.parentElement.parentElement.children[1].id;
                console.log(idDoc);
                fs.collection('posts').doc(idDoc).delete().then(() => {
                    console.log('Publicación eliminada');
                    getPosts();
                }).catch(error => {
                    console.log(error);
                    showError(error)
                })
            }
        })
    })
}