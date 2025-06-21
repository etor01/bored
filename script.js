window.addEventListener('load', () => {
      const canvas = document.getElementById('paintCanvas');
      const clearBtn = document.getElementById('clearBtn');

      const ctx = canvas.getContext('2d');

      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        const headerHeight = document.querySelector('.bg-gray-900').offsetHeight;
        canvas.height = window.innerHeight - headerHeight;

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      function startDrawing(e){
        isDrawing = true;
        [lastX, lastY] = getMousePos(e);
      }
      function draw(e){
        if (!isDrawing) return;

        e.preventDefault();

        const [x,y] = getMousePos(e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x,y);
        ctx.stroke();
        [lastX,lastY] = [x,y];
      }
      function getMousePos(e){
        const rect = canvas.getBoundingClientRect();
        if(e.touches && e.touches.length > 0){
          return [ 
            e.touches[0].clientX - rect.left,
            e.touches[0].clientY - rect.top
          ];
        }
        return [
          e.clientX - rect.left,
          e.clientY - rect.top
        ];
      }

      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing); 
      canvas.addEventListener('touchstart', startDrawing);
      canvas.addEventListener('touchmove', draw);
      canvas.addEventListener('touchend', stopDrawing);

      function stopDrawing(e) {
        isDrawing = false;
      }

      clearBtn.addEventListener('click', ()=> {
        ctx.clearRect(0,0, canvas.width, canvas.height);
      });

    });