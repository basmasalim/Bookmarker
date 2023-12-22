let siteName = document.getElementById("siteName"),
  siteURL = document.getElementById("siteURL"),
  search = document.getElementById("search"),
  submit = document.getElementById("submit");

let mySites = [];

if (localStorage.getItem("sites") != null) {
  mySites = JSON.parse(localStorage.getItem("sites"));
  dispalyData();
}

function addNewSite() {
  if (validationName() == true && validationURL() == true) {
    let newSite = {
      name: siteName.value,
      url: siteURL.value,
    };
    mySites.push(newSite);
    localStorage.setItem("sites", JSON.stringify(mySites));
    dispalyData();
    clearData();
  }else{
 // model
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "The Site Name or URL is not valid.",
      footer: `<p class="text-start fw-semibold">
  <i class="icon-angle-double-right text-danger"></i> The Site Name must contain at least 3 characters.
  <br>
  <i class="icon-angle-double-right text-danger"></i> The Site URL must be valid.</p>`,
    });
  }
  }


function clearData() {
  siteName.value = "";
  siteURL.value = "";
}

function dispalyData() {
  let cartona = "";
  for (let i = 0; i < mySites.length; i++) {
    cartona += `
    <tr>
    <td>${i + 1}</td>
    <td>${mySites[i].name}</td>
    <td>
      <button class="btn btn-visit text-white text-center" >
        <a href="${
          mySites[i].url
        }" target="_blank" class="text-decoration-none">
          <i class="fa-solid fa-eye pe-2"></i> Visit
        </a>
      </button>
    </td>
    <td>
      <button class="btn btn-delete text-white btn-danger text-center" onclick="deleteData(${i})">
        <i class="fa-solid fa-trash-can"></i> Delete
      </button>
    </td>
  </tr>
    `;
  }
  document.getElementById("tableBookMark").innerHTML = cartona;
  let btnDelete = document.getElementById("deleteall");
  if (mySites.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteAll()" class="btn btn-danger">Delete ALL(${mySites.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}

function deleteData(id) {
  mySites.splice(id, 1);
  localStorage.setItem("sites", JSON.stringify(mySites));
  dispalyData();
}

function deleteAll() {
  localStorage.clear();
  mySites.splice(0);
  dispalyData();
}

function searchData() {
  let cartona = "";

  for (let i = 0; i < mySites.length; i++) {
    if (mySites[i].name.toLowerCase().includes(search.value.toLowerCase())) {
      cartona += `
          <tr>
            <td>${i + 1}</td>
            <td>${mySites[i].name}</td>
            <td>
              <button class="btn btn-visit text-white text-center">
                <a href="${
                  mySites[i].url
                }" target="_blank" class="text-decoration-none">
                  <i class="fa-solid fa-eye pe-2"></i> Visit
                </a>
              </button>
            </td>
            <td>
              <button class="btn btn-delete text-white btn-danger text-center" onclick="deleteData(${i})">
                <i class="fa-solid fa-trash-can"></i> Delete
              </button>
            </td>
          </tr>
        `;
    }
  }
  document.getElementById("tableBookMark").innerHTML = cartona;
}


function validationName() {
  let massageName = document.getElementById("massageName");
  const regexName = /^\w{3,8}(\s+\w+)*$/;
  let nameSite = siteName.value;
  if (regexName.test(nameSite)) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    massageName.classList.add("d-none");
    return true; // Validation passed
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    massageName.classList.remove("d-none");
    return false; // Validation failed
  }
}


function validationURL() {
  let massageURL = document.getElementById("massageURL");
  const regexURL = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;


  let URLSite = siteURL.value;
  if (regexURL.test(URLSite) == true) {
    siteURL.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
    massageURL.classList.add("d-none");
    return true; // Validation passed
  } else {
    siteURL.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    massageURL.classList.remove("d-none");
    return false; // Validation failed
  }
}
