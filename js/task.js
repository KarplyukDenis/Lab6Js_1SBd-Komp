document.getElementById('load-data-btn').addEventListener('click', loadData);
document.getElementById('clear-btn').addEventListener('click', clearData);
document.getElementById('show-table-yes').addEventListener('click', showTable);
document.getElementById('show-table-no').addEventListener('click', resetPage);
document.querySelectorAll('th').forEach(th => th.addEventListener('click', sortTable));
document.getElementById('clear-sorting-btn').addEventListener('click', clearSorting);

let data = [];
let originalData = [];

function loadData() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(json => {
            data = json;
            originalData = [...json];
            document.getElementById('record-count').textContent = data.length;
            document.getElementById('status').textContent = '';
            document.getElementById('confirmation').style.display = 'block';
            document.getElementById('load-data-btn').disabled = true;
            document.getElementById('clear-btn').disabled = false;
        })
        .catch(error => {
            document.getElementById('status').textContent = error.message;
        });
}

function clearData() {
    document.getElementById('url-input').value = '';
    document.getElementById('status').textContent = '';
    document.getElementById('confirmation').style.display = 'none';
    document.getElementById('data-table').style.display = 'none';
    document.getElementById('load-data-btn').disabled = false;
    document.getElementById('clear-btn').disabled = true;
    document.getElementById('clear-sorting-btn').style.display = 'none';
}

function showTable() {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = '';
    data.forEach(item => {
        const row = `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.username}</td>
            <td>${item.email}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
    document.getElementById('data-table').style.display = 'table';
    document.getElementById('clear-sorting-btn').style.display = 'block';
}

function resetPage() {
    clearData();
}

function sortTable(event) {
    const column = event.target.getAttribute('data-column');
    const order = event.target.dataset.order = -(event.target.dataset.order || -1);
    data.sort((a, b) => {
        return (a[column] > b[column] ? 1 : -1) * order;
    });
    showTable();
    document.querySelectorAll('th').forEach(th => th.classList.remove('sorted'));
    event.target.classList.add('sorted');
}

function clearSorting() {
    data = [...originalData];
    showTable();
    document.querySelectorAll('th').forEach(th => th.classList.remove('sorted'));
}
