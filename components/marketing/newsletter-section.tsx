import { Container } from "../shared/container";
import { SubHeading } from "./sub-heading";

export const NewsletterSection = () => {
  return (
 <section className="py-24">
    <Container>
      <div className="rounded-2xl bg-muted/30 border border-border/50 p-12 text-center">
        <SubHeading title="Stay in the loop">
          One email when something worth reading drops. No spam. Unsubscribe anytime.
        </SubHeading>
        <div>{/* TODO: NewsletterForm */}</div>
      </div>
    </Container>
  </section>
  );
};
