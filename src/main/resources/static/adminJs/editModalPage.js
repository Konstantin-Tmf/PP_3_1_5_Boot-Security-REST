const form_ed = document.getElementById('formForEditing');
const id_ed = document.getElementById('id_ed');
const firstname_ed = document.getElementById('Firstname_ed');
const lastname_ed = document.getElementById('Lastname_ed');
const age_ed = document.getElementById('age_ed');
const email_ed = document.getElementById('email_ed');
const password_ed = document.getElementById('password_ed');

async function editModalData(id) {
    const urlDataEd = 'http://localhost:8189/rest/admin/users/' + id;
    let usersPageEd = await fetch(urlDataEd);
    if (usersPageEd.ok) {
        let userData =
            await usersPageEd.json().then(async user => {
                id_ed.value = `${user.id}`;
                firstname_ed.value = `${user.firstname}`;
                lastname_ed.value = `${user.lastname}`;
                age_ed.value = `${user.age}`;
                email_ed.value = `${user.username}`;
                password_ed.value = `${user.password}`;
            })
    } else {
        alert(`Error, ${usersPageEd.status}`)
    }
}

async function editUser() {
    let urlEdit = 'http://localhost:8189/rest/admin/users/' + id_ed.value
    let listOfRole = [];

    for (let i = 0; i < form_ed.rolesForEditing.options.length; i++) {
        if (form_ed.rolesForEditing.options[i].selected) {
            listOfRole.push("ROLE_" + form_ed.rolesForEditing.options[i].value);
        }
    }

    let method = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname: form_ed.firstname.value,
            lastname: form_ed.lastname.value,
            age: form_ed.age.value,
            username: form_ed.username.value,
            password: form_ed.password.value,
            roles: listOfRole
        })
    }

    await fetch(urlEdit, method).then(() => {
        $('#editCloseBtn').click();
        getAdminDashboardPage();
    })
}