const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();


  // div
  const tabContainer = document.getElementById("tab-container");

  data.data.news_category.forEach((category) => {
    const childDiv = document.createElement("div");
    childDiv.innerHTML = `<a id="brd" onclick="handleLoadNews('${category.category_id}')" role="tab" class="tab">${category.category_name}</a>`;
    tabContainer.appendChild(childDiv);
  });
};

const handleLoadNews = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${categoryId}`
  );
  const data = await res.json();

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  const cardData = data.data;
  cardData?.forEach((news) => {
    const card = document.createElement("div");
    card.classList = "card  bg-base-100 shadow-xl mb-6 mt-2";
    card.innerHTML = `
                     <figure><img src=${news?.image_url} alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${news.title.slice(0, 40)}
                        <div class="badge badge-secondary p-5">
                        ${news?.rating?.badge}
                        </div>
                        </h2>
                        <p>${news.details.slice(0, 70)}</p>
                        <h3>Total views: ${
                          news.total_view ? news.total_view : "no views"
                        }</h3>
                        <div class="card-footer flex justify-between mt-2 md:mt-6 lg:mt-8 -my-6">
                        <div class="flex">
                        <div class="">
                        <div class="avatar online">
                       <div class="w-16 rounded-full">
                       <img src="${news.author.img}" />
                       </div>
                       </div>
                       </div>
                       <div class="ml-4 ">
                        <h6>${news.author.name}</h6> 
                       <small>
                       ${news.author.published_date}
                       </small>
                       </div>
                       </div>
                        <div class="card-actions justify-end">
                            <button onclick="handleModal('${
                              news?._id
                            }')" class="btn bg-gray-800 hover:bg-gray-700 text-white">Details</button>
                        </div>
                    </div>
                    </div>
                       
                   
                       
    `;
    cardContainer.appendChild(card);
  });
};

const handleModal = async (newsId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/${newsId}`
  );
  const data = await res.json();
  console.log(data.data);

  const parent = document.getElementById("mainDiv");
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
  <dialog id="my_modal_1" class="modal">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">${data.data[0].title}</h3>
                        <p class="py-4">${data.data[0].details.slice(
                          0,
                          230
                        )}</p>
                        <div class="modal-action">
                            <form method="dialog">
                                <button class="btn -my-4">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
  `;
  parent.appendChild(newDiv);

  const modal = document.getElementById("my_modal_1");
  modal.showModal();
};

loadData();
handleLoadNews("01");
