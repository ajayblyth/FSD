const form = document.getElementById("userForm");
const tableBody = document.getElementById("userTableBody");

// used for fetching users from the server and displaying them in the table
const fetchUsers = async () => {

    try {
        const res = await axios.get("/users");
        const users = res.data;

        tableBody.innerHTML = "";

        users.forEach(user => {
            tableBody.innerHTML += `
              <tr>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.age}</td>

    <td>
        <button onclick="editUser('${user.id}')">
            Edit
        </button>

        <button onclick="deleteUser('${user.id}')">
            Delete
        </button>
    </td>
</tr>
            `;
        });

    } catch (err) {
        console.log(err);
    }
};

//add user

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const userData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        age: document.getElementById("age").value
    };

    try {
       if (editId) {

    await axios.patch(`/users/${editId}`, userData);

    editId = null;

} else {

    await axios.post("/users", userData);

}

form.reset();

fetchUsers();
    } catch (err) {
        console.log(err.response?.data || err.message);
    }
});

fetchUsers(); //used for fetching users when page loads

const deleteUser = async (id) => {

    try {

        await axios.delete(`/users/${id}`);

        fetchUsers();

    } catch (err) {

        console.log(err);

    }

};

let editId = null;

const editUser = async (id) => {

    try {

        const res = await axios.get(`/users/${id}`);

        const user = res.data;

        document.getElementById("name").value = user.name;

        document.getElementById("email").value = user.email;

        document.getElementById("age").value = user.age;

        editId = user.id;

    }

    catch (err) {

        console.log(err);

    }

};