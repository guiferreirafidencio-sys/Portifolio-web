const bg = document.querySelector(".bg-animado");

document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth) * 100;
    let y = (e.clientY / window.innerHeight) * 100;

    bg.style.background = `radial-gradient(circle at ${x}% ${y}%, #222, #000 70%)`;
});