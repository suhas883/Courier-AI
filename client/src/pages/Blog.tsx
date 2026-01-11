import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { BookOpen, Calendar, Clock, ArrowLeft, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "how-package-tracking-works",
    title: "How Package Tracking Actually Works: A Complete Guide",
    excerpt: "Ever wondered how your tracking number reveals your package's journey? Learn the technology behind global logistics tracking systems.",
    content: `Package tracking has revolutionized how we ship and receive goods. But how does it actually work? Let's dive deep into the technology that powers modern logistics.

**The Basics of Tracking Numbers**

Every tracking number is a unique identifier assigned to your package when it enters the carrier's system. This number links to a digital record that gets updated at every scan point along the delivery route.

Major carriers like UPS, FedEx, and DHL use different formats:
- UPS: 1Z followed by 16 alphanumeric characters
- FedEx: 12 to 22 digits
- USPS: 20-22 digits for domestic packages
- DHL: 10 digits typically

**Scan Points and Updates**

Your package gets scanned at multiple points:
1. **Pickup/Origin Scan**: When the carrier first receives your package
2. **Facility Scans**: At sorting centers and distribution hubs
3. **Transit Scans**: During transportation between facilities
4. **Out for Delivery**: When loaded onto the delivery vehicle
5. **Delivered**: Final confirmation of delivery

**API Integration**

Modern tracking platforms like LiveTrackings.com use APIs (Application Programming Interfaces) to fetch real-time data directly from carrier systems. This allows us to aggregate tracking information from over 1,500 carriers worldwide into a single, unified interface.

**AI Enhancement**

Advanced platforms now use AI to analyze tracking patterns and provide:
- Delivery predictions based on historical data
- Weather impact assessments
- Delay risk analysis
- Smart recommendations for receivers

Understanding how tracking works helps you better interpret status updates and manage your delivery expectations.`,
    author: "Logistics Team",
    authorRole: "Shipping Experts",
    date: "January 2026",
    readTime: "5 min read",
    category: "Education"
  },
  {
    id: "reduce-shipping-delays",
    title: "5 Proven Ways to Reduce Shipping Delays for Your Packages",
    excerpt: "Shipping delays can be frustrating. Learn expert strategies to minimize delays and ensure faster delivery of your important packages.",
    content: `Shipping delays are one of the most common frustrations for both senders and receivers. Based on our experience tracking millions of packages, here are proven strategies to minimize delays.

**1. Choose the Right Carrier for Your Route**

Not all carriers perform equally on every route. Some excel in certain regions:
- USPS: Best for residential deliveries in the US
- UPS/FedEx: Reliable for business addresses and time-sensitive shipments
- DHL: Strong international network, especially Europe and Asia
- Regional carriers: Often faster for local deliveries

**2. Ship Early in the Week**

Packages shipped Monday-Wednesday typically experience fewer delays than those shipped Thursday-Friday. Weekend backlogs can slow down Friday shipments.

**3. Verify Address Accuracy**

Address errors cause significant delays:
- Include apartment/unit numbers
- Use standard abbreviations
- Add phone numbers for delivery contact
- Include ZIP+4 codes when possible

**4. Consider Weather and Seasonal Factors**

Plan around known delay periods:
- Holiday shopping seasons (November-December)
- Severe weather events
- Major carrier-specific blackout dates

**5. Use Tracking Actively**

Don't just track once. Monitor your package regularly to:
- Catch delivery attempts you might miss
- Identify problems early
- Contact carrier proactively if issues arise

At LiveTrackings.com, our AI analyzes these factors to give you delay risk assessments, helping you anticipate and plan around potential issues.`,
    author: "Supply Chain Analyst",
    authorRole: "Industry Expert",
    date: "January 2026",
    readTime: "4 min read",
    category: "Tips"
  },
  {
    id: "international-shipping-guide",
    title: "The Ultimate Guide to International Package Tracking",
    excerpt: "Tracking international shipments can be confusing with multiple carriers involved. Here's everything you need to know about cross-border tracking.",
    content: `International shipping involves multiple carriers, customs clearance, and varying tracking visibility. Here's your comprehensive guide to understanding international package tracking.

**Understanding Multi-Carrier Handoffs**

International packages often pass through multiple carriers:
1. **Origin Carrier**: Picks up and transports to export facility
2. **Customs/Export**: Cleared for international transit
3. **Line-Haul Carrier**: Transports between countries (often airlines)
4. **Import Customs**: Cleared at destination country
5. **Last-Mile Carrier**: Delivers to final address

Each handoff can create tracking gaps as systems don't always communicate seamlessly.

**Common International Tracking Challenges**

- **Tracking blackouts**: 2-5 days without updates during international transit is normal
- **Customs delays**: Random inspections can add 1-7 days
- **Different carrier systems**: Tracking may switch to local carrier's website
- **Time zone confusion**: Timestamps may reflect different time zones

**Tips for Better International Tracking**

1. **Save all tracking numbers**: You may receive multiple numbers for the same package
2. **Use aggregator services**: Platforms like LiveTrackings.com combine data from 1,500+ carriers
3. **Understand customs**: Have documentation ready; commercial invoices speed clearance
4. **Be patient**: International shipping naturally takes longer

**Major International Carriers**

- **DHL Express**: Excellent global coverage, real-time tracking
- **FedEx International**: Strong in Americas and Europe
- **UPS Worldwide**: Reliable with detailed tracking
- **China Post/ePacket**: Budget option from China, slower but trackable
- **Royal Mail**: Good for UK shipments

Our AI can help predict delivery windows even when tracking shows limited updates during international transit.`,
    author: "Global Shipping Expert",
    authorRole: "International Trade Specialist",
    date: "January 2026",
    readTime: "6 min read",
    category: "Guide"
  },
  {
    id: "ai-delivery-predictions",
    title: "How AI is Revolutionizing Package Delivery Predictions",
    excerpt: "Artificial intelligence is transforming logistics. Discover how AI-powered tracking provides more accurate delivery estimates than ever before.",
    content: `Traditional delivery estimates from carriers are often inaccurate. AI is changing that by analyzing patterns humans can't see. Here's how AI is revolutionizing package tracking.

**The Problem with Traditional Estimates**

Carrier-provided estimates are typically based on:
- Standard transit times
- Service level selected
- Distance between origin and destination

These estimates don't account for:
- Current weather conditions
- Seasonal volume surges
- Carrier capacity constraints
- Historical performance on specific routes

**How AI Predictions Work**

AI-powered platforms like LiveTrackings.com use machine learning to analyze:

1. **Historical Data**: Millions of past deliveries reveal patterns
2. **Real-Time Conditions**: Current weather, traffic, and carrier status
3. **Route Analysis**: Performance varies by origin-destination pairs
4. **Carrier Patterns**: Each carrier has predictable behaviors

**What AI Can Predict**

- **Delivery Windows**: More accurate than carrier estimates
- **Delay Risk**: Probability of delays before they happen
- **Weather Impact**: How conditions affect your specific route
- **Optimal Timing**: Best times to expect delivery

**The Technology Behind It**

Modern AI tracking uses:
- **Natural Language Processing**: Understanding tracking status updates
- **Pattern Recognition**: Identifying delay indicators
- **Real-Time Data Integration**: Weather APIs, traffic data, carrier feeds
- **Continuous Learning**: Improving predictions with each package tracked

**Limitations to Understand**

AI predictions are estimates, not guarantees. Unexpected events like:
- Vehicle breakdowns
- Severe weather events
- Customs issues
- Address problems

...can still cause deviations. However, AI predictions are significantly more accurate than traditional estimates in most cases.

At LiveTrackings.com, we use Google's Gemini AI to provide these intelligent predictions while being transparent that official carrier data remains the final authority.`,
    author: "AI Research Team",
    authorRole: "Machine Learning Specialists",
    date: "January 2026",
    readTime: "5 min read",
    category: "Technology"
  },
  {
    id: "carrier-comparison-guide",
    title: "UPS vs FedEx vs USPS vs DHL: Which Carrier is Best for You?",
    excerpt: "Choosing the right carrier can save money and ensure faster delivery. Compare the major carriers to find the best option for your shipping needs.",
    content: `Each major carrier has strengths and weaknesses. Here's an honest comparison based on real tracking data and user experiences.

**UPS (United Parcel Service)**

**Strengths:**
- Reliable for business deliveries
- Excellent tracking accuracy
- Strong ground network in US
- Good for heavy packages

**Weaknesses:**
- Higher residential delivery fees
- Strict dimensional weight pricing
- Limited Saturday delivery

**Best for:** B2B shipments, heavy packages, reliable timing

---

**FedEx**

**Strengths:**
- Fast express options
- Strong international network
- Good for time-critical shipments
- Reliable overnight service

**Weaknesses:**
- Can be expensive
- Ground service less consistent than UPS
- Complex pricing structure

**Best for:** Urgent shipments, express delivery, important documents

---

**USPS (US Postal Service)**

**Strengths:**
- Lowest rates for small packages
- Delivers to every US address
- No residential surcharges
- Flat rate options

**Weaknesses:**
- Slower transit times
- Less reliable tracking updates
- No guaranteed delivery times (except Express Mail)

**Best for:** Lightweight packages, residential deliveries, budget shipping

---

**DHL**

**Strengths:**
- Best international coverage
- Excellent tracking for global shipments
- Strong in Europe and Asia
- Customs expertise

**Weaknesses:**
- Limited US domestic options
- Can be expensive
- Fewer drop-off locations in US

**Best for:** International shipments, especially to Europe and Asia

---

**How to Choose**

Consider:
1. **Destination**: Residential vs. business address
2. **Speed**: How urgent is delivery?
3. **Package Size**: Weight and dimensions
4. **Budget**: Compare actual quotes
5. **Tracking Needs**: How important is real-time visibility?

At LiveTrackings.com, we track all these carriers and more, giving you unified visibility regardless of which carrier you choose.`,
    author: "Shipping Comparison Team",
    authorRole: "Carrier Analysis Experts",
    date: "January 2026",
    readTime: "7 min read",
    category: "Comparison"
  }
];

