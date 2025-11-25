import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, Play, Zap, ShieldCheck } from 'lucide-react';
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
                <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background -z-10" />
                    <div className="container mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Hero Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-center lg:text-left"
                            >
                                <Badge variant="outline" className="mb-6 px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5 backdrop-blur-sm">
                                    Maninfini Exclusive Collection
                                </Badge>
                                <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-poppins bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                                    Premium Tech.<br />Unbeatable Value.
                                </h1>
                                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                    Experience the perfect blend of performance and aesthetics.
                                    Our curated selection of A+ condition devices delivers flagship power at a fraction of the cost.
                                </p>
                            </motion.div>

                            {/* Hero Image */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                                className="flex justify-center lg:justify-end"
                            >
                                <div className="relative">
                                    <img
                                        src={heroImageForShop}
                                        alt="Premium Tech Collection"
                                        className="w-full max-w-md lg:max-w-lg h-auto rounded-2xl shadow-2xl shadow-primary/20"
                                    />
                                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl -z-10" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Product Grid */}
                <section className="container mx-auto px-4 pb-32">
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
                <div className="relative h-full bg-card rounded-[2rem] overflow-hidden border border-border/40 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col">

                    {/* Image/Video Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
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

                        {/* Overlays */}
                        <div className="absolute top-4 left-4 flex gap-2">
                            <Badge className="bg-white/90 text-black hover:bg-white backdrop-blur-md shadow-sm">
                                A+ Condition
                            </Badge>
                            {product.originalPrice && (
                                <Badge variant="destructive" className="shadow-sm">
                                    Sale
                                </Badge>
                            )}
                        </div>

                        {/* Hover Action */}
                        <div className={`absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <div className="bg-white/90 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                View Details <ArrowRight size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow relative">
                        {/* Decorative gradient blob */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />

                        <div className="mb-4">
                            <h3 className="text-2xl font-bold font-poppins text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                                {product.title}
                            </h3>
                            {product.subtitle && (
                                <p className="text-sm text-muted-foreground line-clamp-1">{product.subtitle}</p>
                            )}
                        </div>

                        {/* Specs Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.specifications.slice(0, 3).map((spec, i) => (
                                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/50">
                                    {spec}
                                </span>
                            ))}
                        </div>

                        {/* Key Features */}
                        {product.keyFeatures.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                                <ul className="text-xs text-muted-foreground space-y-1">
                                    {product.keyFeatures.slice(0, 2).map((feature, i) => (
                                        <li key={i} className="flex items-center gap-1">
                                            <span className="w-1 h-1 bg-primary rounded-full flex-shrink-0"></span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Perfect For */}
                        {product.perfectFor.length > 0 && (
                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-foreground mb-2">Perfect For</h4>
                                <p className="text-xs text-muted-foreground">{product.perfectFor.join(', ')}</p>
                            </div>
                        )}

                        <div className="mt-auto flex items-end justify-between pt-6 border-t border-border/40">
                            <div>
                                {product.originalPrice && (
                                    <div className="text-sm text-muted-foreground line-through mb-1">
                                        {product.originalPrice}
                                    </div>
                                )}
                                <div className="text-3xl font-bold text-primary tracking-tight">
                                    {product.price}
                                </div>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-300">
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
