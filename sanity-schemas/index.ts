// Sanity Schema Index
// Copy this file to your Sanity Studio: studio/schemas/index.ts

import blogPost from './blogPost';
import author from './author';
import category from './category';
import tag from './tag';

export const schemaTypes = [blogPost, author, category, tag];
