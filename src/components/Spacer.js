export default function Spacer({ height, width }) {
  return (
    <div
      style={{
        height: height ? `${height}px` : '100%',
        width: width ? `${width}px` : '100%',
      }}
    />
  );
}
