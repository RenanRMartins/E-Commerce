import { fetchProducts } from "./actions";
import InfiniteScroll from "./components/InfiniteScroll";
import HeroSection from "./components/HeroSection";


export default async function Home() {
  const { formatedProducts } = await fetchProducts({});

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Products Section */}
      <div id="products-section" className="max-w-7xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Nossos Produtos</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Encontre o estilo perfeito para você
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <InfiniteScroll initialProduct={formatedProducts} />
        </div>
      </div>
    </div>
  );
}
