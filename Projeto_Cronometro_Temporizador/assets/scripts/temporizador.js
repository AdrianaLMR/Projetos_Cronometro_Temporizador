document.addEventListener('DOMContentLoaded', function() {
    const watch = document.getElementById('watch-temporizador');
    const btnInit = document.querySelector('.btn-init-temporizador');
    const btnPause = document.querySelector('.btn-pause-temporizador');
    const btnStop = document.querySelector('.btn-stop-temporizador');
    const btnTimes = document.querySelectorAll('.btn-times button');

    let temporizador;
    let tempoTotal;
    let tempoAtual;

    function formatarTempo(tempo) {
        return tempo < 10 ? `0${tempo}` : tempo;
    }

    function iniciarTemporizador(tempoEmSegundos) {
        tempoTotal = tempoEmSegundos;
        tempoAtual = tempoEmSegundos;
        temporizador = setInterval(() => {
            const horas = Math.floor(tempoAtual / 3600);
            const minutos = Math.floor((tempoAtual % 3600) / 60);
            const segundos = tempoAtual % 60;
            watch.textContent = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}`;
            if (tempoAtual === 0) {
                clearInterval(temporizador);
                alert('Temporizador finalizado!');
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

    btnInit.addEventListener('click', function() {
        iniciarTemporizador(tempoTotal);
    });

    btnPause.addEventListener('click', pausarTemporizador);

    btnStop.addEventListener('click', pararTemporizador);

    btnTimes.forEach(btn => {
        btn.addEventListener('click', function() {
            const tempoEmSegundos = parseInt(this.textContent) * 60;
            iniciarTemporizador(tempoEmSegundos);
        });
    });
});