// 샘플 데이터
// let a_time = [
//   "10:00~14:00",
//   "15:00~18:00",
//   "11:00~13:00;14:00~16:00",
//   "10:00~11:00",
//   "15:00~18:00",
// ];

// let b_time = [
//   "11:00~14:00",
//   "14:00~16:00",
//   "16:00~18:00",
//   "10:00~11:00;12:00~13:00",
//   "14:00~16:00",
// ];

// let c_time = [
//   "14:00~16:00",
//   "16:00~18:00",
//   "10:00~12:00",
//   "12:00~14:00",
//   "14:00~16:00",
// ];

// let d_time = [
//   "14:00~18:00",
//   "10:00~18:00",
//   "12:00~14:00",
//   "14:00~15:00;16:00~17:00",
//   "10:00~12:00",
// ];

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
  // 1. 알바생들의 시간을 1시간 단위로 쪼갬
  let A = splitTime(a_time);
  let B = splitTime(b_time);
  let C = splitTime(c_time);
  let D = splitTime(d_time);

  // 2. 10시간 초과 근무 X, 알바생 없는 시간을 최소로 줄여야 함
  // 아무도 근무할 수 없는 시간을 알아내야 함, 근무 가능한 알바생이 있으나 10시간 초과로 근무 불가능시 아무도 근무 X 표시 or 초과 근무 표시
  // 2.1. timetable 리스트 생성
  let timeTable = []; // {} ? [] ?
  for (let i = 0; i < 5; i++) {
    timeTable[i] = part_time;
  }

  // 2.2 조건에 맞게 알바생 배치
  // 최종적인 스케쥴을 담을 객체 생성
  let schedule = {};

  // 주 10시간 이상인지 확인하기 위한 변수
  let count = {};
  count["A"] = 0;
  count["B"] = 0;
  count["C"] = 0;
  count["D"] = 0;

  // 해당 요일, 시간대별로 가능한 알바생 배치
  let indexForDay = { 0: "월", 1: "화", 2: "수", 3: "목", 4: "금" };
  for (let i = 0; i < timeTable.length; i++) {
    let possible = [];
    let result = "";
    let scheduleForDay = [];

    // 알바생별로 남은 시간대 개수 확인을 위한 변수
    let left = {};
    left["A"] = A[i].length;
    left["B"] = B[i].length;
    left["C"] = C[i].length;
    left["D"] = D[i].length;

    for (let j = 0; j < timeTable.length; j++) {
      possible = [];
      result = "";

      A[i].includes(timeTable[i][j]) ? possible.push("A") : "";
      B[i].includes(timeTable[i][j]) ? possible.push("B") : "";
      C[i].includes(timeTable[i][j]) ? possible.push("C") : "";
      D[i].includes(timeTable[i][j]) ? possible.push("D") : "";

      if (possible.length === 0) {
        // 가능한 알바생이 없을 때
        result = "X";
      } else if (possible.length === 1) {
        // 가능한 알바생이 1명일 때, 주 10시간 초과 근무 아닌지 판단, count ++, left--
        if (count[possible[0]] <= 10) {
          result = possible[0];
          count[possible[0]]++;
          left[possible[0]]--;
        } else {
          result = "ㅁ"; // 근무 가능한 알바생 있으나 10시간 초과로 불가
        }
      } else {
        // 가능한 알바생이 2명 이상일 때
        let maxElement = "";
        for (let a = 0; a < possible.length; a++) {
          if (left[possible[a]] > left[possible[a + 1]]) {
            maxElement = possible[i];
          } else {
            if (possible[a + 1] !== undefined) {
              maxElement = possible[a + 1];
            }
          }
        }
        if (count[maxElement] <= 10) {
          // 주 10시간 이상 초과 근무인지 판단
          result = maxElement;
        } else {
          result = "ㅁ";
        }
      }
      // 해당 요일, 해당 시간대의 알바생 입력
      scheduleForDay[timeTable[i][j]] = result;
    }
    // 3. 요일과 알바생이 배치된 시간표를 매칭
    schedule[indexForDay[i]] = scheduleForDay;
  }
  return schedule;
}

// 알바생 시간을 1시간 단위로 쪼개주는 메서드
function splitTime(timeArray) {
  let newTimeArray = [];
  timeArray.map((time) => {
    let start = 0;
    let end = 0;
    let temp = [];
    // 요일에 가능한 시간이 2개로 나눠진 경우라면
    if (time.includes(";")) {
      time.split(";").map((time) => {
        start = Number(time[0] + time[1]);
        end = Number(time[6] + time[7]);
        for (let i = start; i < end; i++) {
          temp.push(`${i}:00~${i + 1}:00`);
        }
      });
    } else {
      // 가능한 시간이 1개라면
      start = Number(time[0] + time[1]);
      end = Number(time[6] + time[7]);
      for (let i = start; i < end; i++) {
        temp.push(`${i}:00~${i + 1}:00`);
      }
    }
    newTimeArray.push(temp);
  });
  return newTimeArray;
}

make_timetable(a_time, b_time, c_time, d_time);
