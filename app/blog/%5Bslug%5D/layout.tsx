import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found',
      description: 'The journal article you are looking for does not exist.',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://zioncakesandbites.co.tz/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Zion Journal`,
      description: post.excerpt,
      url: `https://zioncakesandbites.co.tz/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image, width: 600, height: 400, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Zion Journal`,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogSlugLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
