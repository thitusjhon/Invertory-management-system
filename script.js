const modal = document.getElementById("modal");
const addBtn = document.getElementById("addBtn");
const closeModal = document.getElementById("closeModal");
const partForm = document.getElementById("partForm");
const inventoryTable = document.querySelector("#inventoryTable tbody");
const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const searchBar = document.getElementById("searchBar");

let editRow = null;

addBtn.onclick = () => {
  modal.style.display = "flex";
  partForm.reset();
  imagePreview.innerHTML = "";
  editRow = null;
};

closeModal.onclick = () => (modal.style.display = "none");

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = <img src="${e.target.result}" />;
    };
    reader.readAsDataURL(file);
  }
});

partForm.onsubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;
  const date = document.getElementById("date").value;
  const image = imagePreview.innerHTML;

  const rowHTML = `
    <td>${name}</td>
    <td>${description}</td>
    <td>${quantity}</td>
    <td>₱${price}</td>
    <td>${date}</td>
    <td>${image}</td>
    <td>
      <button onclick="editPart(this)">Edit</button>
      <button onclick="removePart(this)">Remove</button>
    </td>
  `;

  if (editRow) {
    editRow.innerHTML = rowHTML;
  } else {
    const newRow = inventoryTable.insertRow();
    newRow.innerHTML = rowHTML;
  }

  modal.style.display = "none";
};

window.editPart = function (button) {
  editRow = button.closest("tr");
  const cells = editRow.cells;
  document.getElementById("name").value = cells[0].innerText;
  document.getElementById("description").value = cells[1].innerText;
  document.getElementById("quantity").value = cells[2].innerText;
  document.getElementById("price").value = cells[3].innerText.replace("₱", "");
  document.getElementById("date").value = cells[4].innerText;
  imagePreview.innerHTML = cells[5].innerHTML;
  modal.style.display = "flex";
};

window.removePart = function (button) {
  if (confirm("Are you sure you want to remove this part?")) {
    button.closest("tr").remove();
  }
};

searchBar.addEventListener("input", () => {
  const searchValue = searchBar.value.toLowerCase();
  Array.from(inventoryTable.rows).forEach(row => {
    const partName = row.cells[0].textContent.toLowerCase();
    row.style.display = partName.includes(searchValue) ? "" : "none";
  });
});
