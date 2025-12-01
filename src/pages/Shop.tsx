import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, Play, Zap, ShieldCheck, Sparkles, BadgeCheck, Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImageForShop from '/src/assets/Maninfini Products Online Listing/heroimageforshop.png';

interface Product {
    id: string;
    title: string;
    subtitle: string;
    price: string;
    originalPrice?: string;
    description: string;
    image: string;
    video?: string;
    tags: string[];
    specs: string[];
    specifications: string[];
    keyFeatures: string[];
    perfectFor: string[];
}

const Shop = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

    const heroHighlights = [
        {
            icon: ShieldCheck,
            title: 'Certified A+ devices',
            description: '90-point quality check, data wipe, and sanitized finishes.',
        },
        {
            icon: Zap,
            title: 'Lightning-fast setup',
            description: 'Ready-to-ship configs tuned for performance and reliability.',
        },
        {
            icon: BadgeCheck,
            title: 'Pro support & warranty',
            description: 'Priority assistance, easy replacements, and honest pricing.',
        },
    ];

    const valueBadges = [
        { icon: Clock3, label: 'Dispatch under 24h' },
        { icon: Sparkles, label: 'Showroom-grade finish' },
        { icon: ShieldCheck, label: 'Pickup warranty' },
    ];

    useEffect(() => {
        const loadProducts = async () => {
            // Load all details.md files
            const modules = import.meta.glob('/src/assets/Maninfini Products Online Listing/*/details.md', { as: 'raw', eager: true });
            // Load all images
            const imageModules = import.meta.glob('/src/assets/Maninfini Products Online Listing/*/*.{png,jpg,jpeg,webp,avif}', { eager: true });
            // Load all videos
            const videoModules = import.meta.glob('/src/assets/Maninfini Products Online Listing/*/*.{mp4,webm}', { eager: true });

            const loadedProducts: Product[] = [];
            const brands = ['HP', 'Dell', 'Lenovo', 'ThinkPad', 'Surface', 'MacBook', 'Asus', 'Apple', 'Samsung', 'Acer', 'MSI'];

            for (const path in modules) {
                const content = modules[path] as string;
                const pathParts = path.split('/');
                const folderName = pathParts[pathParts.length - 2];

                const lines = content.split('\n').filter(line => line.trim() !== '');

                // --- Improved Title Extraction ---
                // 1. Look for a line containing a known brand
                let titleLine = lines.find(l => brands.some(b => l.toLowerCase().includes(b.toLowerCase())));

                // 2. If not found, check if first line is promotional, then take second
                if (!titleLine) {
                    const isPromotional = (l: string) => /DEAL|IMPORT|SALE|OFFER|HOT|BEST/i.test(l);
                    if (lines.length > 1 && isPromotional(lines[0])) {
                        titleLine = lines[1];
                    } else {
                        titleLine = lines[0];
                    }
                }

                // Clean title: remove emojis and surrounding non-word chars
                const title = titleLine?.replace(/^[^\w\d\s]+/, '').replace(/[^\w\d\s]+$/, '').trim() || folderName;

                // Extract Subtitle (often the line after title)
                const titleIndex = lines.indexOf(titleLine || '');
                let subtitle = '';
                if (titleIndex !== -1 && lines[titleIndex + 1]) {
                    subtitle = lines[titleIndex + 1].replace(/^[^\w\d\s]+/, '').trim();
                }

                // Extract Price
                const priceMatch = content.match(/Our [Pp]rice\s*:?\s*([₹\d,/-]+)/i);
                const price = priceMatch ? priceMatch[1] : 'Ask for Price';

                // Extract Original Price
                const originalPriceMatch = content.match(/Company [Pp]rice\s*:?\s*([₹\d,/-]+)/i);
                const originalPrice = originalPriceMatch ? originalPriceMatch[1] : undefined;

                // Find first image
                let image = '';
                for (const imgPath in imageModules) {
                    if (imgPath.includes(`/${folderName}/`)) {
                        // @ts-expect-error - Vite glob import
                        image = imageModules[imgPath].default;
                        break;
                    }
                }

                // Find video
                let video = undefined;
                for (const vidPath in videoModules) {
                    if (vidPath.includes(`/${folderName}/`)) {
                        // @ts-expect-error - Vite glob import
                        video = videoModules[vidPath].default;
                        break;
                    }
                }

                // Extract sections
                const extractSection = (startPattern: RegExp, endPatterns: RegExp[] = [], includeNonBulleted: boolean = false): string[] => {
                    const startIndex = lines.findIndex(l => startPattern.test(l));
                    if (startIndex === -1) return [];
                    
                    let endIndex = lines.length;
                    for (const endPattern of endPatterns) {
                        const foundIndex = lines.findIndex((l, i) => i > startIndex && endPattern.test(l));
                        if (foundIndex !== -1 && foundIndex < endIndex) {
                            endIndex = foundIndex;
                        }
                    }
                    
                    const sectionLines = lines.slice(startIndex + 1, endIndex);
                    const bulleted = sectionLines.filter(l => l.trim().match(/^[🔹✔•-]/)).map(l => l.replace(/^[🔹✔•-]\s*/u, '').trim());
                    if (bulleted.length > 0) return bulleted;
                    
                    if (includeNonBulleted) {
                        // Take the first non-empty line after header
                        const nonBulleted = sectionLines.find(l => l.trim() && !l.trim().match(/^[^🔹✔•-\w\d\s]/));
                        return nonBulleted ? [nonBulleted.trim()] : [];
                    }
                    
                    return [];
                };

                const specifications = extractSection(/Specifications?:|TOP\s+FEATURES?:|CONNECTIVITY\s+OPTIONS?:|ERGONOMIC\s+FEATURES?:/i, [/Key\s+(?:Highlights?|Features?):/i, /Perfect\s+For:/i, /Ideal\s+For:/i, /BEST\s+SUITED\s+FOR:/i]);
                let keyFeatures = extractSection(/Key\s+(?:Highlights?|Features?):|TOP\s+FEATURES?:/i, [/Perfect\s+For:/i, /Ideal\s+For:/i, /BEST\s+SUITED\s+FOR:/i]);
                let perfectFor = extractSection(/Perfect\s+For:/i, [], true) || extractSection(/Ideal\s+For:/i, [], true) || extractSection(/BEST\s+SUITED\s+FOR:/i, [], true);
                
                // If perfectFor not found separately, check if it's in keyFeatures
                if (perfectFor.length === 0) {
                    const perfectInKey = keyFeatures.filter(f => /perfect\s+for|ideal\s+for|best\s+suited\s+for/i.test(f));
                    if (perfectInKey.length > 0) {
                        perfectFor = perfectInKey.map(f => f.replace(/perfect\s+for|ideal\s+for|best\s+suited\s+for/i, '').trim()).filter(f => f);
                        keyFeatures = keyFeatures.filter(f => !/perfect\s+for|ideal\s+for|best\s+suited\s+for/i.test(f));
                    }
                }
                
                // If perfectFor not found separately, check if it's in keyFeatures
                if (perfectFor.length === 0) {
                    const perfectInKey = keyFeatures.filter(f => /perfect\s+for|ideal\s+for/i.test(f));
                    if (perfectInKey.length > 0) {
                        perfectFor = perfectInKey.map(f => f.replace(/perfect\s+for|ideal\s+for/i, '').trim()).filter(f => f);
                        keyFeatures = keyFeatures.filter(f => !/perfect\s+for|ideal\s+for/i.test(f));
                    }
                }

                // Fallback: if sections not found, use old method
                const specs = specifications.length > 0 ? specifications : lines.filter(l => l.trim().match(/^[🔹✔•-]/)).map(l => l.replace(/^[🔹✔•-]\s*/u, '').trim());
                const tags = specs.slice(0, 3);

                loadedProducts.push({
                    id: folderName,
                    title,
                    subtitle,
                    price,
                    originalPrice,
                    description: specs.join(' • '),
                    image,
                    video,
                    tags,
                    specs,
                    specifications,
                    keyFeatures,
                    perfectFor
                });
            }

            setProducts(loadedProducts);
        };

        loadProducts();
    }, []);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pb-20 lg:pb-0">
                {/* Hero Section */}
                <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pb-28 px-4">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,58,138,0.12),transparent_35%),radial-gradient(circle_at_18%_82%,rgba(249,115,22,0.12),transparent_32%)]" />
                        <div className="absolute right-8 top-0 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
                        <div className="absolute left-[-6rem] bottom-[-6rem] h-96 w-96 rounded-full bg-accent/10 blur-[110px]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white to-white" />
                    </div>

                    <div className="container mx-auto max-w-7xl">
                        <div className="flex flex-wrap items-center justify-between gap-12 lg:gap-16">
                            {/* Hero Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="max-w-2xl space-y-7 text-center lg:text-left"
                            >
                                <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-4 py-2 text-sm shadow-card backdrop-blur">
                                    <Sparkles size={16} className="text-primary" />
                                    <span className="font-medium text-muted-foreground">New drop • Elevated refurbs</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-poppins leading-tight">
                                    Crafted tech that feels<br />
                                    <span className="bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent">new, cared for, and iconic.</span>
                                </h1>

                                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                    Curated laptops and devices that pass a meticulous 90-point check, detailed finishing, and modern configs. Luxury feel, transparent pricing, zero guesswork.
                                </p>

                                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                    <Button className="shadow-glow px-6 py-6 text-base" asChild>
                                        <a href="#catalog" className="flex items-center gap-2">
                                            Explore collection <ArrowRight size={16} />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" className="border border-border/70 px-6 py-6 text-base bg-white/60 hover:bg-primary/10" asChild>
                                        <Link to="/contact" className="flex items-center gap-2">
                                            Talk to an expert
                                            <Star size={16} className="text-accent" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                                    {heroHighlights.map((item, i) => (
                                        <div
                                            key={item.title}
                                            className="rounded-2xl border border-border/60 bg-white/70 backdrop-blur-lg p-4 shadow-card text-left"
                                            style={{ boxShadow: i === 0 ? '0 15px 45px -15px rgba(30,58,138,0.18)' : undefined }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                    <item.icon size={18} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Hero Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="flex-1 min-w-[320px] flex justify-center lg:justify-end"
                            >
                                <div className="relative w-full max-w-lg">
                                    <div className="absolute inset-[-10%] rounded-[28px] bg-gradient-to-br from-primary/10 via-white to-accent/10 blur-xl" />
                                    <div className="relative overflow-hidden rounded-[24px] border border-white/80 bg-white/80 backdrop-blur-xl shadow-2xl shadow-primary/15">
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(30,58,138,0.08),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(249,115,22,0.08),transparent_35%)]" />
                                        <img
                                            src={heroImageForShop}
                                            alt="Premium Tech Collection"
                                            className="relative z-10 w-full h-auto object-cover"
                                        />

                                        <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3 z-10">
                                            {[{
                                                title: 'Average savings',
                                                value: '₹18,000+',
                                                accent: 'from MRP',
                                            }, {
                                                title: 'Customer delight',
                                                value: '4.9/5',
                                                accent: 'post-delivery rating',
                                            }].map((stat) => (
                                                <div key={stat.title} className="rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-card">
                                                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-lg font-bold text-foreground">{stat.value}</span>
                                                        <span className="text-[11px] text-muted-foreground">{stat.accent}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute -left-6 top-10 rotate-[-6deg] rounded-2xl bg-gradient-to-r from-primary to-royal-blue-light px-4 py-3 text-white shadow-glow">
                                        <p className="text-sm font-semibold">Hand-detailed, showroom ready</p>
                                        <p className="text-xs text-white/80">Every unit photographed as-is</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Product Grid */}
                <section id="catalog" className="relative container mx-auto px-4 pb-32">
                    <div className="absolute inset-x-6 sm:inset-x-10 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_30%_0%,rgba(30,58,138,0.06),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(249,115,22,0.06),transparent_30%)]" />

                    <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-card">
                                <ShoppingBag size={20} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Curated drop</p>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins">Shop statement-making devices</h2>
                                <p className="text-muted-foreground max-w-2xl">
                                    Every listing is graded, retouched, and paired with specs that matter. Find your daily driver, creative powerhouse, or executive-ready machine without scrolling endlessly.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {valueBadges.map((item) => (
                                <div key={item.label} className="flex items-center gap-2 rounded-full border border-border/60 bg-white/70 px-3 py-2 text-sm text-foreground shadow-card backdrop-blur">
                                    <item.icon size={15} className="text-primary" />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                        {products.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                isHovered={hoveredProduct === product.id}
                                setHovered={setHoveredProduct}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

const ProductCard = ({ product, index, isHovered, setHovered }: { product: Product, index: number, isHovered: boolean, setHovered: (id: string | null) => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (isHovered && product.video && videoRef.current) {
            videoRef.current.play().catch(() => { });
        } else if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    }, [isHovered, product.video]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onMouseEnter={() => setHovered(product.id)}
            onMouseLeave={() => setHovered(null)}
            className="group relative"
        >
            <Link to={`/shop/${product.id}`} className="block h-full">
                <div className="relative h-full rounded-[22px] border border-border/60 bg-white/70 backdrop-blur-xl shadow-[0_18px_55px_-30px_rgba(30,58,138,0.45)] overflow-hidden transition-all duration-500 group hover:shadow-[0_28px_70px_-28px_rgba(30,58,138,0.55)]">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-white to-accent/10" />
                    <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                    {/* Image/Video Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary/40">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(30,58,138,0.12),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(249,115,22,0.12),transparent_32%)]" />

                        {/* Main Image */}
                        <img
                            src={product.image}
                            alt={product.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered && product.video ? 'opacity-0' : 'opacity-100'}`}
                        />

                        {/* Video Preview */}
                        {product.video && (
                            <video
                                ref={videoRef}
                                src={product.video}
                                muted
                                loop
                                playsInline
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            />
                        )}

                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-md shadow-sm">
                                A+ Condition
                            </Badge>
                            {product.originalPrice && (
                                <Badge variant="destructive" className="shadow-sm">
                                    Price drop
                                </Badge>
                            )}
                        </div>

                        {product.video && (
                            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-black/60 text-white px-3 py-1 text-xs shadow-lg backdrop-blur">
                                <Play size={14} />
                                <span>Live preview</span>
                            </div>
                        )}

                        {/* Hover Action */}
                        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="bg-white/90 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                View details <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative p-7 sm:p-8 flex flex-col flex-grow">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />

                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-2xl font-bold font-poppins text-foreground mb-1 leading-tight group-hover:text-primary transition-colors">
                                    {product.title}
                                </h3>
                                {product.subtitle && (
                                    <p className="text-sm text-muted-foreground line-clamp-1">{product.subtitle}</p>
                                )}
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">
                                <Star size={14} className="fill-primary/90" />
                                4.9
                            </div>
                        </div>

                        {/* Specs Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.specifications.slice(0, 3).map((spec, i) => (
                                <span key={i} className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground border border-border/50 shadow-[0_6px_16px_-12px_rgba(30,58,138,0.4)]">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        {/* Key Features */}
                        {product.keyFeatures.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                                <ul className="text-sm text-muted-foreground space-y-2">
                                    {product.keyFeatures.slice(0, 3).map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-primary/80" />
                                            <span className="line-clamp-1">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Perfect For */}
                        {product.perfectFor.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-foreground mb-2">Perfect For</h4>
                                <div className="flex flex-wrap gap-2">
                                    {product.perfectFor.slice(0, 2).map((item, i) => (
                                        <span key={i} className="text-xs rounded-full bg-primary/5 text-foreground px-3 py-1 border border-primary/20">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto flex items-end justify-between pt-6 border-t border-border/40">
                            <div>
                                {product.originalPrice && (
                                    <div className="text-sm text-muted-foreground line-through mb-1">
                                        {product.originalPrice}
                                    </div>
                                )}
                                <div className="relative">
                                    <div className="absolute -inset-3 rounded-full bg-primary/10 blur-md" />
                                    <div className="relative text-3xl font-bold text-primary tracking-tight">
                                        {product.price}
                                    </div>
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-card">
                                <ShoppingBag size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default Shop;
