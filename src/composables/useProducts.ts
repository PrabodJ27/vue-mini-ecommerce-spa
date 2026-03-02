import { ref, onMounted } from 'vue';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: number;
    stock: number;
}

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export function useProducts() {
    const products = ref<Product[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const fetchProducts = async () => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch('https://dummyjson.com/products?limit=100');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data: ProductsResponse = await response.json();
            products.value = data.products;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'An error occurred';
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchProducts();
    });

    return {
        products,
        loading,
        error,
        fetchProducts,
    };
}