// ==========================================
// PWA 디지털 시계 클라이언트 애플리케이션 로직
// ==========================================

var APP_VERSION = 'v0.2.7';

// 화면 유지 대체용 Base64 인코딩 무음 비디오 데이터 (NoSleep.js 기반)
var WEBM_VIDEO_URI = "data:video/webm;base64,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";
var MP4_VIDEO_URI = "data:video/mp4;base64,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";

// DOM 엘리먼트 참조
var timeDisplay = document.getElementById('time-display');
var dateDisplay = document.getElementById('date-display');
var brightnessOverlay = document.getElementById('brightness-overlay');
var brightnessIndicator = document.getElementById('brightness-indicator-container');
var brightnessFill = document.getElementById('brightness-bar-fill');
var brightnessPct = document.getElementById('brightness-percentage');
var statusBar = document.getElementById('status-bar');
var wakelockDot = document.getElementById('wakelock-dot');
var wakelockText = document.getElementById('wakelock-text');
var offlineStatus = document.getElementById('offline-status');
var dummyVideo = document.getElementById('dummy-video');

// 설정 관련 DOM 엘리먼트 참조
var settingsModal = document.getElementById('settings-modal');
var settingsCloseBtn = document.getElementById('settings-close-btn');
var chkShowDate = document.getElementById('setting-show-date');
var chkShowSeconds = document.getElementById('setting-show-seconds');
var chkUse24Hour = document.getElementById('setting-use-24hour');
var chkLeadingZero = document.getElementById('setting-leading-zero');
var chkBlinkColon = document.getElementById('setting-blink-colon');
var chkSpaceColons = document.getElementById('setting-space-colons');
var chkBoldText = document.getElementById('setting-bold-text');
var rngFontSize = document.getElementById('setting-font-size');
var fontSizeVal = document.getElementById('font-size-val');

// 버전 정보 동적 반영
var versionHeader = document.getElementById('settings-version-header');
var versionFooter = document.getElementById('settings-version-footer');
if (versionHeader) versionHeader.textContent = APP_VERSION;
if (versionFooter) versionFooter.textContent = 'JS Clock ' + APP_VERSION;

// 앱 상태 변수 및 환경 설정값 (v0.1.4 기본값 정의)
var settings = {
  showDate: true,
  showSeconds: true,
  use24Hour: true,
  leadingZero: true,
  blinkColon: true,
  spaceColons: false,
  boldText: false,
  fontSize: 100
};

var currentBrightness = 1.0; // 0.01(가장 어두움, 1%) ~ 1.0(가장 밝음, 100%)
var isSliderVisible = false;
var sliderTimeout = null;
var statusBarTimeout = null;
var lastTapTime = 0;
var wakeLock = null;
var hasUserInteracted = false;
var videoInjected = false;

// 터치 및 마우스 드래그 상태 변수
var isDragging = false;
var dragStartY = 0;
var dragStartBrightness = 1.0;
var isDraggingStarted = false;

// 로컬 스토리지로부터 설정 로드 (속성 유실을 방지하는 안전 병합 방식)
try {
  var savedSettings = localStorage.getItem('js_clock_settings');
  if (savedSettings) {
    var parsed = JSON.parse(savedSettings);
    for (var key in parsed) {
      if (parsed.hasOwnProperty(key)) {
        settings[key] = parsed[key];
      }
    }
  }
} catch (e) {
  console.warn('설정 값을 로드하는 중 오류가 발생했습니다:', e);
}

// 설정 화면의 입력 폼 상태 동기화
chkShowDate.checked = settings.showDate;
chkShowSeconds.checked = settings.showSeconds;
chkUse24Hour.checked = settings.use24Hour;
chkLeadingZero.checked = settings.leadingZero;
chkBlinkColon.checked = settings.blinkColon;
chkSpaceColons.checked = !!settings.spaceColons;
chkBoldText.checked = settings.boldText;
rngFontSize.value = settings.fontSize;
fontSizeVal.textContent = settings.fontSize + '%';

// ==========================================
// 1. 시계 구동 로직 (시간 및 날짜 표시)
// ==========================================

