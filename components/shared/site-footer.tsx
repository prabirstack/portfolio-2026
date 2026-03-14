import Link from "next/link";
import { Container } from "./container";
import { AvailabilityBadge } from "./availability-badge";
import { Socials } from "./socials";

export const SiteFooter = () => {
  return (
    <footer className="border-t py-12">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* left side */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-bold">Prabir Singh</h3>
            <AvailabilityBadge />
          </div>
          <p className="text-sm text-muted-foreground">
            Developer and designer crafting modern web and mobile experiences.
          </p>
        </div>
        {/* right side */}
        <div className="flex flex-col gap-2 md:items-end">
          <ul className="flex flex-col gap-2 md:flex-row md:gap-6">
            <li>
              <Link
                href="/work"
                className="text-sm text-muted-foreground hover:text-foreground
  transition-colors"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground
  transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground
  transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground
  transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t mt-8 pt-8 text-sm text-muted-foreground">
        <Container className="flex items-center justify-between">
          <p>© {new Date().getFullYear()} Prabir Singh. All rights reserved.</p>
          <Socials />
        </Container>
      </div>
    </footer>
  );
};
