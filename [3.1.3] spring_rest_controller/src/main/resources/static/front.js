//------------------------------------Refresh an entire table------------------------------------\\

function refreshTable() {
    let table = document.getElementById('usersTable')
    if (table.rows.length > 1) {
        table.deleteRow(1);
    }
    setTimeout(getUsers, 140)
}
//------------------------------------Users list------------------------------------\\

function getUsers() {

    fetch("http://localhost:8080/api/admin/findAllUsers")
        .then((res) => res.json())
        .then((data) => {
            let temp = "";
            data.forEach(function (u) {
                temp += "<tr>";
                temp += "<td>" + u.id + "</td>";
                temp += "<td>" + u.firstName + "</td>";
                temp += "<td>" + u.lastName + "</td>";
                temp += "<td>" + u.username + "</td>";
                temp += "<td>" + u.roles.map(role => role.name.replace('ROLE_', '')) + "</td>";
                temp += ' <td> <button className="btn btn-info btn-md" type="button" data-toggle="modal" ' +
                    'data-target="#editModal" onClick="fillModal(' + u.id + ')">Edit</button> </td>';
                temp += ' <td> <button className="btn btn-danger btn-md" type="button" data-toggle="modal" ' +
                    'data-target="#deleteModal"  onClick="fillModal('+ u.id + ')">Delete</button> </td> </tr>';
            });
            document.getElementById("usersTable").innerHTML = temp;
        })
}
getUsers()

//------------------------------------Modals------------------------------------\\

function fillModal(id) {
    fetch("http://localhost:8080/api/admin/getUserBy/" + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json().then(u => {
            document.getElementById('id').value = u.id;
            document.getElementById('editFirstName').value = u.firstName;
            document.getElementById('editLastname').value = u.lastName;
            document.getElementById('editEmail').value = u.username;
            document.getElementById('editPassword').value = u.password;
            document.getElementById('delId').value = u.id;
            document.getElementById('delFirstName').value = u.firstName;
            document.getElementById('delLastname').value = u.lastName;
            document.getElementById('delEmail').value = u.username;
            document.getElementById('delPassword').value = u.password;
        })
    });
    refreshTable();
}
//------------------------------------Show user------------------------------------\\

function showUser() {
    const showUserURL = 'http://localhost:8080/api/admin/getUserByUsername';
    fetch(showUserURL)
        .then((res) => res.json())
        .then((u) => {

            let temp = "<tr>";
            temp += "<tr>";
            temp += "<td>" + u.id + "</td>";
            temp += "<td>" + u.firstName + "</td>";
            temp += "<td>" + u.lastName + "</td>";
            temp += "<td>" + u.username + "</td>";
            temp += "<td>" + u.roles.map(role => role.name.replace('ROLE_', '')) + "</td> </tr>";
            temp += "<tr>";
            document.getElementById("userTable").innerHTML = temp;
        })
}
showUser();

//------------------------------------Create user------------------------------------\\

document.getElementById("newUserForm")
    .addEventListener("submit", newUserForm);

function newUserForm(e){
    e.preventDefault();

    let firstName = document.getElementById("addFirstName").value;
    let lastName = document.getElementById("addLastname").value;
    let username = document.getElementById("addEmail").value;
    let password = document.getElementById("addPassword").value;
    let roles = selectRole(Array.from(document.getElementById("addRole").selectedOptions)
        .map(r => r.value));

    fetch("http://localhost:8080/api/admin/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            roles: roles
        })
    })
        .then(() => {
            document.getElementById("usersTab").click();
            getUsers();
            document.getElementById("newUserForm").reset();
        })
}

//------------------------------------Edit button------------------------------------\\

function butEdit() {

    let user = {
        id: document.getElementById('id').value,
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastname').value,
        username: document.getElementById('editEmail').value,
        password: document.getElementById('editPassword').value,
        roles: selectRole(Array.from(document.getElementById("editRole").selectedOptions)
            .map(r => r.value))
    }

    fetch("http://localhost:8080/api/admin/update", {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)

    })
    $("#editModal .close").click();
    refreshTable();
}

//------------------------------------Select role------------------------------------\\
function selectRole(r) {
    let roles = [];
    if (r.indexOf("USER") >= 0) {
        roles.push({"id": 1});
    }
    if (r.indexOf("ADMIN") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}

//------------------------------------Delete button------------------------------------\\

function buttonDelete() {
    fetch("http://localhost:8080/api/admin/delete/" + document.getElementById('delId').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    $("#deleteModal .close").click();
    refreshTable();
}
