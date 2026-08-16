import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this blog.'],
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug for this blog.'],
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content for this blog.'],
    },
    images: {
      type: [String],
      default: [],
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
