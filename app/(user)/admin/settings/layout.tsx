import Nabvar from '../../../components/navigation/navbar/page';
import Sidebar from '../../../components/navigation/sidebar/page';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-col w-full overflow-hidden">
        <Nabvar />
        <main className="flex-grow flex-shrink-0 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="relative h-screen overflow-auto">{children}</div>
        </main>
      </div>
    </section>
  );
}
