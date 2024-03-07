'use client';
import { useEffect, useRef } from 'react';
const page: React.FC = () => {
  const viewer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      if (viewer.current) {
        if (!viewer.current.hasChildNodes()) {
          WebViewer(
            {
              path: '/lib',
              initialDoc: '/pdfs/test.pdf',
            },
            viewer.current
          ).then((instance) => {
            // const { docViewer } = instance;
            // you can now call WebViewer APIs here...
          });
        }
      }
    });
  }, []);

  return (
    <div className="MyComponent relative mb-20">
      <div className="webviewer" ref={viewer} style={{ height: '100vh', marginBottom: '20px' }}></div>
    </div>
  );
}

export default page