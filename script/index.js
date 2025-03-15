function loadCategories() {
  //1 - fetching the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2 - converting promise "res" to json
    .then((res) => res.json())
    //3 - sending "data" to display
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("categoryContainer");
  // loop operation on array of object
  for (let cat of categories) {
    //create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    //append the element
    categoryContainer.append(categoryDiv);
  }
}

loadCategories();
