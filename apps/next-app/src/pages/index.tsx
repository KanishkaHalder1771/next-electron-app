"use client"

import styles from './Home.module.css';
import Link from 'next/link';

export default function Index() {
    return (
        <div className={styles.container}>
          <h1 className={styles.title}>This is the home page</h1>
          <ul className={styles.menu}>
            <li>
              <Link href="./stPage" className={styles.link}>
                Go to Static Page
              </Link>
            </li>
            <li>
              <Link href="./list" className={styles.link}>
                Go to List Page
              </Link>
            </li>
            <li>
              <Link href="./add" className={styles.link}>
                Go to Add Page
              </Link>
            </li>
          </ul>
        </div>
      );
}