function padZero(num) {
  return num < 10 ? '0' + num : num;
}

var lastRenderedText = '';

function updateClock() {
  var now = new Date();
  
  // 12/24시간제 형식을 반영하여 시간 계산 (12시간제일 때 AM/PM 접미사 미노출)
  var rawHours = now.getHours();
  
  if (!settings.use24Hour) {
    rawHours = rawHours % 12;
    rawHours = rawHours ? rawHours : 12; // 0시는 12시로 매핑
  }
  
  // 앞자리 0 표시 여부에 따른 시간 가중 처리
  var hours = settings.leadingZero ? padZero(rawHours) : String(rawHours);
  var minutes = padZero(now.getMinutes());
  var seconds = padZero(now.getSeconds());
  
  // 1초 단위 콜론(:) 0.5초 온/오프 깜빡임 여부 설정 처리 및 공백 삽입 제어
  var isColonHidden = settings.blinkColon && (now.getMilliseconds() >= 500);
  var colonChar = settings.spaceColons ? ' : ' : ':';
  var colonHtml = '<span class="colon' + (isColonHidden ? ' hidden' : '') + '">' + colonChar + '</span>';
  
  var timeHtml = hours + colonHtml + minutes;
  if (settings.showSeconds) {
    timeHtml += colonHtml + seconds;
  }
  
  // innerHTML을 사용하여 깜빡임 처리 시 글자 흔들림 방지
  timeDisplay.innerHTML = timeHtml;
  
  // 날짜 표시 (영어 형식: YYYY.MM.DD ddd)
  if (settings.showDate) {
    var year = now.getFullYear();
    var month = padZero(now.getMonth() + 1);
    var date = padZero(now.getDate());
    
    // 요일 형식을 TUE -> Tue 형태로 변경
    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dayOfWeek = dayNames[now.getDay()];
    
    dateDisplay.textContent = year + '.' + month + '.' + date + ' ' + dayOfWeek;
  }
  
  // 텍스트 자릿수나 스페이스 옵션 변화 감지하여 리사이징 수행
  var currentText = timeDisplay.textContent;
  if (currentText !== lastRenderedText) {
    lastRenderedText = currentText;
    resizeClock();
  }
}

// 최초 실행 및 0.5초 주기의 타이머 설정 (콜론 0.5초 깜빡임 대응)
updateClock();
setInterval(updateClock, 500);

// ==========================================
// 2. 반응형 UI (서체 크기 자동 최적화 및 굵기 제어)
// ==========================================

function resizeClock() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  
  // 1. 임시로 기준이 되는 테스트용 폰트 크기(100px) 대입
  var testFontSize = 100;
  timeDisplay.style.fontSize = testFontSize + 'px';
  
  // 2. 현재 렌더링된 텍스트의 실제 렌더링 너비(px) 측정
  var textWidth = timeDisplay.scrollWidth || timeDisplay.offsetWidth;
  if (!textWidth) return;
  
  // 3. 사용자가 설정한 font size 배율 (70% ~ 150%)
  // 최대치인 150% 설정 시 화면 가로 전체 사이즈 기준 98%까지 꽉 차도록 맵핑
  // 즉, 목표 너비 = 화면 너비 * (0.98 * (settings.fontSize / 150))
  var scale = (settings.fontSize || 100) / 150;
  var targetWidth = width * (0.98 * scale);
  
  // 4. 비례식을 통해 최적의 폰트 크기를 역산
  var timeFontSize = (targetWidth / textWidth) * testFontSize;
  
  // 5. 세로 높이 제한: 텍스트 높이가 화면 높이를 넘어가 시야에서 벗어나는 것 방지 (150% 스케일 시 세로 65% 제한)
  var maxHeight = height * (0.65 * scale);
  if (timeFontSize > maxHeight) {
    timeFontSize = maxHeight;
  }
  
  timeDisplay.style.fontSize = timeFontSize + 'px';
  
  // 굵게 속성 실시간 처리
  if (settings.boldText) {
    timeDisplay.style.fontWeight = '700';
    dateDisplay.style.fontWeight = '500';
  } else {
    timeDisplay.style.fontWeight = '500';
    dateDisplay.style.fontWeight = '300';
  }

  if (settings.showDate) {
    dateDisplay.style.display = 'block';
    var dateFontSize = timeFontSize * 0.23;
    dateDisplay.style.fontSize = dateFontSize + 'px';
    dateDisplay.style.marginTop = (timeFontSize * 0.12) + 'px';
  } else {
    dateDisplay.style.display = 'none';
  }
}

