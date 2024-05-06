"use client"

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './Add.module.css';
import { post } from '../lib/apiUtil';

export default function Add() {
  const [item, setItem] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await post('items', {item});
      setItem('');
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Item</h1>
      <Link href="/" className={styles.link}>
        Go to Home Page
      </Link>
      <div className={styles.form}>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleSubmit} className={styles.button}>Add</button>
      </div>
    </div>
  );
}