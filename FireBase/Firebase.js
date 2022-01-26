//firestore
getPost();

//post

function getPost(){
    const postList = document.getElementById('posts')
    const setupPosts = data => {
        if(data.length){
            let html = '';
            data.forEach(doc => {
                const post = doc.data();
                const li = `
                    <li class"list-group-item list-group-item-action" style="list-style: none;">
                        <a id="${doc.id}" class="post" href="" style="text-decoration:none; color:black;">
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