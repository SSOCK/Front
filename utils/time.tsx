export function getPostTime(timeString: string) {
  let diff = Math.floor(
    (Date.now() - Date.parse(timeString) - 1000 * 60 * 60 * 9) / 1000
  ); // 데베랑 시간대가 다름
  if (diff < 60) return `${diff}초 전`;
  diff = Math.floor(diff / 60);
  if (diff < 60) return `${diff}분 전`;
  diff = Math.floor(diff / 60);
  if (diff < 24) return `${diff}시간 전`;
  diff = Math.floor(diff / 24);
  if (diff < 30) return `${diff}일 전`;
  diff = Math.floor(diff / 30);
  if (diff < 12) return `${diff}개월 전`;
  diff = Math.floor(diff / 12);
  return `${diff}년 전`;
}
