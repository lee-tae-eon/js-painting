const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); // getContext()를 사용해 픽셀값에 접근
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 500;

// 캔버스 element에 사이즈를 줘야함
canvas.width = 500;
canvas.height = 500;

// 시작 색상, 크기
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

// Drawing flag
let drawing = false;
// Fill mode flag
let filling = false;

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
// function onMouseDown(event) {
//   // console.log(event);
//   drawing = true;
// }
// 마우스 클릭 해제시 이벤트
// function onMouseUp(event) {
//   // console.log(event);
//   stopDrawing();
// }

function changeColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // 기본색상을 클릭한 색상으로 변경
  ctx.fillStyle = color;
}
// range bar
function handleRangeChange(event) {
  const rsize = event.target.value;
  ctx.lineWidth = rsize;
}
// fill & drawing 모드
function handleFillClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Drawing";
  }
}
// 캔버스에 채우기(사이즈)
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
// 우클릭 방지
function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "Picture";
  //   console.log(link);
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors));

// 색상을 배열로 만들어주고 각각을 클릭시 changeColor함수 실행
if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", changeColor)
  );
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleFillClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
