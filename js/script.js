
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName= wrapper.querySelector(".song-details .name"),
musicArtist =  wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPause =  wrapper.querySelector(".play-pause"),
prevButton=  wrapper.querySelector("#prev"),
nextButton =  wrapper.querySelector("#next"),
progressBar = wrapper.querySelector(".progress-bar"),
progressArea = wrapper.querySelector(".progress-area"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");




let musicIndex = Math.floor(Math.random()*allMusic.length);

// load the details of the Music
window.addEventListener("load" , ()=>{
    loadMusic(musicIndex);
    playingNow();
})

//funtion for loading the music and its details
function loadMusic(IndexNumber){
    musicName.innerText = allMusic[IndexNumber-1].name;
    musicArtist.innerText = allMusic[IndexNumber-1].artist;
    musicImg.src = `${allMusic[IndexNumber-1].img}`;
    mainAudio.src = `${allMusic[IndexNumber-1].src}`;
}

// function to play the music
function playMusic(){
    wrapper.classList.add("paused");
    playPause.querySelector("i").innerText = "pause";
   
    mainAudio.play();
}

function nextMusic(){
    musicIndex++; 
   
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow(); 
  }

  function prevMusic(){
    musicIndex--; 
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow(); 
  }

//function to pause the music
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPause.querySelector("i").innerText = "play_arrow";
   
    mainAudio.pause();
}


//play or pause on the click event listener
playPause.addEventListener("click" , ()=>{
        const isMusicPaused = wrapper.classList.contains("paused");
        isMusicPaused ? pauseMusic() : playMusic();
});

document.addEventListener("keypress" , function(e){
    
    if(e.key == " " ){
        const isMusicPaused = wrapper.classList.contains("paused");
        isMusicPaused ? pauseMusic() : playMusic();}
        
});

nextButton.addEventListener("click", function(){
        //function for playing the next nmusic

        let getText = repeatBtn.innerText;
        if(getText== "repeat"){
        musicIndex++;
        musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
        }

        else if(getText== "repeat_one"){
            loadMusic(musicIndex);
        playMusic();
        
        }
        else if(getText== "shuffle"){
            let randIndex = Math.floor(Math.random()*allMusic.length + 1);
           do{
            randIndex = Math.floor(Math.random()*allMusic.length + 1);
           }while(musicIndex == randIndex);
           
           let index =  randIndex;
           loadMusic(index);
           playMusic();
           
          
    }
    playingNow();

})

prevButton.addEventListener("click", function(){
    //function for playing the previous nmusic
    
    let getText = repeatBtn.innerText;
    if(getText== "repeat"){
    musicIndex--; 
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
    else if(getText== "repeat_one"){
        loadMusic(musicIndex);
    playMusic();
    playingNow();
    }

})

mainAudio.addEventListener("timeupdate", (e)=>{
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`;


    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");



    mainAudio.addEventListener("loadeddata" , ()=>{
    
        //updating song duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration/60);
        let totalSec = Math.floor(audioDuration%60);

        if(totalSec <10){
            totalSec = '0' + totalSec;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    })

    //updating current time

    let currentMin = Math.floor(currentTime/60);
    let currentSec = Math.floor(currentTime%60);

    if(currentSec <10){
        currentSec = '0' + currentSec;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
}
)



//updating time based on progress bar
progressArea.addEventListener("click", (e)=>{
    let progressWidth = progressArea.clientWidth; 
    let clickedOffsetX = e.offsetX; 
    let songDuration = mainAudio.duration;    
    mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    
    playMusic();
    playingNow();
})



const repeatBtn = wrapper.querySelector("#repeat-plist");

repeatBtn.addEventListener("click" , (e)=>{
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title" , "Song Looped")
            break;
        
        case "repeat_one":
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title" , "Playback Shuffle")
            break;
        
        case "shuffle":
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title" , "Playlist Looped")
            break;

    }
})


//playlist looping and modifications

mainAudio.addEventListener("ended" , ()=>{

    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
           nextMusic();
           break;
        
        case "repeat_one":
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            
            break;
        
        case "shuffle":
           let randIndex = Math.floor(Math.random()*allMusic.length + 1);
           do{
            randIndex = Math.floor(Math.random()*allMusic.length + 1);
           }while(musicIndex == randIndex);
           
           let index =  randIndex;
           loadMusic(index);
           playMusic();
           break;

    }


})


moreMusicBtn.addEventListener("click", ()=>{
    musicList.classList.toggle("show");
  });
closemoreMusic.addEventListener("click", ()=>{
    moreMusicBtn.click();
  });


const ulTag = wrapper.querySelector("ul");

for (let i = 0; i < allMusic.length; i++) {
    
    let liTag = `<li li-index="${i + 1}">
                  <div class="row">
                    <span>${allMusic[i].name}</span>
                    <p >${allMusic[i].artist}</p>
                  </div>
                  <audio class="${allMusic[i].src}" src="${allMusic[i].src}"></audio>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);     
  }


const allLiTags = ulTag.querySelectorAll("li");

function playingNow(){
    for (let j = 0 ; j< allLiTags.length ; j++){

    if(allLiTags[j].classList.contains("playing")){
        allLiTags[j].classList.remove("playing");
    }


    if(allLiTags[j].getAttribute("li-index") == musicIndex){
        allLiTags[j].classList.add("playing");
    }
    allLiTags[j].setAttribute("onclick" ,"clicked(this)");
}}


function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}