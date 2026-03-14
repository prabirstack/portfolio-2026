import Link from "next/link";
import { Container } from "../shared/container";
import { Button } from "../ui/button";
import { SubHeading } from "./sub-heading";
import { ScrollReveal } from "../animations/scroll-reveal";

export const CTASection = () => {
  return (
    <ScrollReveal className="py-32">
      <Container className="flex flex-col items-center justify-center">
        <SubHeading title="Let's build something great">
          Got a project in mind? I&apos;d love to hear about it.
        </SubHeading>

        <Button asChild variant={"secondary"} className="-mt-8">
          <Link href={"/contact"}>Get in touch</Link>
        </Button>
      </Container>
    </ScrollReveal>
  );
};
