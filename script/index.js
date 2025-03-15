function loadCategories() {
  //fetching the categories data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //converting promise "res" to json
    .then((res) => res.json())
    //sending "data" to display
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  // fetching the videos data
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
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

const displayVideos = (videos) => {
  // get the container
  const videoContainer = document.getElementById("videoContainer");
  // loop operation on array of object
  videos.forEach((video) => {
    //create element
    let videoCard = document.createElement("div");
    videoCard.innerHTML = `
       <div class="card bg-base-100">
          <figure class="relative">
            <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" alt="Image" />
            <span class="absolute bottom-2 right-2 bg-black text-white text-sm px-2 rounded">3hrs 56 min ago</span>
          </figure>

          <div class="flex gap-3 px-0 py-5">
            <div class="profile">
              <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2">
                  <img src="${video.authors[0].profile_picture}" />
                </div>
              </div>
            </div>
            <div class="intro">
              <h2 class="text-sm font-semibold">${video.title}</h2>
              <div class="flex gap-2">
                <span class="text-sm text-gray-500">${video.authors[0].profile_name}</span>
                <img class="w-5 h-5" src="./assets/icons8-verified-badge-48.png" alt="verified icon" />
              </div>
              <p class="text-sm text-gray-500">${video.others.views}</p>
            </div>
          </div>
        </div>
    `;
    //append the element
    videoContainer.append(videoCard);
  });
};

loadCategories();
loadVideos();
