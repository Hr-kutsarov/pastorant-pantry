import PageLayout from '@/components/compound/page-layout'
import LoadingDotsAnimation from '@/components/compound/loading/LoadingThreeDotsAnimation'
import SectionLayout from '@/components/compound/section-layout'

export default function LoadingAuthPage() {
    return (
        <PageLayout>
            <SectionLayout>
                    {/* <h1 className='text-slate-50 animate-pulse text-3xl mb-4'>Loading</h1> */}
                <LoadingDotsAnimation />
            </SectionLayout>
        </PageLayout>
    )
}