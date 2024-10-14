const saveDaily = (data) => {
    const originData = JSON.parse(window.localStorage.getItem('daily')) || {};
    if (originData) {
        originData[new Date().getTime()] = data;
        window.localStorage.setItem('daily', JSON.stringify(originData));
    } else {
        (originData[new Date().getTime()] = data), window.localStorage.setItem('daily', JSON.stringify(originData));
    }
};

window.onload = () => {
    if (window.location.pathname.includes('/daily_app/write.html')) {
        document.querySelector('#saveDailyBtn').addEventListener('click', () => {
            saveDaily({
                emotion: document.querySelector('[name="emotion"]:checked').value,
                title: document.querySelector('#title').value,
                content: document.querySelector('#content').value.replaceAll('\n', '<br>'),
                memo: document.querySelector('#memo').value,
            });
        });
    } else {
        const data = JSON.parse(window.localStorage.getItem('daily'));
        Object.keys(data).forEach((el) => {
            const timestamp = +el;
            data[el]['time'] = new Date(timestamp);
            data[el].emotion;

            const li = document.createElement('li');

            const title = document.createElement('div');
            const content = document.createElement('div');
            const memo = document.createElement('div');

            title.classList.add('title');
            content.classList.add('content');
            memo.classList.add('memo');

            const emotion = document.createElement('div');
            const titleP = document.createElement('p');
            const contentP = document.createElement('p');
            const memoP = document.createElement('p');

            const date = document.createElement('span');
            date.classList.add('date');
            date.innerHTML = data[el].time.toLocaleDateString('kr');

            emotion.classList.add('emotion');
            console.log(`../assets/images/${data[el].emotion}.png`);
            emotion.style.backgroundImage = `url(./assets/images/${data[el].emotion}.png)`;
            titleP.innerHTML = data[el].title;
            contentP.innerHTML = data[el].content;
            memoP.innerHTML = data[el].memo;

            title.append(emotion, titleP, date);
            content.append(contentP);
            memo.append(memoP);

            li.append(title, content, memo);
            document.querySelector('.list_container ul').append(li);
        });
    }
};
