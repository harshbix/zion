import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Minus } from 'lucide-react';
import { businessData } from '@/lib/data';

const featuredProducts = [
  {
    id: 'p1',
    name: 'Signature Cake',
    price: '45,000 TZS',
    description: 'A clean, premium cake with a balanced finish.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=1200&fit=crop',
  },
  {
    id: 'p2',
    name: 'Classic Vanilla',
    price: '40,000 TZS',
    description: 'Soft vanilla layers with a light, refined profile.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&h=1200&fit=crop',
  },
  {
    id: 'p3',
    name: 'Chocolate Velvet',
    price: '50,000 TZS',
    description: 'Rich chocolate depth with a smooth finish.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=1200&h=1200&fit=crop',
  },
  {
    id: 'p4',
    name: 'Seasonal Tart',
    price: '38,000 TZS',
    description: 'Fresh fruit, crisp edges, minimal presentation.',
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=1200&h=1200&fit=crop',
  },
];

export default function Home() {
  return (
    <main className="bg-white text-black">
      <section className="container-premium pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-3 border border-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-600">
              <Minus className="h-3 w-3 text-[#c77d2b]" />
              Premium cakes and bites
            </div>

            <h1 className="max-w-xl text-5xl font-semibold leading-[0.94] tracking-[-0.05em] text-black md:text-7xl">
              Minimal design.
              <br />
              Maximum appetite.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-neutral-600 md:text-lg">
              Clean, premium products made for fast browsing and effortless ordering.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-[#c77d2b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#b56d20]"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="border border-black/10 bg-neutral-50 p-4 sm:p-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <Image
                src="https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=1200&h=1500&fit=crop"
                alt="Signature collection"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 text-white">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                    Signature Collection
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    Built for premium moments.
                  </h2>
                </div>
                <div className="text-right text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Mbeya, Tanzania
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="border-t border-black/10 py-20 md:py-28">
        <div className="container-premium">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#c77d2b]">
                Featured products
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black md:text-4xl">
                Uniform, focused, easy to buy.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-neutral-600 md:text-right">
              A small selection of best sellers with clear pricing and one simple action.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <article key={product.id} className="group border border-black/10 bg-white">
                <div className="relative aspect-square overflow-hidden bg-neutral-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-[-0.03em] text-black">
                      {product.name}
                    </h3>
                    <span className="text-sm font-semibold text-black">{product.price}</span>
                  </div>

                  <p className="text-sm leading-6 text-neutral-600">{product.description}</p>

                  <a
                    href={businessData.contact.whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center border border-black px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-black hover:text-white"
                  >
                    Order now
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
