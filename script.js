const history = [];
function calculateWorkTime() {

  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const breakTime = document.getElementById("breakTime").value;
  // localStorageへ保存（ブラウザへ保存）
  localStorage.setItem("startTime", startTime);
  localStorage.setItem("endTime", endTime);
  localStorage.setItem("breakTime", breakTime);

  // 未入力チェック
  if (!startTime || !endTime) {
      document.getElementById("result").innerText =
          "出勤時間と退勤時間を入力してください";
      return;
  }

  const start = new Date(`2000-01-01 ${startTime}`);
  const end = new Date(`2000-01-01 ${endTime}`);

  // 退勤時間チェック
  if (end <= start) {
      document.getElementById("result").innerText =
          "退勤時間は出勤時間より後にしてください";
      return;
  }

  const diffMs = end - start;

  const diffMinutes = diffMs / 1000 / 60;

  const workMinutes = diffMinutes - breakTime;

  const hours = Math.floor(workMinutes / 60);
  const minutes = workMinutes % 60;

  document.getElementById("result").innerText =
      `実働時間：${hours}時間 ${minutes}分`;

      history.unshift(`実働時間:${hours}時間 ${minutes}分`);

      console.log(history);
      
      const historyList = document.getElementById("historyList");
      
      historyList.innerHTML = "";
      
      for (const item of history) {
          historyList.innerHTML += `<li>${item}</li>`;
      }
}

// ページ読み込み時に保存データ取得
window.onload = function () {

  const savedStartTime = localStorage.getItem("startTime");
  const savedEndTime = localStorage.getItem("endTime");
  const savedBreakTime = localStorage.getItem("breakTime");

  if (savedStartTime) {
      document.getElementById("startTime").value = savedStartTime;
  }

  if (savedEndTime) {
      document.getElementById("endTime").value = savedEndTime;
  }

  if (savedBreakTime) {
      document.getElementById("breakTime").value = savedBreakTime;
  }
}