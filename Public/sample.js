let getPage = true;

let method = document.getElementById('method-dropdown');
method.addEventListener('change', () => {
    let methodURL = document.getElementById('method-url');
    let apiForm = document.getElementById('API-Form');
    let methodBtn = document.getElementById('method-btn');
    let formError = document.getElementById('post-form-error');
    let formSuccess = document.getElementById('post-form-success');
    if (method.value === 'GET') {
        getPage = true;
        methodURL.value = "http://localhost:5000/songList/get/songs";
        apiForm.classList.remove('show');
        methodBtn.innerHTML = "GET";
        if (formSuccess.className.search('show') > 0) formSuccess.classList.remove('show');
        if (formError.className.search('show') > 0) formError.classList.remove('show');

    }
    if (method.value === 'POST') {
        getPage = false;
        let songContainer = document.getElementById('songList');
        let firstElement = songContainer.firstElementChild;
        while (firstElement) {
            firstElement.remove();
            firstElement = songContainer.firstElementChild;
        }
        methodURL.value = "http://localhost:5000/songList/post/songs";
        apiForm.classList.add('show');
        methodBtn.innerHTML = "POST";
    }
})

const bindResponseData = (newResponse) => {
    let songListContainer = document.getElementById('songList');
    newResponse.map((data) => {
        let songContainer = document.createElement('div');
        songContainer.className = "songlist-container";
        let songInfo = document.createElement('div');
        songInfo.className = "songlist-songName";
        songInfo.textContent = 'Song Name : ' + data.songName + "  Singer Name : " + data.singerName + " Film Name : " + data.filmName;
        songContainer.appendChild(songInfo);
        songListContainer.appendChild(songContainer);
    })
}

const checkFormValigation = () => {
    let result = true;
    let songName = document.getElementById('songName').value;
    let singerName = document.getElementById('singerName').value;
    let filmName = document.getElementById('filmName').value;
    let formError = document.getElementById('post-form-error');
    let filedName = {
        songName: songName,
        singerName: singerName,
        filmName: filmName
    };
    Object.keys(filedName).map((field) => {
        if (filedName[field] === '') {
            formError.innerHTML = `Please Enter ${field}`
            formError.classList.add('show');
            result = false;
        }
    })

    return { result, songName, singerName, filmName };
}

const getSongList = () => {
    if (getPage) {
        fetch('http://localhost:5000/songList/get/songs', {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(responseData => responseData.json())
            .then(responseJSON => {
                bindResponseData(responseJSON);
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


let methodForm = document.getElementById('method-form');
methodForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let formSuccess = document.getElementById('post-form-success');
    if (methodForm.children[0].innerHTML === 'GET') {
        getSongList();
    }
    if (methodForm.children[0].innerHTML === 'POST') {
        const { result, songName, singerName, filmName } = checkFormValigation();
        if (result) {
            const requestBody = {
                songName: songName,
                singerName: singerName,
                filmName: filmName
            }
            fetch('http://localhost:5000/songList/post/songs', {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: { "Content-Type": 'application/json' }
            })
                .then((responseData) => responseData.json())
                .then((responseJSON) => {
                    formSuccess.innerHTML = responseJSON.message;
                    formSuccess.classList.add('show');
                })
                .catch((err) => console.log(err))
        }
    }
})
