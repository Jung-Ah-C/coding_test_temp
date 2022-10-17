// let members = [
//   "김수한무",
//   "거북이",
//   "두루미",
//   "강아지",
//   "고양이",
//   "아무개",
//   "박씨",
//   "이씨",
//   "제임스",
//   "존",
//   "매튜",
// ];

function mix_members(members) {
  let answer = {};
  let group = {};
  let memberCnt = members.length;

  let sevenGroup = 0;
  let sevenRemainder = 0;
  let i = 0;

  // 1. 멤버 배열을 섞어줌 (shuffle)
  shuffleMembers(members);

  // 2. 5명 6명 7명 그룹이 몇 개씩 나오는지 먼저 계산
  // while, if 문을 통해 7명씩 최대로 나누고, 몫을 줄여가면서 그룹핑
  while (sevenGroup !== 1) {
    sevenGroup = parseInt(memberCnt / 7) - i;
    sevenRemainder = memberCnt - sevenGroup * 7;
    // 7명으로 전부 나눠질 경우
    if (sevenRemainder === 0) {
      group[7] = sevenGroup;
      group[6] = 0;
      group[5] = 0;
      break;
    }
    // 7명으로 나누고, 나머지 인원이 전부 6명으로 나눠질 경우
    if (sevenRemainder % 6 === 0) {
      group[7] = sevenGroup;
      group[6] = parseInt(sevenRemainder / 6);
      group[5] = 0;
      break;
    } else {
      // 나머지 인원이 6명으로 전부 나눠지지 않을 경우, 6명으로 최대한 나누고 다른 나머지 인원이 5명인지 확인
      if ((sevenRemainder % 6) % 5 === 0) {
        group[7] = sevenGroup;
        group[6] = parseInt(sevenRemainder / 6);
        group[5] = parseInt((sevenRemainder % 6) / 5);
        break;
      }
    }
    i++;
  }

  // 7명으로 묶었을 때 조건에 맞게 그룹핑이 안된 경우, 6명 5명으로 그룹핑 함
  if (sevenGroup === 1) {
    let sixGroup = 0;
    let sixRemainder = 0;
    sixGroup = parseInt(memberCnt / 6);
    sixRemainder = memberCnt % 6;
    if (sixRemainder === 0) {
      group[7] = 0;
      group[6] = sixGroup;
      group[5] = 0;
    } else if (sixRemainder % 5 === 0) {
      group[7] = 0;
      group[6] = sixGroup;
      group[5] = parseInt(sixRemainder / 5);
    } else {
      group[7] = 0;
      group[6] = 0;
      group[5] = parseInt(memberCnt / 5);
    }
  }

  // 3. 위에서 그룹핑한 대로 객체에 담음
  let tempArray = [];
  for (let i = 5; i < 8; i++) {
    for (let j = 0; j < group[i]; j++) {
      tempArray.push(members.splice(0, i));
    }
  }

  for (let i = 1; i < tempArray.length + 1; i++) {
    answer[i + "조"] = tempArray[i - 1];
  }

  return answer;
}

// members 리스트 요소들을 랜덤으로 섞어주는 함수
function shuffleMembers(members) {
  let currentIndex = members.length;
  let temp = "";
  let randomIndex = 0;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = members[currentIndex];
    members[currentIndex] = members[randomIndex];
    members[randomIndex] = temp;
  }
  return members;
}

mix_members(members);
