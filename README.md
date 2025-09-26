### 1. 프로젝트 배경
#### 1.1. 국내외 시장 현황 및 문제점
다양한 분야에서 데이터를 구조화해서 사용하고 있다. 그러나 요리 레시피는 여전히 자연어로 보관되며
컴퓨터가 이해하기 어려운 비정형 정보로 사용되고 있다. 동시에 코딩의 대중화로 많은 사람들이 프로그래밍을 접하고 있지만
텍스트 기반 프로그래밍 언어는 비개발자가 접근하기 어렵다는 점이 남아있다.

#### 1.2. 필요성과 기대효과
본 프로젝트는 요리를 프로그래밍할 수 있는가? 라는 질문에서 출발하여
블록형 코딩을 통해 요리 과정을 구조화하고 누구나 조작 가능한 형태로 전환하려는 시도를 담는다.
이 시스템은 레시피 자동화, 공유, 수정을 쉽게 만들어줄 뿐만 아니라 이후
디지털 조리 도우미나 스마트 주방 시스템과의 연계 가능성도 열어준다.

### 2. 개발 목표
#### 2.1. 목표 및 세부 내용
이 프로젝트에서는 요리용 코딩언어를 Scratch 방식의 블록 인터페이스로 구현하여,
사용자가 시각적으로 각 요리 단계와 흐름을 쉽게 인식하고 구성할 수 있도록 돕는 도구를 개발하는 것을 목표로 한다.
각 블록은 크게 재료와 동작, 제어 블록으로 구성되며, 사용자는 이를 드래그 앤 드롭하여 요리 과정을 설계할 수 있다.
이러한 시스템을 통해 사용자는 요리법을 단순한 텍스트가 아닌 블록 기반의 구조화된 코드 형태로 직관적으로 표현하고,
조리 순서를 시각적으로 이해하고 조작할 수 있다.

#### 2.2. 기존 서비스 대비 차별성 
블록코딩 서비스에는 스크래치가 있다. 코딩 교육용 서비스로, 요리에 특화된 서비스가 아닌 점에서 차별이 된다.
관련된 도메인에는 Fastfood가 있다. Fastfood는 자연어 생성 중심 접근 연구로, 하나의 시스템이라고 보기 보단 요리를 규칙 기반으로 정의하는 연구에 가깝다고 볼 수 있다. 이런 기존 서비스와 차별되는 점은 요리에 특화되어 있다는 점으로, 자신만의 레시피를 블록형태로 만들어 저장할 수 있다는 점이 가장 큰 차이점이다.

#### 2.3. 사회적 가치 도입 계획 
레시피를 블록으로 저장한다는 점에서 코딩과 요리를 접목하여 배울 수 있고, 코딩과 요리에 쉽게 접근할 수 있다. 나아가 레시피의 자동화를 쉽게 만들어 주방 시스템과의 연계도 가능하게 한다.

### 3. 시스템 설계
#### 3.1. 시스템 구성도
<img width="600" alt="image" src="https://github.com/user-attachments/assets/0ad6eb46-2f4f-492b-b06c-4deedd80af7b" />

