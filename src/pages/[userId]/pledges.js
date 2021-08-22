import { useRouter } from 'next/router';

export default function Pledges() {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <h1 style={{ marginLeft: '1rem' }}>Pledges for {userId}</h1>
    </>
  );
}
