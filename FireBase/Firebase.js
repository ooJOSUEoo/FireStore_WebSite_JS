//firestore
getPosts();
setPost();


//post

function getPosts(){
    const postList = document.getElementById('posts')
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
            postList.innerHTML = html;
            getPost();
        }else{
            postList.innerHTML = `<p class="text-center">Logeate para ver las publicaciones</p>`;
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

function setPost(){
    const postForm = document.querySelector('#post-form');

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.querySelector('#inp-title').value;
        const description = document.querySelector('#inp-description').value;

        fs.collection('posts').add({
            title: title,
            description: description,
            owner: auth.currentUser.uid,
            createdAt: new Date()
        }).then(() => {
            postForm.reset();
            $('#formModal').modal('hide');
            $('.modal-backdrop.fade.show').addClass('d-none');
            getPost();
        }).error(error => {
            console.log(error);
        })

    })
}

function getPost(){
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