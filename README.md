# commit-manager-server

### :page_facing_up: 소개
CommitManager Application에서 사용하는 API를 제공하는 Express Server

### :man_technologist: 개발자

[Kimkyunghoon]("https://github.com/hoonkk")

### :space_invader: 사용한 기술
node : `13.8.0`

express : `4.17.1`

### :bulb: API

[GitHub API v3]("https://developer.github.com/v3/")

### :satellite: Uri
1. /commit
    - Params: 
      - token: Github private repository에 접근을 위한 Token을 입력(선택)
      - id: Github user id
    
    - Response : 
      - isCommited: 오늘의 커밋 여부 검사
      - count: 오늘의 커밋 횟수
      - lastCommit: 마지막 커밋 시간
      
2. /userinfo
    - Params:
      - id: Github user id
    - Response:
      - name: Github user 이름
      - imgSrc: 프로필 사진 이미지 링크
      - follower: 팔로워 수
      - following: 팔로잉 수
      
3. /user
    - Params:
      - id: Github user id
    - Response:
      - isExist: 해당 id의 유저 존재 여부 검사
  

