import { Container } from "@/components/shared/container";
import { SubHeading } from "@/components/marketing/sub-heading";
import { TestimonialCard, type TestimonialCardProps } from "@/components/marketing/testimonial-card";

const testimonials: TestimonialCardProps[] = [
  {
    quote:
      "Working with Prabir transformed our product launch. Results exceeded every metric we set.",
    name: "—",
    role: "Founder",
    company: "Stealth Startup",
    rating: 5,
  },
  {
    quote:
      "Rare combination of design taste and technical depth. Shipped in half the time we expected.",
    name: "—",
    role: "CTO",
    company: "SaaS Company",
    rating: 5,
  },
  {
    quote:
      "Prabir doesn't just build — he thinks like a strategist. Our conversions doubled in 8 weeks.",
    name: "—",
    role: "CEO",
    company: "E-commerce Brand",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24">
      <Container>
        <SubHeading title="Client Stories">
          The work speaks first. The people behind it speak next.
        </SubHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* testimonials card */}
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.quote} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
};
