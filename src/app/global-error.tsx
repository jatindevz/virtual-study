// app/global-error.jsx
'use client'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body className="bg-[#0F0F15]">
                <div className="min-h-screen flex items-center justify-center p-6">
                    <div className="max-w-md text-center">
                        <h1 className="text-4xl font-bold mb-4 text-[#FF6B6B]">
                            Critical Error
                        </h1>
                        <p className="text-lg text-[#B0B0B0] mb-6">
                            Our systems have encountered a serious issue
                        </p>
                        <button
                            onClick={() => reset()}
                            className="px-6 py-3 rounded-full bg-[#6C4DF6] text-white font-medium hover:bg-[#6C4DF6]/90 transition-all"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            </body>
        </html>
    )
}