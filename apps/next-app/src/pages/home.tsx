import Link from 'next/link';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>This is the home page</h1>
      <ul className={styles.menu}>
         <li>
          <Link href="/nxHome" className={styles.link}>
            Go to NX Home Page
          </Link>
        </li>
        <li>
          <Link href="/list" className={styles.link}>
            Go to List Page
          </Link>
        </li>
        <li>
          <Link href="/add" className={styles.link}>
            Go to Add Page
          </Link>
        </li>
      </ul>
    </div>
  );
}

