// getRegion.js
export function splitAddressAndPhone(addressPhone) {
  if (!addressPhone || typeof addressPhone !== 'string') {
    return {
      address: '정보 없음',
      phone: '정보 없음',
      region1: '정보 없음',
      region2: '정보 없음'
    };
  }

  const normalized = addressPhone.replace(/（/g, '(').replace(/）/g, ')');
  const phoneMatch = normalized.match(/\((.*?)\)/);
  const phone = phoneMatch ? phoneMatch[1].trim() : '정보 없음';
  const address = normalized.replace(/\(.*?\)/, '').trim() || '정보 없음';

  // 시/도, 시/군/구 추출
  const addressParts = address.split(' ');
  const region1 = addressParts[0] || '정보 없음'; // 예: 서울특별시
  const region2 = addressParts[1] || '정보 없음'; // 예: 강남구

  return {
    address,
    phone,
    region1,
    region2
  };
}
