const btn = document.querySelector('.btn');

btn.addEventListener('click', ()=> {
    const width = window.screen.width;
    const height = window.screen.height;
    const dimensions = `${width} на ${height} точек`;
    alert (dimensions);
});