import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum("user_system_enum", ["system", "user"]);

// export type DrizzleChat = typeof chats.$inferSelect;

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  userContent: text("user_content").notNull(),
  systemContent: text("system_content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type chatResponse = typeof messages.$inferSelect;

// drizzle-orm
// drizzle-kit
