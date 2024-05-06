"use client"

import styles from './Home.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Lis() {
    return (
        <div className={styles.container}>
          <h1 className={styles.title}>This is the Static page</h1>
          <Link href="/" className={styles.link}>
            Go to Home Page
          </Link>
          <h2 className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis dolor nec venenatis tempus. Cras mauris tortor, commodo sit amet est vitae, ullamcorper vestibulum lorem. Praesent interdum urna non leo vehicula tristique. Integer maximus pellentesque elit at pharetra. Vivamus gravida lacus a odio auctor, et ornare tellus posuere. Pellentesque non mattis odio. Quisque nec gravida quam. Nullam convallis varius odio, at vestibulum eros vestibulum non. Praesent id ornare felis.
          </h2>
          <div>
            <Image
              src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Frqmyy8g9dtyjap74tc34.png"
              alt="My Image"
              width={800}
              height={500}
            />
          </div>
        </div>
      );
}