"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from './List.module.css';
import { get } from '../lib/apiUtil'
interface Item {
  id: number;
  item: string;
}

export default function List() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response =  await get<Item[]>( 'items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>This is list page</h1>
      <Link href="/" className={styles.link}>
        Go to Home Page
      </Link>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.item}>{item.item}</li>
        ))}
      </ul>
    </div>
  );
}