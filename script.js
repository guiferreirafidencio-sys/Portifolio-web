const bg = document.querySelector(".bg-animado");

document.addEventListener("mousemove", (e) => {
    let x = (e.clientX / window.innerWidth) * 100;
    let y = (e.clientY / window.innerHeight) * 100;

    bg.style.background = `radial-gradient(circle at ${x}% ${y}%, #222, #000 70%)`;
});

// ===== REVEAL ON SCROLL =====
// Qualquer elemento com a classe .reveal começa "escondido" (ver CSS abaixo)
// e ganha a classe .revealed quando entra na tela.
const revealEls = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target); // anima só uma vez
        }
    });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

// ===== LINK ATIVO NO MENU CONFORME ROLA A PÁGINA =====
const secoes = document.querySelectorAll("section[id]");
const linksMenu = document.querySelectorAll(".menu a");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const link = document.querySelector(`.menu a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
            linksMenu.forEach((l) => l.classList.remove("ativo"));
            link.classList.add("ativo");
        }
    });
}, { threshold: 0.4 });

secoes.forEach((sec) => navObserver.observe(sec));// ===== LINK ATIVO NO MENU CONFORME ROLA A PÁGINA =====
const secoesComId = document.querySelectorAll("section[id], header[id]");
const linksMenu = document.querySelectorAll(".menu a");

let bloqueioClick = false; // trava o observer por um instante após o clique

function marcarAtivo(id) {
    linksMenu.forEach((l) => l.classList.remove("ativo"));
    const link = document.querySelector(`.menu a[href="#${id}"]`);
    if (link) link.classList.add("ativo");
}

// ao clicar, já marca na hora e ignora o observer durante o scroll suave
linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        const id = link.getAttribute("href").replace("#", "");
        marcarAtivo(id);
        bloqueioClick = true;
        setTimeout(() => { bloqueioClick = false; }, 900); // tempo aprox. do scroll suave
    });
});

const navObserver = new IntersectionObserver((entries) => {
    if (bloqueioClick) return; // não deixa o observer brigar com o clique

    // pega a seção mais próxima do topo entre as que estão visíveis
    let maisProxima = null;
    let menorDistancia = Infinity;

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const distancia = Math.abs(entry.boundingClientRect.top);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                maisProxima = entry.target.id;
            }
        }
    });

    if (maisProxima) marcarAtivo(maisProxima);
}, { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" });

secoesComId.forEach((sec) => navObserver.observe(sec));

// ===== BOTÃO "VOLTAR AO TOPO" (aparece depois de rolar) =====
const btnTopo = document.getElementById("btnTopo");
if (btnTopo) {
    window.addEventListener("scroll", () => {
        btnTopo.classList.toggle("visivel", window.scrollY > 500);
    });
    btnTopo.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
const barraProgresso = document.getElementById("barraProgresso");
window.addEventListener("scroll", () => {
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const progresso = (window.scrollY / alturaTotal) * 100;
    barraProgresso.style.width = progresso + "%";
});
document.querySelectorAll(".botoes a, .btn-github").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0)";
    });
});
function efeitoDecode(el) {
    const textoFinal = el.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let frame = 0;
    const totalFrames = 20;

    const interval = setInterval(() => {
        el.textContent = textoFinal
            .split("")
            .map((letra, i) => {
                if (letra === " ") return " ";
                if (i < (frame / totalFrames) * textoFinal.length) return textoFinal[i];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        frame++;
        if (frame > totalFrames) {
            el.textContent = textoFinal;
            clearInterval(interval);
        }
    }, 40);
}

const numerosObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll(".numero-valor").forEach(efeitoDecode);
            numerosObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const numerosSection = document.querySelector("#numeros");
if (numerosSection) numerosObserver.observe(numerosSection);
document.addEventListener("click", (e) => {
    for (let i = 0; i < 6; i++) {
        const p = document.createElement("span");
        p.className = "particula-clique";
        p.style.left = e.clientX + "px";
        p.style.top = e.clientY + "px";
        const angulo = (Math.PI * 2 * i) / 6;
        p.style.setProperty("--x", Math.cos(angulo) * 40 + "px");
        p.style.setProperty("--y", Math.sin(angulo) * 40 + "px");
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
});
document.querySelectorAll(".spoke").forEach((spoke, i) => {
    spoke.style.setProperty("--d", `${i * 0.08}s`);
});
const starsBgEl = document.getElementById("starsBg");
if (starsBgEl) {
    window.addEventListener("scroll", () => {
        const skillsRect = document.querySelector(".skills").getBoundingClientRect();
        const offset = skillsRect.top * 0.15;
        starsBgEl.style.transform = `translateY(${offset}px)`;
    });
}
const codeWindow = document.querySelector(".code-window");
const filename = document.querySelector(".code-filename");
if (codeWindow && filename) {
    const original = filename.textContent;
    codeWindow.addEventListener("mouseenter", () => {
        filename.textContent = "editando...";
        setTimeout(() => { filename.textContent = original; }, 700);
    });
}