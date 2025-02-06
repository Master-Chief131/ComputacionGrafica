// const controlAudio = document.getElementById('Toque');
// const audio = document.getElementById('mySong');
// const audioPlaying = false;
// const firstPlay = true;
// const currentTime = 0;

// document.body.addEventListener('click', function() {
//    if (!audioPlaying) {
//       if (firstPlay) {
//          audio.currentTime = currentTime;
//          firstPlay = false;
//       }
//       audio.play().then(function() {
//          // Reproducción exitosa
//          console.log('Audio reproduciéndose');
//          audioPlaying = true;
//          controlAudio.textContent = '';
//       }).catch(function(error) {
//          // Manejar errores de reproducción
//          console.error('Error al reproducir audio:', error);
//       });
//    } else {
//       audio.pause();
//       audioPlaying = false;
//       controlAudio.textContent = '';
//    }
// });