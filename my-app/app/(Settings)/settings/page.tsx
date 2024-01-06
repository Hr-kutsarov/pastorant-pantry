import NavLayout from '@/components/compound/navigation-layout';
import PageLayout from '@/components/compound/page-layout';
import ProductsListDeleteOnly from '@/components/specific/product-list-to-delete';

export default function SettingsPage() {
    return (
        <PageLayout>
            <NavLayout />
            <ProductsListDeleteOnly />
        </PageLayout>
    )
}