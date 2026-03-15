import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Philosophy from "@/components/Philosophy";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY, CONTACT_QUERY, TESTIMONIALS_QUERY, PHILOSOPHY_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 30;

export default async function Home() {
  const [homeData, contactData, testimonialsData, philosophyData] = await Promise.all([
    client.fetch(HOME_QUERY),
    client.fetch(CONTACT_QUERY),
    client.fetch(TESTIMONIALS_QUERY),
    client.fetch(PHILOSOPHY_QUERY)
  ]);

  return (
    <main>
      <Header />
      <Hero homeData={homeData} />
      <Philosophy data={philosophyData} />
      <SelectedWorks />
      <Services services={homeData?.services} />
      <Testimonials testimonials={testimonialsData} />
      <Contact contactData={contactData} />
    </main>
  );
}
