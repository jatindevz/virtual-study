
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="min-h-screen bg-[#0F0F15] pt-14 px-4 sm:px-6 lg:px-8 ">
            <Sidebar />
                {children}
            </div>

        </div>


    );
}