// 리사이즈 및 로드 이벤트 바인딩
window.addEventListener('resize', resizeClock);
window.addEventListener('load', resizeClock);
// 최초 즉시 실행
resizeClock();

// ==========================================
// 3. 밝기 제어 및 제스처 처리
// ==========================================

function setBrightness(level) {
  // 밝기 범위를 0.01(1%)에서 1.0(100%)로 제약
  var clamped = Math.max(0.01, Math.min(1.0, level));
  
  // 1% 단위(1단위) 조절을 위해 정수로 반올림하여 매핑
  var pct = Math.round(clamped * 100);
  currentBrightness = pct / 100;
  
  // 블랙 오버레이 레이어 불투명도 조절 (밝기 1%일 때 오버레이 투명도는 0.99)
  var overlayOpacity = 1.0 - currentBrightness;
  brightnessOverlay.style.opacity = overlayOpacity;
  
  // 밝기 제어 슬라이더 UI 갱신 (그레이/화이트 스타일)
  brightnessFill.style.transform = 'scaleY(' + currentBrightness + ')';
  brightnessPct.textContent = pct;
  
  // 로컬 스토리지에 밝기 값 저장
  try {
    localStorage.setItem('digital_clock_brightness', currentBrightness);
  } catch (e) {}
}

function showBrightnessSlider() {
  if (sliderTimeout) {
    clearTimeout(sliderTimeout);
  }
  brightnessIndicator.classList.add('visible');
  showStatusBarTemporarily();
}

function hideBrightnessSliderAfterDelay() {
  if (sliderTimeout) {
    clearTimeout(sliderTimeout);
  }
  sliderTimeout = setTimeout(function() {
    brightnessIndicator.classList.remove('visible');
  }, 1500);
}

function showStatusBarTemporarily() {
  if (statusBarTimeout) {
    clearTimeout(statusBarTimeout);
  }
  statusBar.classList.remove('hidden');
  
  // 5초간 무동작 시 하단 상태창을 자동으로 숨김
  statusBarTimeout = setTimeout(function() {
    statusBar.classList.add('hidden');
  }, 5000);
}

// 앱 구동 시 기존에 저장된 밝기 값 불러오기
try {
  var saved = localStorage.getItem('digital_clock_brightness');
  if (saved !== null) {
    setBrightness(parseFloat(saved));
  } else {
    setBrightness(1.0);
  }
} catch (e) {
  setBrightness(1.0);
}

// 최초 구동 시 5초 후 하단 상태창 페이드아웃 실행
showStatusBarTemporarily();

// --- 설정 팝업 제어 함수 ---
function openSettings() {
  settingsModal.classList.add('visible');
}

function closeSettings() {
  settingsModal.classList.remove('visible');
}

function saveSettings() {
  try {
    localStorage.setItem('js_clock_settings', JSON.stringify(settings));
  } catch (e) {
    console.error('설정 저장 중 오류가 발생했습니다:', e);
  }
}

// --- 더블 탭/더블 클릭 설정창 활성화 제스처 ---
function handleDoubleTap(e) {
  var now = Date.now();
  var timeDiff = now - lastTapTime;
  
  if (timeDiff < 300 && timeDiff > 0) {
    openSettings();
  }
  lastTapTime = now;
  
  // 화면 꺼짐 방지 활성화를 위한 첫 사용자 조작 트리거
  onFirstUserInteraction();
}

// 시계 컨테이너에 클릭 및 더블 클릭 이벤트 연결 (더블 탭 시 설정 모달 팝업 표시)
document.getElementById('clock-container').addEventListener('click', handleDoubleTap);
document.getElementById('clock-container').addEventListener('dblclick', function(e) {
  openSettings();
});

