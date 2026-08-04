import ComingSoon from "@/components/ComingSoon";

// Any stray URL (old GoDaddy paths, indexed links) lands on the holding page
// rather than a bare 404.
export default function NotFound() {
  return <ComingSoon />;
}
