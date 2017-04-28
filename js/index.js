///////////Ссылки для видосов на главной странице///////////////

let srcForVideosOnMaiPage = ["https://www.youtube.com/embed/50bsUUZbDu8", "https://www.youtube.com/embed/wr8icNCTHWc", "https://www.youtube.com/embed/TkaML_MiiLA"];

let player = document.querySelector(".player iframe");

let elements = [];
for(let i = 0; i < 3; i++){
    elements[i] = document.getElementById("video-" + (i+1));
}

////////Ссылки для видосов на главной странице закончились/////////////////



///////////////Переключатель для видосов на главной странице/////////////////////////////////////////////////

for(let i = 0; i < elements.length; i++){
    elements[i].addEventListener('click', function switchVideo(){
    for(let i = 0; i < elements.length; i++){
        if(elements[i] != this) {
            elements[i].classList.remove("active-about-video");
        }else {
            elements[i].classList.add("active-about-video");
            player.src = srcForVideosOnMaiPage[i];
        }
    }
} );
}

///////////////Переключатель для видосов на главной странице закончился/////////