// 설정창 닫기 이벤트 핸들러 바인딩
settingsCloseBtn.addEventListener('click', closeSettings);
settingsModal.addEventListener('click', function(e) {
  if (e.target === settingsModal) {
    closeSettings();
  }
});

// 설정 체크박스 및 슬라이더 상태 변경 감지 리스너 바인딩
chkShowDate.addEventListener('change', function(e) {
  settings.showDate = e.target.checked;
  saveSettings();
  updateClock();
  resizeClock();
});

chkShowSeconds.addEventListener('change', function(e) {
  settings.showSeconds = e.target.checked;
  saveSettings();
  updateClock();
  resizeClock();
});

chkUse24Hour.addEventListener('change', function(e) {
  settings.use24Hour = e.target.checked;
  saveSettings();
  updateClock();
  resizeClock();
});

chkLeadingZero.addEventListener('change', function(e) {
  settings.leadingZero = e.target.checked;
  saveSettings();
  updateClock();
  resizeClock();
});

chkBlinkColon.addEventListener('change', function(e) {
  settings.blinkColon = e.target.checked;
  saveSettings();
  updateClock();
  resizeClock();
});

chkSpaceColons.addEventListener('change', function(e) {
  settings.spaceColons = e.target.checked;
  saveSettings();
  updateClock();
  resizeClock();
});

chkBoldText.addEventListener('change', function(e) {
  settings.boldText = e.target.checked;
  saveSettings();
  updateClock();
  resizeClock();
});

rngFontSize.addEventListener('input', function(e) {
  settings.fontSize = parseInt(e.target.value, 10);
  fontSizeVal.textContent = settings.fontSize + '%';
  saveSettings();
  resizeClock();
});

// --- 드래그 제스처 밝기 제어 (터치 및 마우스 드래그 지원) ---

// 드래그 시작 터치의 화면 Y 좌표 (영역 판정용)
var dragStartClientY = 0;
// 중간 영역(20%~80%) 드래그 여부 (pull-to-refresh 차단 대상)
var isMidZoneDrag = false;
// 탭(단순 터치) 판정용: touchstart 시간 기록
var touchStartTime = 0;

function handleDragStart(clientY) {
  isDragging = true;
  dragStartY = clientY;
  dragStartClientY = clientY;
  dragStartBrightness = currentBrightness;
  isMidZoneDrag = false;

  // 화면 세로 기준 상단 20% 영역은 크롬 제스처(알림바 내리기 등) 우선 - 밝기 조절 비활성
  var topThreshold = window.innerHeight * 0.20;
  var bottomThreshold = window.innerHeight * 0.80;
  if (clientY >= topThreshold && clientY <= bottomThreshold) {
    isMidZoneDrag = true;
  }

  // 밝기바가 이미 보이는 상태라면 임계값(3px) 검사 없이 즉시 제어 모드로 진입 및 타이머 취소
  if (brightnessIndicator.classList.contains('visible')) {
    isDraggingStarted = true;
    showBrightnessSlider();
  } else {
    isDraggingStarted = false;
  }
}

function handleDragMove(clientY) {
  if (!isDragging) return;

  var deltaY = clientY - dragStartY;

  // 상단 20% 시작 드래그는 밝기 조절 완전 무시 (크롬 pull-to-refresh 등 시스템 제스처 우선)
  if (!isMidZoneDrag) return;

  // 3px 이상 세로 이동 시 드래그 시작으로 간주하고 슬라이더 표출
  if (!isDraggingStarted && Math.abs(deltaY) > 3) {
    isDraggingStarted = true;
    showBrightnessSlider();
  }

  if (isDraggingStarted) {
    // 드래그 민감도: 화면 세로 300픽셀 이동 시 전체 밝기 범위 조절 가능하게 매핑
    var deltaBrightness = -deltaY / 300;
    setBrightness(dragStartBrightness + deltaBrightness);
  }
}

function handleDragEnd() {
  if (isDragging) {
    isDragging = false;
    if (isDraggingStarted) {
      hideBrightnessSliderAfterDelay();
    } else {
      // 드래그가 실제로 시작되지 않은 경우 밝기바가 남아있다면 강제 숨김
      if (brightnessIndicator.classList.contains('visible') && !isMidZoneDrag) {
        hideBrightnessSliderAfterDelay();
      }
    }
    isDraggingStarted = false;
    isMidZoneDrag = false;
  }
}

