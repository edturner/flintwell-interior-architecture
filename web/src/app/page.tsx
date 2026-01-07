import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY, CONTACT_QUERY, TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const [homeData, contactData, testimonialsData] = await Promise.all([
    client.fetch(HOME_QUERY),
    client.fetch(CONTACT_QUERY),
    client.fetch(TESTIMONIALS_QUERY)
  ]);

  return (
    <main>
      <Header />
      <Hero homeData={homeData} />
      <SelectedWorks />
      <Services services={homeData?.services} />
      <Testimonials testimonials={testimonialsData} />
      <Contact contactData={contactData} />
    </main>
  );
}
