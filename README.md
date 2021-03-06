## Team Rule

### Commit rule  

1. 제목과 본문을 모두 작성하여 commit한다
2. commit -m 옵션을 사용하지 않고 vim등과 같은 에디터를 사용하여 작성한다
3. **일반적인** git 작성 규칙을 사용한다
4. 변경한 내용을 순서에 따라 적는다
5. 목록형으로 작성 가능

~~~
ex)
Update communication Function

1) Add Bluetooth BLE 4.0 service
2) Remove WiFi Module
~~~

#### 제목  
- 50자를 넘지 않는다  
- 대문자로 시작한다  
- 마침표를 찍지 않는다  
- 제목과 본문사이에 2번째 행은 비워둔다  
- 제목은 영어로 작성
- Update : 기능 추가/변경
- Add : 파일 추가
- Remove : 파일이나 제거
- Modify : 리팩토링, 내용 수정

#### 본문   
- 72자를 넘지 않는다  
- 명령형 어조를 사용한다(동사로 시작되며 현재형)  
- 명시적으로 사용한다  
- 본문은 한글로 작성
- 1,2,3 등의 개조식으로 표현

---

### 코딩 컨벤션 룰

- 코딩 컨벤션은 naver와 air_bnb의 공식 문서를 참고한다.

---

### 브랜치 규칙

- 이름이니셜_파트_기능 //기능이름의 줄띄움, 구분은 "-" 사용  
- 되도록 너무 길지 않게
```
예) BJH_profile_pw-check  
```
- 항상 dev 브랜치로 진행상황을 commit, merge 합니다.

---

### 개발 환경(스택)

- HTML5
- CSS3
- JavaScript(ES6)
- NodeJS(templete -> ejs, flamewrok -> Express)
- MySQL
