import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './List.module.css';

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
    // const item: Item = {
    //     id: 1,
    //     item: "item 1"
    // }
    // setItems([item])
    try {
      const response = await axios.get<Item[]>('/api/items');
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