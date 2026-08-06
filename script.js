window.addEventListener('load', () => {
  const canvas = document.getElementById('paintCanvas');
  const ctx = canvas.getContext('2d');
  
  // UI Elements
  const colorPicker = document.getElementById('colorPicker');
  const brushSize = document.getElementById('brushSize');
  const clearBtn = document.getElementById('clearBtn');
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const colorSwatches = document.querySelectorAll('.color-swatch');

  // State
  let isDrawing = false;
  let currentStroke = null;
  let currentColor = '#000000';
  let currentWidth = 5;
  
  // History
  let history = []; // Array of strokes
  let redoStack = []; // Strokes that were undone
  
  // Initialize
  function init() {
    resizeCanvas();
    updateButtonStates();
    
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.classList.remove('dark');
    }
  }

  function resizeCanvas() {
    // Save current drawing
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    if (canvas.width > 0 && canvas.height > 0) {
      tempCtx.drawImage(canvas, 0, 0);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Restore drawing
    ctx.drawImage(tempCanvas, 0, 0);
    
    // We don't redraw the whole history array here to save performance, 
    // but the above drawImage preserves what was there.
    setBrushContext();
  }

  function setBrushContext() {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }

  // --- Drawing Logic ---
  
  function getMousePos(e) {
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  function startDrawing(e) {
    if (e.target !== canvas) return; // Only start if clicking on canvas
    
    isDrawing = true;
    const pos = getMousePos(e);
    
    currentStroke = {
      color: currentColor,
      width: currentWidth,
      points: [pos]
    };
    
    // Clear redo stack on new action
    redoStack = [];
    updateButtonStates();
    
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    // Draw a single dot if just clicked
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function draw(e) {
    if (!isDrawing) return;
    
    // Prevent scrolling when drawing on touch devices
    if(e.type.includes('touch')) e.preventDefault();
    
    const pos = getMousePos(e);
    currentStroke.points.push(pos);
    
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    
    if (currentStroke && currentStroke.points.length > 0) {
      history.push(currentStroke);
    }
    currentStroke = null;
    updateButtonStates();
  }

  // --- History Management ---
  
  function redrawHistory() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const stroke of history) {
      if (stroke.points.length === 0) continue;
      
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      // If it's a single dot
      if (stroke.points.length === 1) {
          ctx.lineTo(stroke.points[0].x, stroke.points[0].y);
      }
      ctx.stroke();
    }
    
    // Restore current brush context
    setBrushContext();
  }

  function undo() {
    if (history.length === 0) return;
    
    const lastStroke = history.pop();
    redoStack.push(lastStroke);
    redrawHistory();
    updateButtonStates();
  }

  function redo() {
    if (redoStack.length === 0) return;
    
    const stroke = redoStack.pop();
    history.push(stroke);
    redrawHistory();
    updateButtonStates();
  }

  function clearCanvas() {
    history = [];
    redoStack = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateButtonStates();
  }
  
  function updateButtonStates() {
    undoBtn.style.opacity = history.length > 0 ? '1' : '0.5';
    undoBtn.style.pointerEvents = history.length > 0 ? 'auto' : 'none';
    
    redoBtn.style.opacity = redoStack.length > 0 ? '1' : '0.5';
    redoBtn.style.pointerEvents = redoStack.length > 0 ? 'auto' : 'none';
  }

  // --- Event Listeners ---

  window.addEventListener('resize', resizeCanvas);

  // Canvas Events
  canvas.addEventListener('mousedown', startDrawing);
  window.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDrawing);
  
  canvas.addEventListener('touchstart', startDrawing, {passive: false});
  window.addEventListener('touchmove', draw, {passive: false});
  window.addEventListener('touchend', stopDrawing);

  // Controls Events
  colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    setBrushContext();
    // Update active swatch style if custom color
  });

  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
      currentColor = e.target.getAttribute('data-color');
      colorPicker.value = currentColor;
      setBrushContext();
    });
  });

  brushSize.addEventListener('input', (e) => {
    currentWidth = e.target.value;
    setBrushContext();
  });

  undoBtn.addEventListener('click', undo);
  redoBtn.addEventListener('click', redo);
  clearBtn.addEventListener('click', clearCanvas);

  // Theme Toggle
  themeToggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  // Run initialization
  init();
});