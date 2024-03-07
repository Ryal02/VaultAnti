import Nabvar from '../../../components/navigation/navbar/page';
import Sidebar from '../../../components/navigation/sidebar/page';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-col w-screen overflow-hidden">
          <Nabvar />
          <main className="overflow-x-hidden overflow-y-auto bg-gray-200">
            <div className="h-screen w-full overflow-auto">{children}</div>
          </main>
        </div>
      </div>   
    </section>
  );
}
