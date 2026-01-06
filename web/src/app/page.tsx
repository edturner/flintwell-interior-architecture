import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import NavigationMenu from "@/components/NavigationMenu";
import SelectedWorks from "@/components/SelectedWorks";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <section className={styles.heroSection}>
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo.jpeg"
              alt="Flintwell Logo"
              width={100}
              height={40}
              className={styles.logo}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <NavigationMenu />
        </header>

        <div className={styles.centerContent}>
          <h1 className={styles.title}>FLINTWELL</h1>
          <p className={styles.subtitle}>Interior Architecture</p>
          <p className={styles.description}>
            Driven by creativity, we design with purpose—crafting spaces that are both ergonomically refined and visually striking. We work closely with developers and architects to collaboratively achieve beautiful standards of living.
          </p>

          <div className={styles.floatingImageContainer}>
            <Image
              src="/hero-main.jpeg"
              alt="Flintwell Architecture"
              width={400}
              height={300}
              className={styles.floatingImage}
              priority
            />
          </div>
        </div>

        <div className={styles.footerAction}>
          <Link href="#contact" className={styles.startProject}>
            [ START YOUR PROJECT -&gt; ]
          </Link>
        </div>
      </section>

      <Services />
      <SelectedWorks />
      <Contact />
    </main>
  );
}
