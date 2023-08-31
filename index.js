const blogButton = document.getElementById('blogButton');

blogButton.addEventListener('click', function() {
    window.location.href = 'blog.html';
});


const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);
    const buttonContainer = document.getElementById('button-container');

    data.data.forEach((categories) => {
        // console.log(categories)
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
    cardContainer.innerHTML = '';
    data.data.forEach((cardDetails) => {
        console.log(cardDetails.authors[0].profile_picture);

        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact  bg-base-100 shadow-xl">
        <figure><img class="rounded" src=${cardDetails.thumbnail} /></figure>
        <div class="card-body">
            <div class="avatar flex">
                <div class="w-20 rounded-full">
                    <div>
                        <img src=${cardDetails.authors[0].profile_picture} />
                    </div>
                </div>
                <div>
                    <h2 class="card-title">${cardDetails?.title}</h2>
                    <p>${cardDetails.authors[0].profile_name}</p>
                    <p>${cardDetails?.others.views} views</p>
                </div>
            </div>
        </div>
    </div>
        `;
        cardContainer.appendChild(div);

    });



};
handleCategory();