let nameInput = document.querySelector("#ProductName");
let priceInput = document.querySelector("#ProductPrice");
let categoryInput = document.querySelector("#ProductCategory");
let descInput = document.querySelector("#ProductDesc");
let picInput = document.querySelector("#ProductPic");
let addBtn = document.querySelector("#btn-add");
let uptBtn = document.querySelector("#btn-update");
let searchInput = document.querySelector("#search");
let displayList = document.querySelector("#rowData");
let pId = 0;
let productcontainer = [];
if (localStorage.getItem("products") !== null) {
  productcontainer = JSON.parse(localStorage.getItem("products"));
  display(productcontainer);
}
addBtn.addEventListener("click", function () {
  adding();
});
function adding() {
  let product = {
    code: nameInput.value,
    price: priceInput.value,
    category: categoryInput.value,
    desc: descInput.value,
    image: `images/${picInput.files[0]?.name}`,
  };
  // console.log(productcontainer[0].image);

  productcontainer.push(product);
  localStorage.setItem("products", JSON.stringify(productcontainer));
  display(productcontainer);
  clear();
}

function display(arr) {
  let box = [];
  for (let i = 0; i < arr.length; i++) {
    box += `
        <div class="col-md-3">
        <div class="inner rounded-1 shadow bg-white">
            <img src="${arr[i].image}" alt="" class="w-100  d-block rounded-top-1 pt-3">
            <div class="p-3">
                <p>${arr[i].code}</p>
                <p>${arr[i].price}</p>
                <p>${arr[i].category}</p>
                <p>${arr[i].desc}</p>
                <button class="mb-2 btn btn-warning d-block w-100 rounded-pill text-white" onclick="setUpdateItems(${i})"><i class="fa-solid fa-pen-nib me-1 fa-rotate-270"></i>update</button>
                <button class="btn btn-danger d-block w-100 rounded-pill" onclick="deleteItem(${i})"><i class="fa-solid fa-delete-left me-1 fa-rotate-180"></i> delete</button>
            </div>
        </div>
    </div>
        `;
  }
  displayList.innerHTML = box;
}
function clear() {
  nameInput.value = null;
  priceInput.value = null;
  categoryInput.value = null;
  descInput.value = null;
  picInput.value = null;
}

function deleteItem(index) {
  productcontainer.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(productcontainer));
  display(productcontainer);
}

function setUpdateItems(index) {
  pId = index;
  nameInput.value = productcontainer[index].code;
  priceInput.value = productcontainer[index].price;
  categoryInput.value = productcontainer[index].category;
  descInput.value = productcontainer[index].desc;
  addBtn.classList.replace("d-block", "d-none");
  uptBtn.classList.replace("d-none", "d-block");
}

function updatingItems() {
  productcontainer[pId].code = nameInput.value;
  productcontainer[pId].price = priceInput.value;
  productcontainer[pId].category = categoryInput.value;
  productcontainer[pId].desc = descInput.value;
  productcontainer[pId].image = `images/${picInput.files[0]?.name}`;
  uptBtn.classList.replace("d-block", "d-none");
  addBtn.classList.replace("d-none", "d-block");
  localStorage.setItem("products", JSON.stringify(productcontainer));
  display(productcontainer);
  clear();
}
uptBtn.addEventListener("click", function () {
  updatingItems();
});

function SearchItems() {
  let box = [];
  for (let i = 0; i < productcontainer.length; i++) {
    if (
      productcontainer[i].code
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      box.push(productcontainer[i]);
    }
  }
  display(box);
}
searchInput.addEventListener("input", function () {
  SearchItems();
});
