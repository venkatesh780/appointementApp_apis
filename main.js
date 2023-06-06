const submitBtn = document.getElementById("submit");
const updateBtn = document.getElementById("update");
const appointmentList = document.getElementById("appointment-list");

updateBtn.style.display = "none";

// render items into page

async function renderItemsToPage() {
  let responseArr = await axios.get(
    "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/appointments"
  );
  let appointments = responseArr.data;

  appointmentList.innerHTML = "";

  appointments.forEach((item) => {
    const appointement = document.createElement("li");
    appointement.innerText = `${item.name} ${item.email} ${item.phone} ${item.date}`;

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.innerText = "Delete";

    appointement.appendChild(editBtn);
    appointement.appendChild(deleteBtn);

    appointmentList.appendChild(appointement);
  });
}

async function addItems(data) {
  let { name, email, phone, date } = data;
  let response1 = await axios.post(
    "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/appointments",
    {
      name,
      email,
      phone,
      date,
    }
  );
  let response2 = await renderItemsToPage();
  console.log(data);
}
function handleFormSubmission(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;

  let data = {
    name,
    email,
    phone,
    date,
  };
  addItems(data);
}
submitBtn.addEventListener("click", handleFormSubmission);

// renderItemsToPage();
