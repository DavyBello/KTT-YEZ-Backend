/* eslint-disable func-names */
const { Field: { Types }, List } = require('keystone');


/**
 * Post Model
 * ==========
 */

const Post = new List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
  title: { type: String, required: true },
  state: {
    type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true,
  },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 },
  },
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
  // isNotificationSent
  isNS: { type: Boolean, noedit: true, hidden: true },
});

Post.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

const { createNotification } = require('../lib/services');
const { BLOG_POST_NEW } = require('../lib/events');

// Model Hooks
Post.schema.pre('save', async function (next) {
  if (this.state === 'published' && !this.isNS) {
    await createNotification(BLOG_POST_NEW, this);
    this.isNS = true;
  }
  next();
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
