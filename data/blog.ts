import { BlogCategory, BlogPost } from "@/types/blog";

export const sampleBlogCategories: BlogCategory[] = [
  {
    id: 1,
    name: "News",
    slug: "news",
    description: "Latest announcements and updates from Mobile Point.",
  },
  {
    id: 2,
    name: "Guides",
    slug: "guides",
    description: "How-to guides and buying advice for your next gadget.",
  },
  {
    id: 3,
    name: "Reviews",
    slug: "reviews",
    description: "Hands-on reviews of the newest phones and accessories.",
  },
];

export const sampleBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top 10 Smartphones to Buy in 2026",
    slug: "top-10-smartphones-2026",
    excerpt:
      "From flagship powerhouses to budget champions, here are the best phones you can grab this year.",
    content:
      "<p>Choosing a new smartphone in 2026 can feel overwhelming. With so many launches, we narrowed it down to ten standouts across every budget.</p><h2>Flagship Picks</h2><p>The latest flagships deliver blistering performance, refined cameras, and all-day batteries. If you want the best of the best, start here.</p><h2>Best Value</h2><p>Mid-range devices now offer features that used to be reserved for premium models — 120Hz displays, fast charging, and capable cameras.</p><ul><li>Great cameras</li><li>Long software support</li><li>Reliable batteries</li></ul>",
    featured_image: null,
    author: { id: 1, name: "Aarav Sharma", avatar: null },
    category: sampleBlogCategories[2],
    tags: ["smartphones", "buying-guide"],
    published_at: "2026-01-12T10:00:00Z",
    created_at: "2026-01-12T10:00:00Z",
    updated_at: "2026-01-12T10:00:00Z",
    is_published: true,
    views: 1240,
  },
  {
    id: 2,
    title: "How to Extend Your Phone's Battery Life",
    slug: "extend-phone-battery-life",
    excerpt:
      "Simple, proven habits that keep your battery healthy and your phone running longer every day.",
    content:
      "<p>Battery anxiety is real. The good news is a few small changes go a long way.</p><h2>Manage Background Activity</h2><p>Limit location access and background refresh for apps you rarely use.</p><h2>Charge Smart</h2><p>Keep your charge between 20% and 80% when possible and avoid extreme heat.</p>",
    featured_image: null,
    author: { id: 2, name: "Sita Rai", avatar: null },
    category: sampleBlogCategories[1],
    tags: ["battery", "tips"],
    published_at: "2026-02-03T09:30:00Z",
    created_at: "2026-02-03T09:30:00Z",
    updated_at: "2026-02-03T09:30:00Z",
    is_published: true,
    views: 880,
  },
  {
    id: 3,
    title: "Mobile Point Opens Two New Stores",
    slug: "mobile-point-new-stores",
    excerpt:
      "We're expanding! Visit our newest locations for exclusive launch-day offers.",
    content:
      "<p>We're thrilled to announce two new Mobile Point stores opening this month. Expect hands-on demos, trade-in bonuses, and launch-day deals.</p><h2>Where to Find Us</h2><p>Both locations feature full experience zones and a dedicated service desk.</p>",
    featured_image: null,
    author: { id: 3, name: "Mobile Point Team", avatar: null },
    category: sampleBlogCategories[0],
    tags: ["store", "announcement"],
    published_at: "2026-02-20T12:00:00Z",
    created_at: "2026-02-20T12:00:00Z",
    updated_at: "2026-02-20T12:00:00Z",
    is_published: true,
    views: 540,
  },
  {
    id: 4,
    title: "5G Explained: What It Means for You",
    slug: "5g-explained",
    excerpt:
      "Faster speeds, lower latency, and new experiences. Here's what 5G actually changes.",
    content:
      "<p>5G is more than a speed bump. It enables cloud gaming, smoother video calls, and smarter connected devices.</p><h2>Is It Worth Upgrading?</h2><p>If your daily life involves streaming, gaming, or working on the go, 5G makes a noticeable difference.</p>",
    featured_image: null,
    author: { id: 1, name: "Aarav Sharma", avatar: null },
    category: sampleBlogCategories[1],
    tags: ["5g", "network"],
    published_at: "2026-03-05T08:00:00Z",
    created_at: "2026-03-05T08:00:00Z",
    updated_at: "2026-03-05T08:00:00Z",
    is_published: true,
    views: 1320,
  },
  {
    id: 5,
    title: "Best Budget Earbuds Under Rs. 3000",
    slug: "best-budget-earbuds",
    excerpt:
      "You don't need to spend a fortune for good sound. These earbuds prove it.",
    content:
      "<p>Affordable audio has come a long way. We tested the most popular budget earbuds for sound, fit, and call quality.</p><h2>Our Top Pick</h2><p>The winner balanced clear mids, decent bass, and reliable connectivity.</p>",
    featured_image: null,
    author: { id: 2, name: "Sita Rai", avatar: null },
    category: sampleBlogCategories[2],
    tags: ["audio", "earbuds"],
    published_at: "2026-03-18T11:15:00Z",
    created_at: "2026-03-18T11:15:00Z",
    updated_at: "2026-03-18T11:15:00Z",
    is_published: true,
    views: 760,
  },
  {
    id: 6,
    title: "How to Spot a Genuine Smartphone",
    slug: "spot-genuine-smartphone",
    excerpt:
      "Counterfeits are sneaky. Learn the red flags before you buy.",
    content:
      "<p>Buying from trusted sellers matters. Check IMEI, packaging, and warranty stickers to avoid fakes.</p><h2>Quick Checks</h2><ul><li>Verify IMEI on the brand's site</li><li>Inspect build quality</li><li>Confirm warranty registration</li></ul>",
    featured_image: null,
    author: { id: 3, name: "Mobile Point Team", avatar: null },
    category: sampleBlogCategories[0],
    tags: ["buying-guide", "safety"],
    published_at: "2026-04-02T07:45:00Z",
    created_at: "2026-04-02T07:45:00Z",
    updated_at: "2026-04-02T07:45:00Z",
    is_published: true,
    views: 990,
  },
];
