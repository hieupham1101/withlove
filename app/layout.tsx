import "./globals.css";

export const metadata = {
    title: "Aura Scanner ✨",
    description: "Máy quét độ đỉnh bài thi (phiên bản cà khịa yêu thương)."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="vi">
            <body>{children}</body>
        </html>
    );
}
