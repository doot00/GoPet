<div align= "center">
    <img src="https://capsule-render.vercel.app/api?type=rounded&color=ffeba3&height=120&text=고펫&animation=&fontColor=000000&fontSize=60" />
    </div>
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 📌 프로젝트 개요 </h2>  
    <div style="font-weight: 700; font-size: 15px; text-align: left; color: #282d33;"> 이 프로젝트는 KcisaApi 데이터를 기반으로 다양한 카테고리(병원, 카페, 음식점, 공원 등)의 장소 정보를 Naver Maps API 위에 표시하고, 모달 및 사이드바 UI를 통해 세부 정보를 확인할 수 있도록 구현한 웹 애플리케이션입니다. 또한 유기동물 데이터(GgAnimalApi) 및  반려동물 관련 뉴스(NewsApi)를 함께 제공하여 반려동물 관련 통합 서비스를 제공한다. </div> 
    </div>
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">1️⃣ KcsaApi 데이터를 Naver Maps API에 적용하기</h2>  
    <div style="font-weight: 700; font-size: 15px; text-align: left; color: #282d33;">lat, lng 값에서 "N", "E" 문자를 제거하고 숫자만 추출
address2에서 우편번호만 분리하여 사용
category2 기준으로 데이터를 필터링하여 지도에 표시
각 카테고리(hospital, cafe, food, park)별 모달 컴포넌트 생성 <br>→ title, address, region, phone, description, charge, url 정보 표시
 </div> 
    </div>
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">2️⃣ 지도 확대 시 해당 구역의 마커만 표시</h2>  
    <div style="font-weight: 700; font-size: 15px; text-align: left; color: #282d33;">Map.getBounds() 함수를 사용하여 현재 지도의 Boundary(SW, NE)값을 가져온다.<br>
lat >= sw.lat() && lat <= ne.lat() && <br>
lng >= sw.lng() && lng <= ne.lng()을 통해 확대된 지도 영역 내 마커만 렌더링한다.

마커 클릭 시 searchCoordinateToAddress()를 사용하여 좌표 -> 주소로 변환하고, 기존 마커를 새 마커가 렌더링 된 후 제거한 뒤 마커 업데이트
 </div> 
    </div>
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">3️⃣ 사이드바 및 버튼 연동</h2>  
    <div style="font-weight: 700; font-size: 15px; text-align: left; color: #282d33;">isModalOpen을 사용하여 모달의 on/off를 구현한다.<br>
사이드바에 클릭한 마커의 정보 및 모든 마커의 리스트, 지역별 리스트 값을 가져올 수 있도록 구성
 </div> 
    </div>
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">4️⃣ 유기동물 데이터 (GgAnimalApi)</h2>  
    <div style="font-weight: 700; font-size: 15px; text-align: left; color: #282d33;">GgAnimalApi를 사용하여 유기동물 정보 불러오기 
.filter()을 사용하여 data.STATE_NM === “보호중” 보호중인 유기동물 데이터 값만 받아올 수 있도록 하였고,
.map을 통해 title, coord, address 정보를 추출하였습니다.
address.split()를 사용하여 시, 군, 구 단위를 분리하였습니다.
 </div> 
    </div>
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">5️⃣ 반려동물 뉴스 (NewsApi)</h2>  
    <div style="font-weight: 700; font-size: 15px; text-align: left; color: #282d33;">NewsApi를 사용하여 반려동물 관련 최신 뉴스 제공
검색 키워드: "반려동물" “OR “강아지" url에 조건을 추가하여 url 링크로 원문 기사 연결되도록 하였습니다.
 </div> 
    </div>
    <div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;">6️⃣ 커스텀 훅 – useToggleNav</h2>  
    <div style="font-weight: 700; font-size: 15px; text-align: left; color: #282d33;">useToggleNav Custom hook을 생성하여 On/Off 토글 기능을 구현하였다.
 </div> 
    </div>
    <div style="text-align: left;">
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 🛠️ 사용 기술 </h2> <br> 
    <div style="margin: ; text-align: left;" "text-align: left;"> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
          <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white">
          <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
          <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
          <img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white">
          <br/><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">
          </div>
    </div>
    <div style="text-align: left;">
    <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> 🧑‍💻 Contact me </h2> <br> 
    <div style="text-align: left;">  </div>  <br> 
    <div style="text-align: left;"><a href="https://github.com/doot00/GoPet" target="_blank" title="my github link" class="d-flex align-items-center gap-2 text-decoration-none" style="font-size: 28px;">
                                                    <i class="fa-brands fa-github" style="color: black;"></i>
                                                <span class="bebas-neue" style="color: black;">Github</span>
                                                </a>
    </div>
    
