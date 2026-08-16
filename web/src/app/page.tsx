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
  SITE_DETAILS_QUERY,
} from "@/sanity/lib/queries";
import type {
  HomeData,
  AboutData,
  ProjectSummary,
  Testimonial,
  ContactData,
  SiteDetails,
} from "@/sanity/contentTypes";

export const revalidate = 3600;

export default async function Home() {
  const [homeData, aboutData, projects, testimonials, contactData, siteDetails] =
    await Promise.all([
      client.fetch<HomeData | null>(HOME_QUERY),
      client.fetch<AboutData | null>(ABOUT_QUERY),
      client.fetch<ProjectSummary[]>(PROJECTS_QUERY),
      client.fetch<Testimonial[]>(TESTIMONIALS_QUERY),
      client.fetch<ContactData | null>(CONTACT_QUERY),
      // Contact offers the email and phone as an alternative to the form —
      // they live on the footer document, same source the menu overlay uses.
      client.fetch<SiteDetails | null>(SITE_DETAILS_QUERY),
    ]);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero homeData={homeData} />
        <About data={aboutData} />
        <SelectedWorks
          projects={projects}
          limit={6}
          moreHref="/projects"
          swipeOnMobile
          cardOrigin="home"
        />
        <Testimonials testimonials={testimonials} />
        <Contact contactData={contactData} details={siteDetails} />
      </main>
    </>
  );
}
