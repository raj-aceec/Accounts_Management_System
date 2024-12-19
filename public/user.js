document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('add-account-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const account_number = document.getElementById('account-number').value;
        const account_name = document.getElementById('account-name').value;
        const account_type = document.getElementById('account-type').value;
        const balance = document.getElementById('balance').value;
        const opening_date = document.getElementById('opening-date').value;
        const last_transaction_date = document.getElementById('last-transaction-date').value;
        const status = document.getElementById('status').value;
        const branch = document.getElementById('branch').value;
        const response = await fetch('/users/add-account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account_number, account_name, account_type, balance, opening_date, last_transaction_date, status, branch })
        });
        const result = await response.json();
        alert(result.message);
    });
    document.getElementById('delete-account-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const account_number = document.getElementById('delete-account-number').value;
        const response = await fetch(`/users/delete-account/${account_number}`, {
            method: 'DELETE'
        });
        const result = await response.json();
        alert(result.message);
    });
    document.getElementById('request-account-form').addEventListener('submit', async function (e) {
        e.preventDefault();
        const account_number = document.getElementById('request-account-number').value;
        const user_id = document.getElementById('request-user-id').value;
        const response = await fetch('/users/request-account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account_number, user_id })
        });
        const result = await response.json();
        alert(result.message);
    });
});
