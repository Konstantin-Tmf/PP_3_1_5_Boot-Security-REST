const url_new = 'http://localhost:8189/rest/admin/new';
const roles_new = document.querySelector('#roles').selectedOptions;
const form_new = document.forms["formForCreatingNewUser"];

async function newUser() {
    form_new.addEventListener('submit', addNewUser)

    async function addNewUser(e) {
        e.preventDefault();
        let listOfRole = [];
        for (let i = 0; i < roles_new.length; i++) {
            listOfRole.push("ROLE_" + roles_new[i].value);
        }

        let method = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: form_new.firstname.value,
                lastname: form_new.lastname.value,
                age: form_new.age.value,
                username: form_new.username.value,
                password: form_new.password.value,
                roles: listOfRole
            })
        }

        await fetch(url_new, method).then(() => {
            form_new.reset();
            getAdminDashboardPage();
            $("#tabBtnAllUsers").click();
        });
    }
}