// 전체화면 토글 함수 (탭 시 전체화면 ON/OFF)
function toggleFullscreen() {
  try {
    var isFs = !!document.fullscreenElement || !!document.webkitFullscreenElement;
    if (isFs) {
      // 전체화면 해제 → 시스템 UI 표시
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    } else {
      // 전체화면 진입
      var docEl = document.documentElement;
      if (docEl.requestFullscreen) docEl.requestFullscreen();
      else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
    }
  } catch (err) {
    console.warn('전체화면 토글 실패:', err);
  }
}

// 터치 이벤트 리스너 등록
window.addEventListener('touchstart', function(e) {
  // 설정창이 띄워져 있거나, 밝기 표시 슬라이더 영역 또는 하단 상태바 터치 시 밝기 조절 무시
  if (settingsModal.classList.contains('visible') ||
      e.target.closest('#brightness-indicator-container') ||
      e.target.closest('#status-bar')) return;
  touchStartTime = Date.now();
  handleDragStart(e.touches[0].clientY);
  showStatusBarTemporarily();
}, { passive: true });

window.addEventListener('touchmove', function(e) {
  if (!isDragging) return;
  // 중간 영역 드래그 시 pull-to-refresh 차단
  if (isMidZoneDrag) {
    e.preventDefault();
  }
  handleDragMove(e.touches[0].clientY);
}, { passive: false });

window.addEventListener('touchend', function(e) {
  // 단순 탭(이동 없이 300ms 이내 터치 종료) → 전체화면 토글
  var touchDuration = Date.now() - touchStartTime;
  var moved = isDraggingStarted;
  handleDragEnd();
  if (!moved && touchDuration < 300 &&
      !settingsModal.classList.contains('visible') &&
      !e.target.closest('#brightness-indicator-container') &&
      !e.target.closest('#status-bar')) {
    toggleFullscreen();
  }
}, { passive: true });

// 마우스 드래그 이벤트 리스너 등록 (PC 환경 및 테스트 대안용)
window.addEventListener('mousedown', function(e) {
  if (settingsModal.classList.contains('visible') ||
      e.target.closest('#brightness-indicator-container') ||
      e.target.closest('#status-bar')) return;
  touchStartTime = Date.now();
  handleDragStart(e.clientY);
});

window.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  handleDragMove(e.clientY);
});

window.addEventListener('mouseup', function(e) {
  var moved = isDraggingStarted;
  var touchDuration = Date.now() - touchStartTime;
  handleDragEnd();
  if (!moved && touchDuration < 300 &&
      !settingsModal.classList.contains('visible')) {
    toggleFullscreen();
  }
});

// 마우스 이동 시 하단 상태 표시줄을 일시적으로 보여줌
window.addEventListener('mousemove', showStatusBarTemporarily);

// ==========================================
// 4. 화면 꺼짐 방지 (Wake Lock API & 더미 비디오 루프)
// ==========================================

function updateWakeLockUI(isActive) {
  if (isActive) {
    wakelockDot.className = 'status-dot active';
    wakelockText.textContent = '화면 유지 활성';
  } else {
    wakelockDot.className = 'status-dot inactive';
    wakelockText.textContent = '화면 유지 비활성';
  }
}

// 메인 화면 꺼짐 방지 활성화 함수
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      if (wakeLock) {
        await wakeLock.release();
      }
      wakeLock = await navigator.wakeLock.request('screen');
      updateWakeLockUI(true);
      
      // Wake Lock이 해제되는 시점 감지
      wakeLock.addEventListener('release', function() {
        updateWakeLockUI(false);
      });
    } catch (err) {
      console.warn('Wake Lock 요청 실패. 더미 비디오 루프 기능으로 대체합니다:', err);
      updateWakeLockUI(false);
      playDummyVideo();
    }
  } else {
    // Wake Lock API를 지원하지 않는 경우 곧바로 더미 비디오 재생으로 대체
    playDummyVideo();
  }
}

