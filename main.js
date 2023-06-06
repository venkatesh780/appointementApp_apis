const submitBtn = document.getElementById("submit");
const updateBtn = document.getElementById("update");
const appointmentList = document.getElementById("appointment-list");

updateBtn.style.display = "none";

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
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";

  document.getElementById("name").focus();
}

async function updateItem(itemIndex, data) {
  let { name, email, phone, date } = data;
  let response = await axios.put(
    "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/appointments/" +
      itemIndex,
    {
      name,
      email,
      phone,
      date,
    }
  );
  renderItemsToPage();

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("date").value = "";

  document.getElementById("name").focus();

  submitBtn.style.display = "block";
  updateBtn.style.display = "none";
}

async function handleEditDelete(e) {
  e.preventDefault();

  if (e.target.innerText === "Delete") {
    let items = e.target.parentElement.innerText.split(" ");
    let appointementsArr = await axios.get(
      "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/appointments"
    );
    let appointements = appointementsArr.data;
    let itemId;
    appointements.forEach((item) => {
      if (
        item.name === items[0] &&
        item.email === items[1] &&
        item.phone === items[2]
      ) {
        itemId = item._id;
      }
    });
    let response = await axios.delete(
      "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/appointments/" +
        itemId
    );
    renderItemsToPage();
  } else if (e.target.innerText === "Edit") {
    let items = e.target.parentElement.innerText.split(" ");
    document.getElementById("name").value = items[0];
    document.getElementById("email").value = items[1];
    document.getElementById("phone").value = items[2];

    submitBtn.style.display = "none";
    updateBtn.style.display = "block";
    updateBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      let appointementsArr = await axios.get(
        "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/appointments"
      );

      let appointements = appointementsArr.data;
      let itemId;
      appointements.forEach((item) => {
        if (
          item.name === items[0] &&
          item.email === items[1] &&
          item.phone === items[2]
        ) {
          itemId = item._id;
        }
      });

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
      updateItem(itemId, data);
    });
  }
}
submitBtn.addEventListener("click", handleFormSubmission);
appointmentList.addEventListener("click", handleEditDelete);

renderItemsToPage();
