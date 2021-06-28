import { useRouter } from 'next/router';

export default function Pledges() {
  const router = useRouter();
  const { userId } = router.query;
  return <p>Pledges for {userId}</p>;
}
