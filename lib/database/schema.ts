import { text, timestamp, pgTable, serial } from 'drizzle-orm/pg-core';


export const photoTable = pgTable('photos', {
    id: serial('id').primaryKey(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    error: text('error'),
    inputImageUrl: text('input_image').notNull(),
    resultImageUrl: text('result_image'),
    imageId: text('image_id').notNull()
});
