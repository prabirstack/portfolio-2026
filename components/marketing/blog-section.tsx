import { StaggeredList, StaggerItem } from "../animations/staggered-list";
import { Container } from "../shared/container";
import { BlogCard, type BlogCardProps } from "./blog-card";
import { SubHeading } from "./sub-heading";

const posts: BlogCardProps[] = [
  {
    title: "Why I Ditched Templates and Built My Portfolio from Scratch",
    excerpt:
      "How building everything yourself forces you to actually learn and why that matters more than shipping fast.",
    date: "Coming soon",
    slug: "built-from-scratch",
  },
  {
    title: "The Stack That Lets Me Move Fast Without Breaking Things",
    excerpt:
      "Next.js, TypeScript, Tailwind, tRPC, why this combination is my secret weapon for freelance projects.",
    date: "Coming soon",
    slug: "my-stack",
  },
  {
    title: "20 Years of Business Taught Me One Thing About Design",
    excerpt:
      "Pretty doesn't convert. Intentional does. Here's how I approach every design decision.",
    date: "Coming soon",
    slug: "design-lessons",
  },
];

export const BlogSection = () => {
  return (
    <section className="py-24">
      <Container>
        <SubHeading title="Latest from the blog">
          Lessons from the trenches. On code, design, and building products that last.
        </SubHeading>

        <StaggeredList className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <BlogCard {...post} />
            </StaggerItem>
          ))}
        </StaggeredList>
      </Container>
    </section>
  );
};
