import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status_enum", ["draft", "published"]);
export const contactStatusEnum = pgEnum("contact_status_enum", ["unread", "read", "replied"]);
export const subscriberStatusEnum = pgEnum("subscriber_status_enum", [
  "pending",
  "confirmed",
  "unsubscribed",
]);

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  cover_image: text("cover_image"),
  status: statusEnum("status").notNull().default("draft"),
  published_at: timestamp("published_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
  meta_title: text("meta_title"),
  meta_description: text("meta_description"),
  meta_keywords: text("meta_keywords"),
  reading_time: integer("reading_time"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
});

export const post_categories = pgTable(
  "post_categories",
  {
    post_id: integer("post_id")
      .notNull()
      .references(() => posts.id),
    category_id: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (table) => [primaryKey({ columns: [table.post_id, table.category_id] })],
);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  cover_image: text("cover_image"),
  live_url: text("live_url"),
  github_url: text("github_url"),
  tech_stack: jsonb("tech_stack").notNull(),
  status: statusEnum("status").notNull().default("draft"),
  featured: boolean("featured").default(false).notNull(),
  sort_order: integer("sort_order").default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  client_name: text("name").notNull(),
  client_role: text("role").notNull(),
  client_company: text("company").notNull(),
  client_image: text("image"),
  quote: text("quote").notNull(),
  rating: integer("rating").notNull(),
  project_id: integer("project_id").references(() => projects.id),
  featured: boolean("featured").default(false).notNull(),
  status: statusEnum("status").notNull().default("draft"),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: contactStatusEnum("status").notNull().default("unread"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: subscriberStatusEnum("status").notNull().default("pending"),
  confirmation_token: text("confirmation_token"),
  confirmed_at: timestamp("confirmed_at"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ many }) => ({
  postCategories: many(post_categories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  postCategories: many(post_categories),
}));

export const projectsRelations = relations(projects, ({ many }) => ({
  testimonials: many(testimonials),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  project: one(projects, {
    fields: [testimonials.project_id],
    references: [projects.id],
  }),
}));

export const post_categoriesRelations = relations(post_categories, ({ one }) => ({
  post: one(posts, {
    fields: [post_categories.post_id],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [post_categories.category_id],
    references: [categories.id],
  }),
}));
