import { useRouter } from 'next/router';

export default function Prospects() {
  const router = useRouter();
  const { userId } = router.query;
  return <p>Prospects for {userId}</p>;
}
