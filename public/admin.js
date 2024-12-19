document.addEventListener("DOMContentLoaded", () => {
    const createUserForm = document.getElementById("create-user-form");
    const updateUserForm = document.getElementById("update-user-form");
    const userList = document.getElementById("user-list");
    const requestsList = document.getElementById("requests-list");
    const auditLogsList = document.getElementById("audit-logs-list");
    fetchUsers();
    fetchAccountRequests();
    fetchAuditLogs();
    createUserForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("new-username").value;
        const password = document.getElementById("new-password").value;
        const role = document.getElementById("new-role").value;
        try {
            const response = await fetch("/admin/create-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role })
            });
            const result = await response.json();
            if (result.success) {
                alert("User created successfully!");
                fetchUsers();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error creating user:", error);
        }
    });
    userList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("delete-user-btn")) {
            const userId = e.target.dataset.userid;
            try {
                const response = await fetch(`/admin/delete-user/${userId}`, { method: "DELETE" });
                const result = await response.json();
                if (result.success) {
                    alert("User deleted successfully!");
                    fetchUsers();
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    });
    document.getElementById('update-user-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('update-username').value;
        const newUsername = document.getElementById('new-username-update').value;
        const newPassword = document.getElementById('new-password-update').value;
        const newRole = document.getElementById('new-role-update').value;

        // Ensure the newUsername is provided to update
        if (!newUsername) {
            alert('Please provide a new username.');
            return;
        }
        fetch('/admin/update-user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, newUsername, newPassword, newRole })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('User updated successfully!');
                    location.reload();  
                } else {
                    alert('Error updating user');
                }
            })
            .catch(err => console.error('Error updating user:', err));
    });
    fetch("/admin/customers")
        .then(response => response.json())
        .then(customers => {
            const tableBody = document.querySelector('#customers-table tbody');
            tableBody.innerHTML = '';
            customers.forEach(customer => {
                tableBody.innerHTML += `
                <tr>
                    <td>${customer.account_number}</td>
                    <td>${customer.account_name}</td>
                    <td>${customer.balance}</td>
                </tr>
            `;
            });
        })
        .catch(err => console.error('Error fetching customers:', err));
    async function fetchUsers() {
        try {
            const response = await fetch("/admin/users");
            const users = await response.json();
            userList.innerHTML = "";
            users.forEach(user => {
                const userElement = document.createElement("div");
                userElement.innerHTML = `
                    Username: ${user.username}<br> Role: ${user.role}&nbsp;&nbsp;
                    <button class="delete-user-btn" data-userid="${user.user_id}">Delete</button>
                `;
                userList.appendChild(userElement);
            });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    async function fetchAccountRequests() {
        try {
            const response = await fetch("/admin/account-requests");
            const requests = await response.json();
            requestsList.innerHTML = "";
            requests.forEach(request => {
                const requestElement = document.createElement("div");
                requestElement.innerHTML = `
                    Request ID: ${request.request_id}, Account Number: ${request.account_number}, Status: ${request.status}
                    <button class="approve-request-btn" data-requestid="${request.request_id}">Approve</button>
                `;
                requestsList.appendChild(requestElement);
            });
        } catch (error) {
            console.error("Error fetching account requests:", error);
        }
    }
    requestsList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("approve-request-btn")) {
            const requestId = e.target.dataset.requestid;
            try {
                const response = await fetch(`/admin/approve-request/${requestId}`, { method: "PUT" });
                const result = await response.json();
                if (result.success) {
                    alert("Request approved successfully!");
                    fetchAccountRequests();
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error("Error approving request:", error);
            }
        }
    });
    async function fetchAuditLogs() {
        try {
            const response = await fetch("/admin/audit-logs");
            const logs = await response.json();
            auditLogsList.innerHTML = "";
            logs.forEach(log => {
                const logElement = document.createElement("div");
                logElement.innerHTML = `
                    Time: ${log.timestamp}, Action: ${log.action}
                `;
                auditLogsList.appendChild(logElement);
            });
        } catch (error) {
            console.error("Error fetching audit logs:", error);
        }
    }
});    