function BlogList() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link href="/" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2">
          <span data-testid="link-back-home">Back to Home</span>
        </Link>

        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4" data-testid="text-page-title">Shipping Insights Blog</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expert guides, tips, and insights to help you navigate the world of package tracking and shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-blog-${post.id}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                    <span className="mx-2">|</span>
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogPostView({ postId }: { postId: string }) {
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Article Not Found</h2>
            <Link href="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/blog" className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span data-testid="link-back-blog">Back to Blog</span>
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-4" data-testid="text-article-title">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
                <span className="text-sm">({post.authorRole})</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </header>

          <Card>
            <CardContent className="py-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h2 key={index} className="text-xl font-semibold mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                    return (
                      <ul key={index} className="list-disc list-inside text-muted-foreground space-y-1 my-4">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace(/^- /, '').replace(/\*\*/g, '')}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('1. ')) {
                    const items = paragraph.split('\n').filter(line => /^\d+\. /.test(line));
                    return (
                      <ol key={index} className="list-decimal list-inside text-muted-foreground space-y-1 my-4">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace(/^\d+\. /, '').replace(/\*\*/g, '')}</li>
                        ))}
                      </ol>
                    );
                  }
                  if (paragraph === '---') {
                    return <hr key={index} className="my-6" />;
                  }
                  return (
                    <p key={index} className="text-muted-foreground leading-relaxed my-4">
                      {paragraph.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                      )}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="py-6">
                <h3 className="text-xl font-semibold mb-3">Track Your Package Now</h3>
                <p className="text-muted-foreground mb-4">
                  Use our AI-powered tracking to monitor shipments from 1,500+ carriers.
                </p>
                <Link href="/">
                  <Button data-testid="button-track-now">Start Tracking</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </article>
      </div>
    </div>
  );
}

export default function Blog() {
  const [match, params] = useRoute("/blog/:postId");
  
  if (match && params?.postId) {
    return <BlogPostView postId={params.postId} />;
  }
  
  return <BlogList />;
}
