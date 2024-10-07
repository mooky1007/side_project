const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};

window.ui_toast = async (text) => {
    const toast = document.createElement('div');
    toast.innerText = text;
    toast.style.cssText = `
      position: absolute;
      bottom: 15px;
      max-width: 90%;
      max-width: 600px;
      background: #555;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
      text-align: center;
      transition: .5s;
      opacity: 0;
      font-size: 13px;
    `;

    document.body.append(toast);
    await sleep(0);
    toast.style.opacity = 1;
    toast.style.bottom = `20px`;
    await sleep(1000);
    toast.style.opacity = 0;
    toast.style.bottom = `25px`;
    await sleep(1500);
    toast.remove();
};
