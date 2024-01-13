import NavLayout from '@/components/compound/navigation-layout';
import PageLayout from '@/components/compound/page-layout';
import SectionLayout from '@/components/compound/section-layout';
import ProductsListDeleteOnly from '@/components/specific/product-list-to-delete';

export default function SettingsPage() {
    return (
        <PageLayout>
            <NavLayout />
            <SectionLayout>
                <ProductsListDeleteOnly />
            </SectionLayout>
        </PageLayout>
    )
}