import NavLayout from '@/components/compound/navigation-layout'
import PageLayout from '@/components/compound/page-layout'
import LoadingDotsAnimation from '@/components/compound/loading/LoadingThreeDotsAnimation'
import SectionLayout from '@/components/compound/section-layout'


export default function AuthPage() {
    return (
        <PageLayout>
            <NavLayout />
                {/* <h1 className='text-slate-50 animate-pulse text-3xl mb-4'>Loading</h1> */}
            <LoadingDotsAnimation />
        </PageLayout>
    )
}