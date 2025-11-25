import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, CheckCircle, Shield, Truck, Cpu, HardDrive, Monitor, Layers, Play, Zap, Box, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface ProductDetails {
    title: string;
    subtitle: string;
    content: string;
    price: string;
    originalPrice?: string;
    images: string[];
    video?: string;
    specs: {
        processor?: string;
        ram?: string;
        storage?: string;
        display?: string;
        os?: string;
        graphics?: string;
        connectivity: string[];
        ergonomics: string[];
        others: string[];
    };
    features: string[];
    targetAudience: string[];
}

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [activeMedia, setActiveMedia] = useState<{ type: 'image' | 'video', src: string }>({ type: 'image', src: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (!productId) return;

            try {
                const modules = import.meta.glob('/src/assets/Maninfini Products Online Listing/*/details.md', { as: 'raw', eager: true });
                const imageModules = import.meta.glob('/src/assets/Maninfini Products Online Listing/*/*.{png,jpg,jpeg,webp,avif}', { eager: true });
                const videoModules = import.meta.glob('/src/assets/Maninfini Products Online Listing/*/*.{mp4,webm}', { eager: true });

                const productPath = Object.keys(modules).find(path => path.includes(`/${productId}/`));

                if (productPath) {
                    const content = modules[productPath] as string;
                    const lines = content.split('\n').filter(line => line.trim() !== '');
                    const brands = ['HP', 'Dell', 'Lenovo', 'ThinkPad', 'Surface', 'MacBook', 'Asus', 'Apple', 'Samsung', 'Acer', 'MSI'];

                    // --- Title Extraction ---
                    let titleLine = lines.find(l => brands.some(b => l.toLowerCase().includes(b.toLowerCase())));
                    if (!titleLine) {
                        const isPromotional = (l: string) => /DEAL|IMPORT|SALE|OFFER|HOT|BEST/i.test(l);
                        if (lines.length > 1 && isPromotional(lines[0])) {
                            titleLine = lines[1];
                        } else {
                            titleLine = lines[0];
                        }
                    }
                    const title = titleLine?.replace(/^[^\w\d\s]+/, '').replace(/[^\w\d\s]+$/, '').trim() || productId;

                    // --- Subtitle Extraction ---
                    const titleIndex = lines.indexOf(titleLine || '');
                    let subtitle = '';
                    if (titleIndex !== -1 && lines[titleIndex + 1]) {
                        subtitle = lines[titleIndex + 1].replace(/^[^\w\d\s]+/, '').trim();
                    }

                    // --- Price Extraction ---
                    const priceMatch = content.match(/Our [Pp]rice\s*:?\s*([₹\d,/-]+)/i);
                    const price = priceMatch ? priceMatch[1] : 'Ask for Price';
                    const originalPriceMatch = content.match(/Company [Pp]rice\s*:?\s*([₹\d,/-]+)/i);
                    const originalPrice = originalPriceMatch ? originalPriceMatch[1] : undefined;

                    // --- Media Extraction ---
                    const images: string[] = [];
                    for (const imgPath in imageModules) {
                        if (imgPath.includes(`/${productId}/`)) {
                            // @ts-expect-error - Vite glob import
                            images.push(imageModules[imgPath].default);
                        }
                    }
                    let video = undefined;
                    for (const vidPath in videoModules) {
                        if (vidPath.includes(`/${productId}/`)) {
                            // @ts-expect-error - Vite glob import
                            video = videoModules[vidPath].default;
                            break;
                        }
                    }

                    // --- Advanced Spec Parsing ---
                    const specs = {
                        processor: undefined as string | undefined,
                        ram: undefined as string | undefined,
                        storage: undefined as string | undefined,
                        display: undefined as string | undefined,
                        os: undefined as string | undefined,
                        graphics: undefined as string | undefined,
                        connectivity: [] as string[],
                        ergonomics: [] as string[],
                        others: [] as string[]
                    };
                    const features: string[] = [];
                    const targetAudience: string[] = [];

                    let currentSection = 'general';

                    lines.forEach(line => {
                        const cleanLine = line.trim();
                        const lowerLine = cleanLine.toLowerCase();

                        // Detect Sections based on headers
                        if (lowerLine.includes('connectivity') || lowerLine.includes('ports') || lowerLine.includes('inputs')) {
                            currentSection = 'connectivity';
                            return;
                        }
                        if (lowerLine.includes('ergonomic') || lowerLine.includes('design') || lowerLine.includes('build')) {
                            currentSection = 'ergonomics';
                            return;
                        }
                        if (lowerLine.includes('perfect for') || lowerLine.includes('best suited for') || lowerLine.includes('recommended for')) {
                            currentSection = 'audience';
                            return;
                        }
                        if (lowerLine.includes('specifications') || lowerLine.includes('specs')) {
                            currentSection = 'specs';
                            return;
                        }
                        if (lowerLine.includes('features') || lowerLine.includes('highlights')) {
                            currentSection = 'features';
                            return;
                        }

                        // Skip price lines, title lines, and empty headers
                        if (cleanLine.includes('Our price') || cleanLine.includes('Company price') || cleanLine === titleLine || cleanLine === lines[titleIndex + 1] || cleanLine.endsWith(':')) return;

                        // Parse Content
                        if (cleanLine.match(/^[🔹✔•-💥✨⚙️]/u) || cleanLine.includes(':')) {
                            const text = cleanLine.replace(/^[🔹✔•-💥✨⚙️]\s*/u, '').trim();

                            // Global Spec Extraction (regardless of section, if it matches a pattern)
                            let isSpec = false;
                            if (!specs.ram && text.match(/(\d+)\s*GB\s*RAM/i)) { specs.ram = text; isSpec = true; }
                            else if (!specs.storage && text.match(/(\d+)\s*(GB|TB)\s*(SSD|HDD|Storage)/i)) { specs.storage = text; isSpec = true; }
                            else if (!specs.processor && text.match(/(Intel|AMD|Core|Ryzen|i[3579]|M[123])/i) && !text.includes('Graphics')) { specs.processor = text; isSpec = true; }
                            else if (!specs.display && (text.match(/(\d+(\.\d+)?)"/) || text.match(/Display|Screen|FHD|4K|IPS/i)) && !text.includes('Port')) { specs.display = text; isSpec = true; }
                            else if (!specs.os && text.match(/Windows|MacOS|Linux|Ubuntu/i)) { specs.os = text; isSpec = true; }
                            else if (!specs.graphics && text.match(/NVIDIA|GeForce|Radeon|Graphics|GPU/i)) { specs.graphics = text; isSpec = true; }

                            // Add to specific section buckets
                            if (currentSection === 'connectivity') {
                                specs.connectivity.push(text);
                            } else if (currentSection === 'ergonomics') {
                                specs.ergonomics.push(text);
                            } else if (currentSection === 'audience') {
                                targetAudience.push(text);
                            } else if (currentSection === 'features' || currentSection === 'general') {
                                // If it was already identified as a core spec (RAM, CPU, etc.), don't add it to features list to avoid duplication, 
                                // UNLESS it provides more detail. For now, let's keep it in features if it's not just a raw spec value.
                                if (!isSpec || text.length > 20) {
                                    features.push(text);
                                }
                            } else if (currentSection === 'specs') {
                                if (!isSpec) {
                                    specs.others.push(text);
                                }
                            }

                            // Fallback: Keyword detection if section is generic
                            if (currentSection === 'general' || currentSection === 'features') {
                                if (text.match(/USB|HDMI|VGA|DisplayPort|Thunderbolt|Jack|Ethernet|LAN/i)) {
                                    if (!specs.connectivity.includes(text)) specs.connectivity.push(text);
                                    // Remove from features if it was added there
                                    const idx = features.indexOf(text);
                                    if (idx > -1) features.splice(idx, 1);
                                }
                                if (text.match(/Adjustable|Tilt|Swivel|Pivot|Mount|Stand/i)) {
                                    if (!specs.ergonomics.includes(text)) specs.ergonomics.push(text);
                                    const idx = features.indexOf(text);
                                    if (idx > -1) features.splice(idx, 1);
                                }
                            }
                        }
                    });

                    setProduct({
                        title,
                        subtitle,
                        content,
                        price,
                        originalPrice,
                        images,
                        video,
                        specs,
                        features,
                        targetAudience
                    });

                    if (video) {
                        setActiveMedia({ type: 'video', src: video });
                    } else if (images.length > 0) {
                        setActiveMedia({ type: 'image', src: images[0] });
                    }
                }
            } catch (error) {
                console.error("Error loading product:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><div className="animate-pulse text-primary font-bold text-xl">Loading Premium Experience...</div></div>;
    if (!product) return <div>Not Found</div>;

    return (
        <div className="min-h-screen bg-background font-inter pb-20">
            {/* Breadcrumb / Back */}
            <div className="pt-24 px-4 container mx-auto">
                <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-6 group">
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Collection
                </Link>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

                    {/* Left Column: Media Gallery (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="aspect-[16/10] bg-black/5 rounded-3xl overflow-hidden border border-border/50 shadow-sm relative group"
                        >
                            {activeMedia.type === 'video' ? (
                                <video
                                    src={activeMedia.src}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    className="w-full h-full object-contain bg-black"
                                />
                            ) : (
                                <img
                                    src={activeMedia.src}
                                    alt={product.title}
                                    className="w-full h-full object-contain p-4"
                                />
                            )}
                        </motion.div>

                        {/* Thumbnails */}
                        <ScrollArea className="w-full whitespace-nowrap pb-4">
                            <div className="flex gap-4">
                                {product.video && (
                                    <button
                                        onClick={() => setActiveMedia({ type: 'video', src: product.video! })}
                                        className={`relative w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeMedia.type === 'video' ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'}`}
                                    >
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                            <Play size={24} className="text-white fill-white" />
                                        </div>
                                        <video src={product.video} className="w-full h-full object-cover" />
                                    </button>
                                )}
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveMedia({ type: 'image', src: img })}
                                        className={`relative w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${activeMedia.src === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    {/* Right Column: Details (5 cols) */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="sticky top-24"
                        >
                            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">A+ Condition Verified</Badge>
                            <h1 className="text-3xl md:text-4xl font-bold font-poppins mb-2 text-foreground leading-tight">
                                {product.title}
                            </h1>
                            {product.subtitle && <p className="text-lg text-muted-foreground mb-6">{product.subtitle}</p>}

                            <div className="flex items-baseline gap-4 mb-8 p-6 bg-secondary/30 rounded-2xl border border-border/50">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Exclusive Price</p>
                                    <span className="text-4xl font-bold text-primary">{product.price}</span>
                                </div>
                                {product.originalPrice && (
                                    <div className="text-right ml-auto">
                                        <p className="text-sm text-muted-foreground mb-1">Market Price</p>
                                        <span className="text-lg text-muted-foreground line-through decoration-red-500/50">
                                            {product.originalPrice}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <Button className="w-full btn-gradient h-14 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" onClick={() => window.open(`https://wa.me/919999999999?text=Hi, I am interested in ${product.title}`, '_blank')}>
                                    <MessageCircle className="mr-2" />
                                    Buy via WhatsApp
                                </Button>
                                <Button variant="outline" className="w-full h-14 text-lg border-2 hover:bg-secondary" onClick={() => window.location.href = 'tel:+919999999999'}>
                                    <Phone className="mr-2" />
                                    Call Now
                                </Button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 rounded-xl bg-secondary/20">
                                    <Shield className="mx-auto text-primary mb-2" size={24} />
                                    <p className="text-xs font-semibold">6 Month Warranty</p>
                                </div>
                                <div className="p-4 rounded-xl bg-secondary/20">
                                    <CheckCircle className="mx-auto text-primary mb-2" size={24} />
                                    <p className="text-xs font-semibold">QC Tested</p>
                                </div>
                                <div className="p-4 rounded-xl bg-secondary/20">
                                    <Truck className="mx-auto text-primary mb-2" size={24} />
                                    <p className="text-xs font-semibold">Pan India Delivery</p>
                                </div>
                            </div>

                        </motion.div>
                    </div>
                </div>

                {/* Highlights Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 font-poppins">Highlights</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {product.specs.processor && (
                            <Card className="bg-secondary/20 border-border/50 shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
                                    <Cpu className="mb-3 text-primary" size={28} />
                                    <p className="text-xs text-muted-foreground uppercase mb-1">Processor</p>
                                    <p className="font-semibold text-sm">{product.specs.processor}</p>
                                </CardContent>
                            </Card>
                        )}
                        {product.specs.ram && (
                            <Card className="bg-secondary/20 border-border/50 shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
                                    <Layers className="mb-3 text-primary" size={28} />
                                    <p className="text-xs text-muted-foreground uppercase mb-1">RAM</p>
                                    <p className="font-semibold text-sm">{product.specs.ram}</p>
                                </CardContent>
                            </Card>
                        )}
                        {product.specs.storage && (
                            <Card className="bg-secondary/20 border-border/50 shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
                                    <HardDrive className="mb-3 text-primary" size={28} />
                                    <p className="text-xs text-muted-foreground uppercase mb-1">Storage</p>
                                    <p className="font-semibold text-sm">{product.specs.storage}</p>
                                </CardContent>
                            </Card>
                        )}
                        {product.specs.display && (
                            <Card className="bg-secondary/20 border-border/50 shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
                                    <Monitor className="mb-3 text-primary" size={28} />
                                    <p className="text-xs text-muted-foreground uppercase mb-1">Display</p>
                                    <p className="font-semibold text-sm">{product.specs.display}</p>
                                </CardContent>
                            </Card>
                        )}
                        {product.specs.graphics && (
                            <Card className="bg-secondary/20 border-border/50 shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
                                    <Zap className="mb-3 text-primary" size={28} />
                                    <p className="text-xs text-muted-foreground uppercase mb-1">Graphics</p>
                                    <p className="font-semibold text-sm">{product.specs.graphics}</p>
                                </CardContent>
                            </Card>
                        )}
                        {product.specs.os && (
                            <Card className="bg-secondary/20 border-border/50 shadow-sm hover:shadow-md transition-all">
                                <CardContent className="p-4 flex flex-col items-center text-center h-full justify-center">
                                    <Box className="mb-3 text-primary" size={28} />
                                    <p className="text-xs text-muted-foreground uppercase mb-1">OS</p>
                                    <p className="font-semibold text-sm">{product.specs.os}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Detailed Tabs */}
                <div className="max-w-5xl mx-auto">
                    <Tabs defaultValue="features" className="w-full">
                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
                            <TabsTrigger value="features" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-0 py-3 text-lg">Key Features</TabsTrigger>
                            <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-0 py-3 text-lg">Specifications</TabsTrigger>
                            <TabsTrigger value="audience" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-0 py-3 text-lg">Perfect For</TabsTrigger>
                        </TabsList>

                        <TabsContent value="features" className="pt-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {product.features.map((feature, i) => (
                                    <div key={i} className="flex items-start p-4 rounded-xl bg-card border border-border/50 hover:bg-secondary/20 transition-colors">
                                        <Star className="text-primary mr-3 mt-1 flex-shrink-0" size={18} />
                                        <span className="text-foreground/90 leading-relaxed">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Connectivity Section */}
                            {product.specs.connectivity.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Zap size={20} className="text-primary" /> Connectivity
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {product.specs.connectivity.map((item, i) => (
                                            <div key={i} className="p-3 bg-secondary/10 border border-border/50 rounded-lg text-sm text-center font-medium">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Ergonomics Section */}
                            {product.specs.ergonomics.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <Box size={20} className="text-primary" /> Ergonomics & Design
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {product.specs.ergonomics.map((item, i) => (
                                            <div key={i} className="flex items-center p-3 bg-secondary/10 border border-border/50 rounded-lg">
                                                <CheckCircle size={16} className="text-primary mr-2" />
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="specs" className="pt-8">
                            <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                                <div className="divide-y divide-border/50">
                                    {product.specs.others.map((spec, i) => (
                                        <div key={i} className="flex flex-col md:flex-row md:items-center p-4 hover:bg-secondary/10 transition-colors">
                                            <span className="font-medium text-foreground md:w-1/3 mb-1 md:mb-0 text-primary/80">Specification {i + 1}</span>
                                            <span className="text-muted-foreground">{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="audience" className="pt-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {product.targetAudience.map((audience, i) => (
                                    <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/30 to-background border border-border/50">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                                            <CheckCircle size={24} />
                                        </div>
                                        <p className="font-medium text-lg">{audience}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
