// Import will be done conditionally

type SignInPageProps = {
    searchParams: Promise<{
        redirectUrl: string;
    }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
    const { redirectUrl } = await searchParams;
    
    // Check if Clerk is configured
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
        return (
            <section className="py-14">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-300 mb-4">Sign In</h1>
                            <p className="text-gray-400">Clerk authentication not configured</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
    // Import SignIn dynamically
    const { SignIn } = require("@clerk/nextjs");
    
    return (
        <section className="py-14">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <SignIn signUpUrl="/sing-up" redirectUrl={redirectUrl} />
                </div>
            </div>
        </section>
    )
}