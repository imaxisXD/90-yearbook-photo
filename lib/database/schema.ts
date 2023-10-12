import { text, timestamp, pgTable, serial, boolean } from 'drizzle-orm/pg-core';


export const photos = pgTable('photos', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    isFeatured: boolean('is_feat'),
    error: text('error'),
    inputImageUrl: text('input_image').notNull(),
    resultImageUrl: text('result_image').notNull()
});
