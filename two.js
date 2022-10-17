// 샘플 데이터
let a_time = [
  "10:00~14:00",
  "15:00~18:00",
  "11:00~13:00;14:00~16:00",
  "10:00~11:00",
  "15:00~18:00",
];

let b_time = [
  "11:00~14:00",
  "14:00~16:00",
  "16:00~18:00",
  "10:00~11:00;12:00~13:00",
  "14:00~16:00",
];

let c_time = [
  "14:00~16:00",
  "16:00~18:00",
  "10:00~12:00",
  "12:00~14:00",
  "14:00~16:00",
];

let d_time = [
  "14:00~18:00",
  "10:00~18:00",
  "12:00~14:00",
  "14:00~15:00;16:00~17:00",
  "10:00~12:00",
];

let part_time = [
  "10:00~11:00",
  "11:00~12:00",
  "12:00~13:00",
  "13:00~14:00",
  "14:00~15:00",
  "15:00~16:00",
  "16:00~17:00",
  "17:00~18:00",
];

function make_timetable(a_time, b_time, c_time, d_time) {
  // 1. 알바생의 가능 시간 1시간 단위로 쪼개기
  let a_input = [];
  let b_input = [];
  let c_input = [];
  let d_input = [];

  a_time.map((time) =>
    time.includes(";") ? a_input.push(time.split(";")) : a_input.push(time)
  );
  b_time.map((time) =>
    time.includes(";") ? b_input.push(time.split(";")) : b_input.push(time)
  );
  c_time.map((time) =>
    time.includes(";") ? c_input.push(time.split(";")) : c_input.push(time)
  );
  d_time.map((time) =>
    time.includes(";") ? d_input.push(time.split(";")) : d_input.push(time)
  );

  console.log(a_input);
  console.log(b_input);
  console.log(c_input);
  console.log(d_input);
}

make_timetable(a_time, b_time, c_time, d_time);