// 구형 기기용 화면 꺼짐 방지용 보이지 않는 무한 루프 비디오 주입
function injectVideoSources() {
  if (videoInjected) return;
  
  // WebM 소스 생성 및 추가
  var sourceWebm = document.createElement('source');
  sourceWebm.src = WEBM_VIDEO_URI;
  sourceWebm.type = 'video/webm';
  dummyVideo.appendChild(sourceWebm);
  
  // MP4 소스 생성 및 추가
  var sourceMp4 = document.createElement('source');
  sourceMp4.src = MP4_VIDEO_URI;
  sourceMp4.type = 'video/mp4';
  dummyVideo.appendChild(sourceMp4);
  
  // iOS Safari 브라우저에서 동영상이 일시중지되는 문제 방지를 위한 timeupdate 이벤트 리스너 설정
  dummyVideo.addEventListener('loadedmetadata', function() {
    if (dummyVideo.duration <= 1) {
      dummyVideo.setAttribute('loop', '');
    } else {
      dummyVideo.addEventListener('timeupdate', function() {
        if (dummyVideo.currentTime > 0.5) {
          dummyVideo.currentTime = Math.random();
        }
      });
    }
  });
  
  videoInjected = true;
}

function playDummyVideo() {
  injectVideoSources();
  
  dummyVideo.play().then(function() {
    console.log('화면 꺼짐 방지 더미 비디오 재생이 정상적으로 시작되었습니다.');
    // 대체 모드로 작동하는 상태 표시
    wakelockDot.className = 'status-dot active';
    wakelockText.textContent = '화면 유지 활성 (미디어)';
  }).catch(function(err) {
    console.error('화면 꺼짐 방지 비디오 재생 실패:', err);
    wakelockDot.className = 'status-dot inactive';
    wakelockText.textContent = '화면 유지 에러';
  });
}

// 브라우저 보안 제약사항에 맞추어 사용자의 첫 터치/클릭 제스처 시 화면 유지 기능 작동 시작
function onFirstUserInteraction() {
  if (hasUserInteracted) return;
  hasUserInteracted = true;

  requestWakeLock();

  // 전체화면 최초 진입 (탭 이후 토글은 toggleFullscreen() 사용)
  try {
    var docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      docEl.mozRequestFullScreen();
    } else if (docEl.msRequestFullscreen) {
      docEl.msRequestFullscreen();
    }
  } catch (err) {
    console.warn('전체 화면 진입 실패:', err);
  }
}

// 사용자가 탭을 전환했다가 백그라운드에서 포그라운드로 돌아왔을 때 화면 유지 재요청
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible' && hasUserInteracted) {
    requestWakeLock();
  }
});

// ==========================================
// 5. 서비스 워커 등록 및 오프라인 상태 모니터링
// ==========================================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js?v=' + APP_VERSION)
      .then(function(reg) {
        console.log('서비스 워커가 성공적으로 등록되었습니다. 범위: ', reg.scope);
        
        // 대기 중인 새 워커가 있으면 즉시 스킵 대기 요청
        if (reg.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
        
        // 새로운 서비스 워커 설치 탐지 시
        reg.addEventListener('updatefound', function() {
          var newWorker = reg.installing;
          newWorker.addEventListener('statechange', function() {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        });
      })
      .catch(function(err) {
        console.error('서비스 워커 등록 실패: ', err);
      });
  });

  // 새로운 서비스 워커가 활성화되어 제어권이 변경되면 자동 새로고침하여 캐시 즉시 교체
  var refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', function() {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}

// 오프라인 연결 상태 변화 감지 UI 갱신
function updateOfflineUI() {
  if (navigator.onLine) {
    offlineStatus.style.display = 'none';
  } else {
    offlineStatus.style.display = 'flex';
  }
}

window.addEventListener('online', updateOfflineUI);
window.addEventListener('offline', updateOfflineUI);
// 구동 시 즉시 네트워크 체크 실행
updateOfflineUI();

// 첫 상호작용 전역 이벤트 등록
window.addEventListener('click', onFirstUserInteraction);
window.addEventListener('touchend', onFirstUserInteraction);
