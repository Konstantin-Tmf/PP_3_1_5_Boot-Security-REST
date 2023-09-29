const form_del = document.getElementById('formForDeleting');
const id_del = document.getElementById('id_del');
const firstname_del = document.getElementById('First name_del');
const lastname_del = document.getElementById('Last name_del');
const age_del = document.getElementById('age_del');
const username_del = document.getElementById('email_del');

async function deleteModalData(id) {
    const urlForDel = 'http://localhost:8189/rest/admin/users/' + id;
    let usersPageDel = await fetch(urlForDel);
    if (usersPageDel.ok) {
        let userData =
            await usersPageDel.json().then(user => {
                id_del.value = `${user.id}`;
                firstname_del.value = `${user.firstname}`;
                lastname_del.value = `${user.lastname}`;
                age_del.value = `${user.age}`;
                username_del.value = `${user.username}`;
            })
    } else {
        alert(`Error, ${usersPageDel.status}`)
    }
}

function deleteUser() {

    form_del.addEventListener('submit', deletingUser);

    function deletingUser(event) {
        event.preventDefault();
        let url = 'http://localhost:8189/rest/admin/users/' + id_del.value

        let method = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch(url, method).then(() => {
            $("#deleteCloseBtn").click();
            getAdminDashboardPage();
        });
    }
}