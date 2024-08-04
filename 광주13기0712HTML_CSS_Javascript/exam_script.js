// 자바스크립트 실행의 안정성을 높이기 위해서 쓴다 ↓
// document.addEventListener('DOMContentLoaded', function(){});

/*
javascript 작성 가이드라인 참고
https://github.com/tipjs/javascript-style-guide 한글번역
https://github.com/airbnb/javascript            원문사이트
*/

document.addEventListener('DOMContentLoaded', function () {
    const inputContainer = document.getElementById("input-container");
    // 이벤트 위임을 사용하여 inputContainer에 이벤트 리스너를 추가
    inputContainer.addEventListener('keyup', function (event) {
        // 이벤트가 발생한 요소를 찾음
        const targetElement = event.target;

        const element = document.querySelector("#" + targetElement.id);
        const result = element.value * 5;

        const regex = /[^0-9]/g;        // 숫자가 아닌 모든 글자를 찾는 정규식
        const childElementId = "subject" + targetElement.id.replace(regex, "");
        const childElement = document.querySelector("#" + childElementId);
        if ((regex.test(element.value))) {
            alert("숫자만 입력 가능합니다.");
            element.value = "";
            return false;
        } else if (element.value > 20) {
            alert("각 과목 당 맞은 문제수(0~20)를 입력하세요.");
            element.value = "";
            childElement.style.display = "none";
            return false;
        } else {
            childElement.style.display = "inline";
            childElement.textContent = result;
        }
    });
    // 최종결과 버튼 클릭시 실행되는 함수
    document.querySelector('#calculate').addEventListener('click', function () {
        const scores = document.querySelectorAll(".subject-score");
        let sum = 0;
        let count = 0;
        for (let i = 0; i < scores.length; i++) {
            let num = parseInt(scores[i].innerHTML)
            if (isNaN(num)) {
                alert("각 과목 당 맞은 문제수(0~20)를 입력하세요.");
                return false;
            }
            sum += num;
            if (num < 40) {
                count++;
            }
        }
        let average = sum / scores.length;
        let result = "";
        result = average < 60 || count > 0 ? '불합격' : '합격';
        document.querySelector('#footer').style.display = "block";
        document.querySelector('#average-score').textContent = `평균: ${average}`;
        document.querySelector('#failed-subject').textContent = `과락된 과목 수: ${count}`;
        document.querySelector('#result-status').textContent = `${result}`;
    })
});
