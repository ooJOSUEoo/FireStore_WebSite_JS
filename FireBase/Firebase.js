//firestore
getPosts();
clickFormPost();


//post

function getPosts(){
    const setupPosts = data => {
        if(data.length){
            let html = '';
            data.forEach(doc => {
                const post = doc.data();
                const li = `
                    <li class"list-group-item list-group-item-action" style="list-style: none;">
                        <a id="${doc.id}" class="post" style="text-decoration:none; color:black; cursor:pointer;">
                            <div class="card card-body mb-3">
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
        }else{
            $('#posts').html(`<p class="text-center">Logeate para ver las publicaciones</p>`);
        }
    }

    auth.onAuthStateChanged(user => {
        if(user){
            fs.collection('posts').get().then(snapshot => {
                setupPosts(snapshot.docs);
            })
        }else{
            setupPosts([]);
        }
    })
}

function clickFormPost(){
    $('#addPost').on('click', (e) => {
        $('#post-form').trigger('reset');
    });
    setPost();

}
function setPost(){
    $('#post-form').on('submit', (e) => {
        e.preventDefault();

        fs.collection('posts').add({
            title: $('#inp-title').val(),
            description: $('#inp-description').val(),
            owner: auth.currentUser.uid,
            createdAt: new Date()
        }).then(() => {
            $('#post-form').trigger('reset');
            $('#formModal').modal('hide');
            $('.modal-backdrop.fade.show').addClass('d-none');
            console.log('Publicación agregada');
            getPosts();
        }).catch(error => {
            console.log(error);
        })

    })
}

function getPostID(){
    const post = document.querySelectorAll('.post');
    post.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            $('#formModal').modal('show');
            fs.collection('posts').doc(item.id).get().then(doc => {
                const post = doc.data();
                $('#inp-title').val(post.title);
                $('#inp-description').val(post.description);
                $('#btn-save').val(item.id);
            })
        })   
    })
}