function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  //fetching the categories data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //converting promise "res" to json
    .then((res) => res.json())
    //sending "data" to display
    .then((data) => displayCategories(data.categories));
}

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
  //console.log(videoId);
};

function loadVideos(searchText = "") {
  // fetching the videos data
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btnAll").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      //no active class
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

function displayCategories(categories) {
  // get the container
  const categoryContainer = document.getElementById("categoryContainer");
  // loop operation on array of object
  for (let cat of categories) {
    //create element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    //append the element
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  // get the container
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.innerHTML = "";
  // loop operation on array of object
  if (videos.length == 0) {
    videoContainer.innerHTML = `
      <div class="flex flex-col col-span-full items-center justify-center text-center py-20 gap-4">
        <img class="w-[120px]" src="./assets/Icon.png" alt="" />
        <p class="text-2xl font-bold">Oops!! Sorry, There is no content here</p>
      </div>
    `;
    return;
  }
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
                ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="./assets/icons8-verified-badge-48.png" alt="verified icon" />` : ``}
                
              </div>
              <p class="text-sm text-gray-500">${video.others.views}</p>
            </div>
          </div>
          <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
    `;
    //append the element
    videoContainer.append(videoCard);
  });
};

const displayVideoDetails = (video) => {
  // console.log(video);
  document.getElementById("videoDetails").showModal();
  const videoDetailsContainer = document.getElementById("videoDetailsContainer");
  videoDetailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full w-96 shadow-sm">
    <figure>
      <img
        src="${video.thumbnail}"
        alt="Video" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${video.title}</h2>
      <p>${video.description}</p>
    </div>
  </div>
  `;
};
document.getElementById("searchInput").addEventListener("keyup", (event) => {
  const input = event.target.value;
  loadVideos(input);
});

loadCategories();
loadVideos();
