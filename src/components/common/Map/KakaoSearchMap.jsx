import { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';

export default function KakaoSearchMap({ onSelectPlace }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState('');
  const markerRef = useRef(null); // 이전 마커 기억용

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(interval);

        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);
      }
    }, 300);
  }, []);

  const setMarker = (place) => {
    if (!map) return;

    const latlng = new window.kakao.maps.LatLng(place.y, place.x);
    map.setCenter(latlng);

    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const marker = new window.kakao.maps.Marker({
      map,
      position: latlng,
    });

    markerRef.current = marker;
    setAddress(place.address_name);
  };

  const handleSearch = () => {
    if (!window.kakao || !map) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setResults(data);

        if (data.length > 0) {
          console.log('🔍 첫 번째 검색 결과:', data[0]);
          setMarker(data[0]);
          onSelectPlace?.(data[0]);
        }
      } else {
        alert('검색 결과가 없습니다.');
        setResults([]);
      }
    });
  };

  const handlePlaceClick = (place) => {
    console.log('🖱️ 클릭한 장소:', place);
    setMarker(place);
    onSelectPlace && onSelectPlace(place);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ flex: '1' }}>
            <Input
              type="text"
              placeholder="예: 강남역"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <Button type="submit">검색</Button>
        </div>
      </form>

      <div
        ref={mapRef}
        style={{ width: '100%', height: '300px', marginTop: '20px' }}
      />

      {address && <p>📍 주소: {address}</p>}

      <h3 style={{ marginTop: '20px' }}>검색 결과</h3>
      {!keyword && results.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '220px',
          }}
        >
          검색어를 입력해주세요.
        </div>
      )}

      {results.length > 0 && (
        <ul
          style={{
            marginTop: 20,
            padding: 0,
            listStyle: 'none',
            maxHeight: '220px',
            overflowY: 'auto',
          }}
        >
          {results.map((place, index) => (
            <li
              key={place.id}
              onClick={() => handlePlaceClick(place)}
              style={{
                cursor: 'pointer',
                marginBottom: '8px',
                padding: '6px 10px',
                border: index === 0 ? '2px solid #4a90e2' : '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: index === 0 ? '#f0f8ff' : 'white',
              }}
            >
              {index + 1}. {place.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
