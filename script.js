let currentRow = null;
const modal = document.getElementById("editModal");
const table = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
const form = document.getElementById("editForm");

document.getElementById("addBtn").addEventListener("click", () => {
  currentRow = null;
  form.reset();
  modal.style.display = "flex";
});

document.getElementById("closeBtn").onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };


document.getElementById("searchBar").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const rows = table.getElementsByTagName("tr");
  Array.from(rows).forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});


let sortDirection = {};
function sortTableByColumn(colIndex) {
  const rows = Array.from(table.rows);
  const direction = sortDirection[colIndex] = !sortDirection[colIndex];
  const isNumeric = colIndex >= 2 && colIndex <= 3;

  rows.sort((a, b) => {
    const valA = a.cells[colIndex].getAttribute("data-value") || a.cells[colIndex].innerText;
    const valB = b.cells[colIndex].getAttribute("data-value") || b.cells[colIndex].innerText;
    return direction
      ? (isNumeric ? valA - valB : valA.localeCompare(valB))
      : (isNumeric ? valB - valA : valB.localeCompare(valA));
  });

  rows.forEach(row => table.appendChild(row));
}


function editItem(button) {
  currentRow = button.closest("tr");
  document.getElementById("editName").value = currentRow.cells[0].innerText;
  document.getElementById("editDetails").value = currentRow.cells[1].innerText;
  document.getElementById("editQuantity").value = currentRow.cells[2].innerText;
  document.getElementById("editPrice").value = currentRow.cells[3].innerText.replace("₱", "");
  document.getElementById("editDate").value = currentRow.cells[4].innerText;
  modal.style.display = "flex";
}


function removeItem(button) {
  button.closest("tr").remove();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("editName").value;
  const details = document.getElementById("editDetails").value;
  const quantity = document.getElementById("editQuantity").value;
  const price = document.getElementById("editPrice").value;
  const date = document.getElementById("editDate").value;

  const rowHTML = `
    <td data-value="${name}">${name}</td>
    <td data-value="${details}">${details}</td>
    <td data-value="${quantity}">${quantity}</td>
    <td data-value="${price}">₱${price}</td>
    <td data-value="${date}">${date}</td>
    <td>
      <button onclick="editItem(this)">Edit</button>
      <button onclick="removeItem(this)">Remove</button>
    </td>`;

  if (currentRow) {
    currentRow.innerHTML = rowHTML;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = rowHTML;
  }

  modal.style.display = "none";
});
