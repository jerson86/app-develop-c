function users(page){
    document.getElementById('cardHeader').innerHTML = '<h5><i class="fa-solid fa-users"></i> Listado de usuarios</h5>'
    const REQRES_ENDPOINT = 'https://reqres.in/api/users?page='+page
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) =>{
        return response.json().then(
            data => {
                return {
                    status: response.status,
                    info: data
                }
            }
        )
    })
    .then((result) => {
        if(result.status === 200){
            let listUsers = `
            <button type="button" class="btn btn-outline-success" onclick="addUser()">
                <i class="fa-solid fa-user-plus"></i>
            </button>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
            `
            result.info.data.forEach(user => {
                listUsers = listUsers + `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td><img src="${user.avatar}" class="img-thumbnail" alt="avatar del usuario"></td>
                        <td>
                            <button type="button" class="btn btn-outline-info" onclick="getUser('${user.id}')"><i class="fa-solid fa-eye"></i></button>
                        </td>
                    </tr>
                `  
            });
            listUsers = listUsers + `
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#usersPage1" onclick="users('1')">1</a></li>
                    <li class="page-item"><a class="page-link" href="#usersPage2" onclick="users('2')">2</a></li>
                    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
            `
            document.getElementById('info').innerHTML = listUsers
        }
        else{
            document.getElementById('info').innerHTML = 'No existen usuarios en la BD'
        }
    })
}

function getUser(idUser){
    const REQRES_ENDPOINT = 'https://reqres.in/api/users/'+idUser
    fetch(REQRES_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((response) =>{
        return response.json().then(
            data => {
                return {
                    status: response.status,
                    info: data
                }
            }
        )
    })
    .then((result) =>{
        if(result.status === 200){
            const user = result.info.data
            showModalUser(user)
        }
        else{
            document.getElementById('info').innerHTML = 
                '<h3>No se encontro el usuario en la Api</h3>'
        }
    })

}

function showModalUser(user){
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
                <img src="${user.avatar}" class="card-img-top" alt="Avatar del usuario">
                <div class="card-body">
                    <h5 class="card-title">Información del usuario</h5>
                    <p class="card-text">Correo: ${user.email}</p>
                    <p class="card-text">Nombre: ${user.first_name}</p>
                    <p class="card-text">Apellido: ${user.last_name}</p>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById('modalUser').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}

function addUser(){
    const modalUser = `
    <!-- Modal -->
    <div class="modal fade" id="showModalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fa-solid fa-user-plus"></i> Agregar Usuario</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card">
                <div class="card-body">
                    <form id="formAddUser">
                        <div class="row">
                            <div class="col">
                                <input type="text" id="first_name" class="form-control" placeholder="Primer nombre" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="text" id="last_name" class="form-control" placeholder="Apellidos" aria-label="Last name" required>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col">
                                <input type="email" id="email" class="form-control" placeholder="Correo" aria-label="First name" required>
                            </div>
                            <div class="col">
                                <input type="url" id="avatar" class="form-control" placeholder="Link del avatar" aria-label="Last name" required>
                            </div>
                        </div>

                        <div class="row mt-3 ">
                            <div class="col text-center">
                                <button type="button" class="btn btn-success" onclick="saveUser()">
                                    <i class="fa-solid fa-floppy-disk"></i> Guardar
                                </button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `
    document.getElementById('modalUser').innerHTML = modalUser
    const modal = new bootstrap.Modal(document.getElementById('showModalUser'))
    modal.show()
}

function saveUser(){
    const form = document.getElementById('formAddUser')
    if(form.checkValidity()){
        const first_name = document.getElementById('first_name').value
        const last_name = document.getElementById('last_name').value
        const email = document.getElementById('email').value
        const avatar = document.getElementById('avatar').value
        const user = {first_name, last_name, email, avatar}

        const REQRES_ENDPOINT = 'https://reqres.in/api/users'
        fetch(REQRES_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            },
            body: JSON.stringify(user)
        })
        .then((response) =>{
            return response.json().then(
                data => {
                    return {
                        status: response.status,
                        info: data
                    }
                }
            )
        })
        .then((result) =>{
            if(result.status === 201){
                document.getElementById('info').innerHTML = 
                    '<h3 class="text-success">El usuario se guardo correctamente <i class="fa-solid fa-check"></i></h3>'
            }
            else{
                document.getElementById('info').innerHTML = 
                    '<h3 class="text-danger">No se guardo el usuario en la Api <i class="fa-solid fa-x"></i></h3>'
            }
            const modalId = document.getElementById('showModalUser')
            const modal = bootstrap.Modal.getInstance(modalId)
            modal.hide()
        })
    }
    else{
        form.reportValidity()
    }
}