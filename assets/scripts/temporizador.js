document.addEventListener('DOMContentLoaded', function() {
    const watch = document.getElementById('watch-temporizador');
    const btnPause = document.querySelector('.btn-pause-temporizador');
    const btnStop = document.querySelector('.btn-stop-temporizador');
    const btnTimes = document.querySelectorAll('.btn-times button');
    const input = document.querySelector('.btn-times input')
    const modal = document.querySelector('.modal')
    const stopBeep = document.querySelector('.close-modal')

    let temporizador;
    let tempoAtual;
    const beep = new Audio('assets/beep.mp3')
    
    function formatarTempo(tempo) {
        return tempo < 10 ? `0${tempo}` : tempo;
    }

    function iniciarTemporizador(tempoEmSegundos) {
        clearInterval(temporizador);
        tempoAtual = tempoEmSegundos;
        temporizador = setInterval(() => {
            const horas = Math.floor(tempoAtual / 3600);
            const minutos = Math.floor((tempoAtual % 3600) / 60);
            const segundos = tempoAtual % 60;
            watch.textContent = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;
            if (tempoAtual === 0) {
                modal.style.display = 'block'
                beep.play();
                beep.loop = true
                clearInterval(temporizador);
            } else {
                tempoAtual--;
            }
        }, 1000);
    }

    function pausarTemporizador() {
        clearInterval(temporizador);
    }

    function pararTemporizador() {
        clearInterval(temporizador);
        watch.textContent = '00:00:00';
    }

    btnPause.addEventListener('click', pausarTemporizador);

    btnStop.addEventListener('click', pararTemporizador);

    btnTimes.forEach(btn => {
        btn.addEventListener('click', function() {
            const tempoEmSegundos = parseInt(this.textContent) * 60;
            iniciarTemporizador(tempoEmSegundos);
        });
    });

    input.addEventListener('blur', function escolherTempo() {
        if (this.value) {
            const tempoEmSegundos = parseInt(this.value) * 60;
            iniciarTemporizador(tempoEmSegundos);
        }
    })
    
    input.addEventListener('input', function impedirValorNegativo() {
        if (this.value < 0) {
            this.value = 0;
        }
    });

    stopBeep.addEventListener('click', function() {
        modal.style.display = 'none'
        beep.loop = false
    })
});