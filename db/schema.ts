import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { randomUUID } from "crypto";
const id = () =>
  text("id")
    .primaryKey()
    .$default(() => randomUUID());

const createdAt = () =>
  text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull();

export const users = sqliteTable("users", {
  id: id(),
  createdAt: createdAt(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
});

const userRelations = relations(users, ({ many }) => ({
  application: many(application),
}));

export const application = sqliteTable("application", {
  appId: id(),
  stage: text("stage").notNull(),
  companyName: text("companyName").notNull(),
  position: text("position").notNull(),
  day: text("day").notNull(),
  link: text("link").notNull(),
  userId: text("userId").notNull(),
});

export const applicationRelations = relations(application, ({ one }) => ({
  author: one(users, {
    fields: [application.userId],
    references: [users.id],
  }),
}));
