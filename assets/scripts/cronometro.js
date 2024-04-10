// Obtém referência para os elementos do DOM
const cronometroDisplay = document.getElementById('watch');
const btnInit = document.querySelector('.btn-init');
const btnPause = document.querySelector('.btn-pause');
const btnStop = document.querySelector('.btn-stop');

// Variáveis para controlar o cronômetro
let segundos = 0;
let minutos = 0;
let horas = 0;
let cronometro;
let pause = false;

const cronometroRecuperado = JSON.parse(localStorage.getItem('cron'))
const pauseRecuperado = JSON.parse(localStorage.getItem('pausado'))

if (cronometroRecuperado != null) {
    horas = cronometroRecuperado.hora
    minutos = cronometroRecuperado.min
    segundos = cronometroRecuperado.seg
    cronometroDisplay.textContent = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`
     
    if (!pauseRecuperado){
        iniciarCronometro()
    }
}

// Função para formatar o tempo exibido
function formatarTempo(tempo) {
    return tempo < 10 ? `0${tempo}` : tempo;
}

// Função para iniciar o cronômetro
function iniciarCronometro() {
    cronometro = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
            if (minutos === 60) {
                minutos = 0;
                horas++;
            }
        }
        cronometroDisplay.textContent = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;
        let horario = {
            hora: horas,
            min: minutos,
            seg: segundos
        }
        localStorage.setItem('cron', JSON.stringify(horario))
    }, 1000);
    btnInit.disabled = true;
    localStorage.setItem('pausado', false)
}

// Função para pausar o cronômetro
function pausarCronometro() {
    clearInterval(cronometro);
    btnInit.disabled = false;
    localStorage.setItem('pausado', true)
}

// Função para parar o cronômetro
function pararCronometro() {
    clearInterval(cronometro);
    segundos = 0;
    minutos = 0;
    horas = 0;
    cronometroDisplay.textContent = '00:00:00';
    btnInit.disabled = false;
    localStorage.removeItem('cron')
    localStorage.setItem('pausado', false)
}

// Adiciona event listeners aos botões
btnInit.addEventListener('click', iniciarCronometro);
btnPause.addEventListener('click', pausarCronometro);
btnStop.addEventListener('click', pararCronometro);