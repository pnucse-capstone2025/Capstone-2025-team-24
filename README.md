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
> 프로젝트의 공공성, 지속 가능성, 환경 보호 등
### 3. 시스템 설계
#### 3.1. 시스템 구성도
> 이미지 혹은 텍스트로 시스템 아키텍쳐 작성
>
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
> 기능 흐름 설명 및 도식화 가능
>
#### 4.2. 기능 설명 및 주요 기능 명세서
> 주요 기능에 대한 상세 설명, 각 기능의 입력/출력 및 설명
>
#### 4.3. 디렉토리 구조
>
#### 4.4. 산업체 멘토링 의견 및 반영 사항
> 멘토 피드백과 적용한 사례 정리

### 5. 설치 및 실행 방법
>
#### 5.1. 설치절차 및 실행 방법
> 설치 명령어 및 준비 사항, 실행 명령어, 포트 정보 등
#### 5.2. 오류 발생 시 해결 방법
> 선택 사항, 자주 발생하는 오류 및 해결책 등

### 6. 소개 자료 및 시연 영상
#### 6.1. 프로젝트 소개 자료
> PPT 등
#### 6.2. 시연 영상
> 영상 링크 또는 주요 장면 설명

### 7. 팀 구성
#### 7.1. 팀원별 소개 및 역할 분담

**Backend (BE)**

| 구분 | 이름 |  | 역할 분담 |
|---|---|---|---|
| BE | [김도엽](https://github.com/Doyeop-02) | <img src="https://avatars.githubusercontent.com/u/127001462?v=4" width="80" alt="김도엽 아바타"> | 백엔드 개발(이메일 인증, 사용자 도메인 등), 백엔드 배포 및 자동 배포, 블록 설계 |
| BE · 팀장 | [박혜연](https://github.com/hyyyh0x) | <img src="https://avatars.githubusercontent.com/u/141637975?v=4" width="80" alt="박혜연 아바타"> | DB 연결, 프론트엔드 자동 배포, 블록 설계, Swagger 구현, Figma 디자인 |

**Frontend (FE)**

| 구분 | 이름 |  | 역할 분담 |
|---|---|---|---|
| FE | [정종현](https://github.com/general706) | <img src="https://avatars.githubusercontent.com/u/171523870?v=4" width="80" alt="정종현 아바타"> | 프론트엔드 개발(서비스 화면, Blockly 구현 등), 블록 설계, Figma 디자인 |
  
#### 7.2. 팀원 별 참여 후기
> 개별적으로 느낀 점, 협업, 기술적 어려움 극복 사례 등

### 8. 참고 문헌 및 출처
