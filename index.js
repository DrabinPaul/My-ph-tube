const blogButton = document.getElementById('blogButton');

blogButton.addEventListener('click', function () {
    window.location.href = 'blog.html';
});


const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const buttonContainer = document.getElementById('button-container');


    data.data.forEach((categories) => {
        const div = document.createElement('div');
        div.innerHTML = `
       <button onclick=handleCategoryId('${categories.category_id}') class="bg-[red] text-white font-medium px-6 py-2 rounded">${categories.category}</button>
    `;
        buttonContainer.appendChild(div);
    });

};


const handleCategoryId = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const cardContainer = document.getElementById('card-container');
    const drawContainer = document.getElementById('drawing-container');
    cardContainer.innerHTML = ' ';

    if (data.data.length === 0) {
        drawContainer.classList.remove('hidden')
    }
    else {
        drawContainer.classList.add('hidden')
    }

    data.data?.forEach((cardDetails) => {

        const div = document.createElement('div');
        let displayTime = cardDetails.others.posted_date;
        let hours = Math.floor((displayTime % (3600 * 24)) / 3600);
        const minutes = Math.floor((displayTime % 3600) / 60);

        div.innerHTML = `
        <div class="card card-compact bg-base-100">
            <div class="relative">
            <img class="rounded-lg w-full h-[200px] lg:h-[170px] lg:w-[300px]" src=${cardDetails.thumbnail} />
            ${displayTime ? `<div class="absolute top-[150px] lg:top-[120px] left-56 md:left-48 lg:left-36 w-36 bg-[#171717] text-white  p-2 rounded">${hours}hrs ${minutes}min ago</div>` : ''}
            </div>
            <div class="card-body h-36">
                <div class="avatar flex">
                    <div class="w-14 h-14 rounded-full  mr-3">
                            <img class="w-[40px] h-[40px]" src=${cardDetails.authors[0].profile_picture} />
                    </div>
                    <div>
                        <h2 class="card-title">${cardDetails?.title}</h2>
                        <div class="text-base font-medium flex items-center">
                        <p class=" pr-2" >${cardDetails.authors[0].profile_name}</p>
                        <div class="w-[20px] h-[20px] mr-12">
                        <div class="card-title">${cardDetails.authors[0].verified ? `<img  src="./images/verified.png" class="w-6"  alt="verified">` : ''}</div>
                        </div>
                    </div>
                        <p class="font-medium">${cardDetails?.others.views} views</p>
                    </div>
                </div>
            </div>
        </div>
            `;
        cardContainer.appendChild(div);
    });

};


handleCategory();
handleCategoryId('1000');