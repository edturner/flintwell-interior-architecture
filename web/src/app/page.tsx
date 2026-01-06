import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { client } from "@/sanity/lib/client";
import { HOME_QUERY, CONTACT_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export default async function Home() {
  const [homeData, contactData] = await Promise.all([
    client.fetch(HOME_QUERY),
    client.fetch(CONTACT_QUERY)
  ]);

  return (
    <main>
      <Header />
      <Hero homeData={homeData} />
      <SelectedWorks />
      <Services services={homeData?.services} />
      <Contact contactData={contactData} />
    </main>
  );
}
