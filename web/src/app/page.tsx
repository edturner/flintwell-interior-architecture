import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SelectedWorks from "@/components/SelectedWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { client } from "@/sanity/lib/client";
import {
  HOME_QUERY,
  ABOUT_QUERY,
  PROJECTS_QUERY,
  TESTIMONIALS_QUERY,
  CONTACT_QUERY,
} from "@/sanity/lib/queries";

export const revalidate = 30;

export default async function Home() {
  const [homeData, aboutData, projects, testimonials, contactData] = await Promise.all([
    client.fetch(HOME_QUERY),
    client.fetch(ABOUT_QUERY),
    client.fetch(PROJECTS_QUERY),
    client.fetch(TESTIMONIALS_QUERY),
    client.fetch(CONTACT_QUERY),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero homeData={homeData} />
        <About data={aboutData} />
        <SelectedWorks projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Contact contactData={contactData} />
      </main>
    </>
  );
}
