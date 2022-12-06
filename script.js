const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API 

let count = 5;
const apiKey = 'hVjBcdZoe-YjCnE6Vk3gl605dC-1BIWc_UGronV_IJM';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=puppy&count=${count}`

// Image is loaded

function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

// Helper function for setAttribute

function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements and adding to DOM

function displayPhotos() {

    totalImages += photosArray.length;

    photosArray.forEach((photo) => {

        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        })


        const img = document.createElement('img');

        setAttribute(img, {
            src: photo.urls.small,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoaded)

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from unsplash API 

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {
        alert(error)
    }
}

// Check scroll

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
    
})

// OnLoad

getPhotos();