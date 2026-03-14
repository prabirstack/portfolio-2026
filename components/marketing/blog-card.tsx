import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export const BlogCard = ({ title, excerpt, date, slug }: BlogCardProps) => {
  return (
    <Link href={`/blog/${slug}`} className="group block">
    <article className="relative p-8 rounded-2xl border border-border/50 bg-card/50
      backdrop-blur-sm overflow-hidden transition-all duration-500
      hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5
        via-transparent to-transparent opacity-0 group-hover:opacity-100
        transition-opacity duration-700" />

      {/* Date — small, uppercase, tracked */}
      <span className="relative text-xs uppercase tracking-widest text-primary/60 font-medium">
        {date}
      </span>

      {/* Title — large, bold, transitions color on hover */}
      <h3 className="relative text-xl font-semibold mt-3 mb-3
        group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>

      {/* Excerpt */}
      <p className="relative text-sm text-muted-foreground leading-relaxed">
        {excerpt}
      </p>

      {/* Divider */}
      <div className="h-px bg-border/50 my-6" />

      {/* Read link with arrow that slides right on hover */}
      <span className="relative inline-flex items-center gap-2 text-sm font-medium
        text-primary/70 group-hover:text-primary transition-colors">
        Read article
        <ArrowRight className="h-4 w-4 transition-transform duration-300
          group-hover:translate-x-1" />
      </span>
    </article>
  </Link>
  );
};
