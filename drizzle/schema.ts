import type { StatusTasksT } from './types'
import { relations, sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
  
} from "drizzle-orm/sqlite-core";

// export const categories = sqliteTable(
//   "categories",
//   {
//     id: text("id").primaryKey(),
//     name: text("name"),
//     image: text("image"),
//   },
//   (categories) => ({
//     nameIdx: index("name_idx").on(categories.name),
//   })
// );

// export const categoriesRelations = relations(categories, ({ many }) => ({
//   products: many(products),
// }));

export const tasks = sqliteTable(
  "tasks",
  {
    id: integer('id').primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: text('status').notNull().default('todo').$type<StatusTasksT>(),
    createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
  },
);

// export const productsRelations = relations(products, ({ one }) => ({
//   user: one(categories, {
//     fields: [products.categoryId],
//     references: [categories.id],
//   }),
// }));

export const users = sqliteTable(
    "users",
    {
      id: integer('id').primaryKey(),
      firstName: text("firstName").notNull(),
      lastName: text("lastName").notNull(),
      email: text("email").notNull(),
      address: text("address"),
      phone: text("phone"),
      avatar: text("avatar"),
      createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
      updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
    },
    (users) => ({
      idIdx: uniqueIndex("id_idx").on(users.id),
    })
  );
  
  export const usersRelations = relations(users, ({ one, many }) => ({
    password: one(passwords, {
      fields: [users.id],
      references: [passwords.userId],
    }),
  }));
  
  export const passwords = sqliteTable("passwords", {
    hash: text("hash").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
  });
  
  export const passwordsRelations = relations(passwords, ({ one }) => ({
    user: one(users, {
      fields: [passwords.userId],
      references: [users.id],
    }),
  }));
  
  // export const cartItems = sqliteTable(
  //   "cart_items",
  //   {
  //     id: text("id").primaryKey(),
  //     count: integer("count").notNull().default(1),
  //     userId: text("user_id")
  //       .notNull()
  //       .references(() => users.id),
  //     productId: text("product_id")
  //       .notNull()
  //       .references(() => products.id),
  //     createdAt: integer("created_at").default(sql`(cast (unixepoch () as int))`),
  //     updatedAt: integer("updated_at").default(sql`(cast (unixepoch () as int))`),
  //   },
  //   (cartItems) => ({
  //     userIdProductIdx: uniqueIndex("cart_items_user_id_product_id_idx").on(
  //       cartItems.id
  //     ),
  //     productIdx: index("cart_items_product_id_idx").on(cartItems.productId),
  //   })
  // );