#### 3.2. 사용 기술
![java 21](https://img.shields.io/badge/Java%2021-007396?style=flat-square&logo=openjdk&logoColor=white)
![spring boot 3.3](https://img.shields.io/badge/Spring%20boot%203.3-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![mongodb](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
</br>
![AWS EC2](https://img.shields.io/badge/AWS%20EC2-FF9900?style=flat-square&logo=amazonec2&logoColor=white)
</br>
![React](https://img.shields.io/badge/-React%2018-4894FE?style=flat-square&logo=react&logoColor=white)
![blockly](https://img.shields.io/badge/Blockly-FFCA28?style=flat-square&logo=google&logoColor=black)
</br>
![netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)
</div>

### 4. 개발 결과
#### 4.1. 전체 시스템 흐름도
<img width="600" alt="image" src="https://github.com/user-attachments/assets/506d4aca-696c-4f7b-b7a6-0f4eeb221b39" />

#### 4.2. 기능 설명 및 주요 기능 명세서
주요 기능에는 레시피 만들기, 레시피 저장하기, 태그 별로 검색하기, 이메일 인증받기가 있다. 먼저, 이메일 인증받기는 회원가입과 비밀번호를 찾을 때 사용되는 기능이다. 두번째로, 레시피 만들기는 가장 핵심적인 기능으로, 레시피를 블록 형태로 만들고, 태그 별로 저장할 수 있다. 레시피 저장은 이름 필수, 태그 하나 이상 필수이다. 또한 레시피를 만드는 것은 저장된 문법 안에서만 가능하다. 나의 레시피에 들어가면, 레시피를 태그 별로 검색하는 필터 기능이 있다. 마지막으로, 회원 정보를 수정하는 기능도 있다.

#### 4.3. 디렉토리 구조
- code  
  - BlockChef-back  (백엔드 코드)  
  - BlockChef-front (프론트엔드 코드)  
- docs (문서)
  - 01.보고서  
    - 01.착수보고서.pdf  
    - 02.중간보고서.pdf  
    - 03.최종보고서.pdf  
  - 02.포스터  
    - 포스터파일.pdf  
  - 03.발표자료  
- README.md 

#### 4.4. 산업체 멘토링 의견 및 반영 사항
> 멘토 피드백과 적용한 사례 정리

### 5. 설치 및 실행 방법
#### 5.1. 설치절차 및 실행 방법
[서비스 링크](https://blockchef-front.netlify.app/)

#### 5.2. 오류 발생 시 해결 방법
개발자에게 문의. 

### 6. 소개 자료 및 시연 영상
#### 6.1. 프로젝트 소개 자료
docs -> 발표자료에 있다.

#### 6.2. 시연 영상
[![BlockChef 시연 영상](http://img.youtube.com/vi/uQxJopbJNZc/0.jpg)](https://youtu.be/uQxJopbJNZc)

### 7. 팀 구성
#### 7.1. 팀원별 소개 및 역할 분담

**Backend (BE)**

| 구분 | 이름 | 역할 분담 | 연락처 |
|---|---|---|---|
| BE | <div align="center"><img src="https://avatars.githubusercontent.com/u/127001462?v=4" width="80" alt="김도엽 아바타"></br>[김도엽](https://github.com/Doyeop-02) </div>| 백엔드 개발(이메일 인증, 사용자 도메인 등), 백엔드 배포 및 자동 배포, 블록 설계 | nicedog02@pusan.ac.kr |
| BE · 팀장 | <div align="center"><img src="https://avatars.githubusercontent.com/u/141637975?v=4" width="80" alt="박혜연 아바타"></br>[박혜연](https://github.com/hyyyh0x) </div>| DB 연결, 프론트엔드 자동 배포, 블록 설계, Swagger 구현, Figma 디자인 | hyyyh0x@pusan.ac.kr |

**Frontend (FE)**

| 구분 | 이름 | 역할 분담 | 연락처 |
|---|---|---|---|
| FE | <div align="center"><img src="https://avatars.githubusercontent.com/u/171523870?v=4" width="80" alt="정종현 아바타"></br>[정종현](https://github.com/general706)</div> | 프론트엔드 개발(서비스 화면, Blockly 구현 등), 블록 설계, Figma 디자인 | general706@pusan.ac.kr ||
  
#### 7.2. 팀원 별 참여 후기
| 팀원 | 느낀 점 |
|------|---------|
| <div align="center"><img src="https://avatars.githubusercontent.com/u/127001462?v=4" width="230"><br>[김도엽](https://github.com/Doyeop-02)</div> | 이번 프로젝트를 수행하면서 일상에서 사용하는 간단한 페이지, 버튼 하나에 들어가는 작은 기능들까지도 개발자의 수고가 들어가 있음을 체감하였다. 협업을 하는 과정에서 종종 서로 같은 생각과 이해를 공유한다 생각하고 넘어갔는데 정말 사소하게 다른 시각때문에 나중에 일이 틀어지는걸 경험했다. 이를 통해 작은 부분까지도 자세하게 의견을 공유하고 계속 확인하며 넘어가는 의사소통이 매우 중요하다고 생각했다. spring을 처음 접하기에 생기는 기술적 어려움도 많았다. 이는 인프런이나 블로그, chatGPT를 사용해서 전체적인 구조부터 이해하고 세부적인 기술을 익힘으로써 해결하였다. |
| <div align="center"><img src="https://avatars.githubusercontent.com/u/141637975?v=4" width="230"><br>[박혜연](https://github.com/hyyyh0x)</div> | 협업에 대해서 많이 배웠고, 특히 팀장이 되어서 팀을 이끌어 나가는 것에 대해 많이 배우게 되었다. 아직 많이 부족하다는 것도 알게 되었으며, 새로 경험하는 기술도 있어서 재미있게 참여할 수 있었다. 팀원들과 함께 협업해가며 보고서 쓰는 방법, 서비스 개발과 관련되어 많은 도움을 받으며 공부할 수 있어 좋은 경험이 되었다.|
| <div align="center"><img src="https://avatars.githubusercontent.com/u/171523870?v=4" width="230"><br>[정종현](https://github.com/general706)</div> | 졸업과제 프로젝트를 진행하며 많이 배우기도 하였지만 정말 난관에 많이 부딪혔다. 여태까지 프론트엔드를 도맡아 한적이 없었기에 간단한 페이지 만드는것도 공부를 해야 기억이 되살아 났었고 더더욱 여태 들었던 수업에선 정적페이지인 html을 다뤘다면 서비스가 제공되어야 하는 동적페이지를 만들기 위해 React환경을 처음 접해보며 처음인데 해야할건 많아서 과연 이걸 할수있을까 라는 의문도 들었다. 하지만 꾸준히 시간을 내어 공부를 한결과 어느정도 React를 다룰수 있게 되었고 그후 팀원들과 협업하며 의견조율을 위해 Figma라는 디자인툴을 다루며 디자인을 어떻게 할지 만들어가며 자세한 디자인과 기능을 웹페이지에 적용시키는데 많은 노력이 들어서 힘들었지만 완성시키고 나니 엄청 뿌듯하였다. 블록설계에 대해서도 Blockly라는 다소 생소한 라이브러리를 사용했기에 메뉴얼을 꼼꼼히 읽어가며 막힐때 마다 라이브러리를 공부하며 나아가다 보니 앞으로의 CS공부도 어떻게 할지도 감이 잡히는 느낌이었다. 마지막으로 팀원들과 의사소통을 통해 같이 해결방안을 찾고 오류 수정하며 모든것이 서툰 나에게 괜찮다며 다독여주며 끝까지 작업을 함께한 팀원들에게 감사한 마음을 이자리를 빌어 전하고 싶다. |

### 8. 참고 문헌 및 출처
[1] Scratch [Online]. Available: https://scratch.mit.edu/</br>
[2] Louis Mahon, Carl Vogel, "The Proof is in the Pudding: Using Automated Theorem Proving to Generate Cooking Recipes," 10, Mar 2022</br>
[3] geeksforgeeks “Introduction to Programming Languages” [Online]. Available: https://www.geeksforgeeks.org/computer-science-fundamentals/introduction-to-programming-languages</br>
[4] Blockly guide [Online]. Available: https://developers.google.com/blockly/guides/get-started/what-is-blockly?hl=ko</br>
[5] MongoDB introduction [Online]. Available: https://www.mongodb.com/ko-kr/resources/basics/databases/document-databases
