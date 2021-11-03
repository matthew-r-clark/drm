import CircularProgress from '@material-ui/core/CircularProgress';
import { signIn, useSession } from 'next-auth/client'

export default function Auth({children}) {
  const [ session, loading ] = useSession()

  if (!session && loading) {
    return <CircularProgress />
  }
  if (!session) {
    signIn()
    return null
  }
  return children
}
