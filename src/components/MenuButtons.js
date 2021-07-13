import Link from 'next/link';
import {
  Button,
  List,
  ListItem,
} from '@material-ui/core';

// later will dynamically get userId from auth
const userId = 'qui-gonj';

export default function MenuButtons({ toggleMenu }) {
  return (
  // <List>
  //   <ListItem>
  //     <Link href={`/${userId}/prospects`}>
  //       <Button onClick={toggleMenu}>
  //         Prospects
  //       </Button>
  //     </Link>
  //   </ListItem>
  //   <ListItem>
  //     <Link href={`/${userId}/pledges`}>
  //       <Button onClick={toggleMenu}>
  //         Pledges
  //       </Button>
  //     </Link>
  //   </ListItem>
  //   <ListItem>
  //     <Link href="/ministry-partners">
  //       <Button onClick={toggleMenu}>
  //         Partners
  //       </Button>
  //     </Link>
  //   </ListItem>
  //   <ListItem>
  //     <Link href="/ministers">
  //       <Button onClick={toggleMenu}>
  //         Ministers
  //       </Button>
  //     </Link>
  //   </ListItem>
  // </List>

    <List>
      <ListItem>
        <Link href={`/${userId}/prospects`}>
          <Button onClick={toggleMenu}>
            Prospects
          </Button>
        </Link>
      </ListItem>
      <ListItem>
        <Link href={`/${userId}/pledges`}>
          <Button onClick={toggleMenu}>
            Pledges
          </Button>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/ministry-partners">
          <Button onClick={toggleMenu}>
            Partners
          </Button>
        </Link>
      </ListItem>
      <ListItem>
        <Link href="/ministers">
          <Button onClick={toggleMenu}>
            Ministers
          </Button>
        </Link>
      </ListItem>
    </List>
  );
}
