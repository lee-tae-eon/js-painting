const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // getContext()를 사용해 픽셀값에 접근

// 캔버스 element에 사이즈를 줘야함
canvas.width = 700;
canvas.height = 500;

// 시작 색상, 크기
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;
// flag
let drawing = false;

function stopDrawing() {
  drawing = false;
}

function startDrawing() {
  drawing = true;
}

// 캔버스 위에서 마우스 움직임 감지 함수
function onMouseMove(event) {
  const offsetX = event.offsetX;
  const offsetY = event.offsetY;
  // console.log(offsetX, offsetY);
  if (!drawing) {
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  } else {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
}
// 클릭시 마우스 이벤트
function onMouseDown(event) {
  // console.log(event);
  drawing = true;
}
// 마우스 클릭 해제시 이벤트
function onMouseUp(event) {
  // console.log(event);
  stopDrawing();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
}
