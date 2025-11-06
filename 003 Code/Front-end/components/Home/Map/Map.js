// 'use client'; // Next.js app 디렉토리면 이 줄을 꼭 켜세요.

import React, { useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Map({ visible = true }) {
  // 1) 스크립트 로드 상태와 에러를 직접 확인
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBEIZlbot1P4HZtIj4xFXkEnMjeLp7mf4E",
  });

  const center = useMemo(() => ({ lat: 37.5665, lng: 126.9780 }), []);
  const wrapRef = useRef(null);
  const [visibilityIssue, setVisibilityIssue] = useState(null);

  // 2) 조상에 aria-hidden / inert / display:none 등이 있는지 런타임 체크
  useEffect(() => {
    if (!visible) return;
    const el = wrapRef.current;
    if (!el) return;

    // display:none 체크
    if (!el.offsetParent && getComputedStyle(el).display === "none") {
      setVisibilityIssue("Container (or an ancestor) has display:none.");
      return;
    }

    // visibility/opacity 체크
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) {
      setVisibilityIssue("Container (or an ancestor) is visually hidden.");
      return;
    }

    // aria-hidden / inert 조상 탐색
    const ariaHiddenAncestor = el.closest('[aria-hidden="true"]');
    const inertAncestor = el.closest("[inert]");
    if (ariaHiddenAncestor) {
      setVisibilityIssue('Ancestor has aria-hidden="true". Remove it for the visible panel.');
      return;
    }
    if (inertAncestor) {
      setVisibilityIssue("Ancestor has inert attribute. Remove it for the visible panel.");
      return;
    }

    setVisibilityIssue(null);
  }, [visible]);

  // 3) 실제로 보일 때만 렌더
  if (!visible) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        width: "100%",
        height: 400,
        minHeight: 400,      // 부모 높이 0 방지
        position: "relative" // 디버그 오버레이용
      }}
    >
      {/* 디버그 오버레이: 문제가 있으면 화면에 바로 표시 */}
      {(loadError || visibilityIssue || !isLoaded) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 12,
            fontSize: 13,
            background: "rgba(0,0,0,0.6)",
            color: "white",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}
        >
          {!isLoaded && !loadError && (
            <div>Loading Google Maps script… (만약 이 상태로 멈추면 API 키/도메인 제한/빌링 설정을 확인하세요)</div>
          )}
          {loadError && (
            <div>
              <b>Script loadError:</b> {String(loadError?.message || loadError)}
              <div style={{ opacity: 0.8, marginTop: 4 }}>
                콘솔(Network/Console)에서 Google Maps API 에러 메시지를 확인하세요.
                (예: RefererNotAllowedMapError, ApiNotActivatedMapError, BillingNotEnabled)
              </div>
            </div>
          )}
          {visibilityIssue && <div><b>Visibility issue:</b> {visibilityIssue}</div>}
        </div>
      )}

      {isLoaded && !visibilityIssue && (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={12}
          onLoad={(map) => {
            // 탭/모달에서 처음 보일 때 회색 박스가 보이면 한 번 강제 리사이즈/리센터
            // (대부분 최신 버전은 필요 없지만 안전하게)
            setTimeout(() => {
              map.panTo(center);
            }, 0);
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
}
