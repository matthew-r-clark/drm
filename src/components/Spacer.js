export default function Spacer ({height, width}) {
  height = height ? `${height}px` : '100%';
  width  = width  ? `${width}px`  : '100%';
  return (
    <div style={{
      height,
      width,
    }} />
  );
};