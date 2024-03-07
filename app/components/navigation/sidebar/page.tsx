'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

const V = "Vault";
const page: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path;

    const handleLogout = async () => {
        try {
            localStorage.removeItem('yourAuthToken');
            localStorage.removeItem('userData');
            const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URI+`/api/logout`, {
                method: "POST",
            })
            if(res.ok) {
                router.push('/login');
            }else{
                console.log('Logout Failed');
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const setOpen = async () => {
        let isValidPassword = false;
        await Swal.fire({
            title: `Enter Security Code`,
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonText: 'Submit',
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: async (enteredPassword) => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                if (enteredPassword === process.env.NEXT_PUBLIC_ORIGINAL_STRING_CODE) {
                    isValidPassword = true;
                }
            }
        });
        if (isValidPassword) {
            await Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 1000,
            });
            router.push("/admin/Itemslist");
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Incorrect code!',
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };
    

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800">
        <div className="flex flex-cols items-center justify-center h-16 bg-gray-900">
            <span className='text-4xl font-bold border-1 border-double rounded-full p-1'>{V.charAt(0)}</span>
            <div className="flex flex-col items-center justify-center h-16 bg-gray-900">
                <span className="text-white font-bold text-2xl uppercase"> &nbsp; Vault </span>
                <small>Antidotes </small>
            </div>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex-1 px-1 py-4 bg-gray-800">
                <Link href="/admin/Dashboard" className={`flex items-center px-4 py-2 text-gray-100 ${isActive('/admin/Dashboard') ? 'bg-gray-500 ' : 'hover:bg-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-1" fill="none" viewBox="0 0 24 24">
                        <path d="M3.333 10.833h5A.836.836 0 009.167 10V3.333a.836.836 0 00-.834-.833h-5a.836.836 0 00-.833.833V10c0 .459.375.833.833.833zm0 6.667h5a.836.836 0 00.834-.833v-3.334a.836.836 0 00-.834-.833h-5a.836.836 0 00-.833.833v3.334c0 .458.375.833.833.833zm8.334 0h5a.835.835 0 00.833-.833V10a.836.836 0 00-.833-.833h-5a.836.836 0 00-.834.833v6.667c0 .458.375.833.834.833zm-.834-14.167v3.334c0 .458.375.833.834.833h5a.836.836 0 00.833-.833V3.333a.836.836 0 00-.833-.833h-5a.836.836 0 00-.834.833z" fill="#fff"/>
                    </svg>     
                    Dashboard
                </Link>
                <Link onClick={setOpen} href="#" className={`flex items-center px-4 py-2 mt-2 text-gray-100 ${isActive('/admin/Itemslist') ? 'bg-gray-500' : 'hover:bg-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff"  className="h-5 w-5" viewBox="0 0 303.002 303.002">
                        <path d="M151.501,0c66.75,0,123.194,27.559,125.104,60.549c-1.91,32.987-58.354,60.553-125.104,60.553 c-66.752,0-123.191-27.56-125.104-60.553C28.31,27.559,84.749,0,151.501,0z"/>
                        <path d="M276.785,240.744c0,33.747-57.369,62.258-125.284,62.258S26.217,274.491,26.217,240.744v-29.771 c21.449,25.754,68.887,43.27,125.284,43.27s103.834-17.521,125.284-43.27V240.744z"/>
                        <path d="M276.785,179.688c0,33.746-57.369,62.258-125.284,62.258S26.217,213.434,26.217,179.688v-31.009 c21.449,25.748,68.887,43.259,125.284,43.259s103.834-17.522,125.284-43.259V179.688z"/>
                        <path d="M276.785,117.381c0,33.748-57.369,62.257-125.284,62.257s-125.284-28.51-125.284-62.257V90.135 c21.449,25.754,68.887,43.258,125.284,43.258s103.834-17.51,125.284-43.258V117.381z"/>
                    </svg> &nbsp; Vault
                </Link>
                <Link href="/admin/Product" className={`flex items-center px-4 py-2 mt-2 text-gray-100 ${isActive('/admin/Product') ? 'bg-gray-500' : 'hover:bg-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    Product
                </Link>
                <Link href="/admin/settings" className={`flex items-center px-4 py-2 mt-2 text-gray-100 ${isActive('#') ? 'bg-gray-500' : 'hover:bg-gray-700'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Settings
                </Link>
                <Link href="#" onClick={handleLogout} className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                <svg fill="#fff" className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="XMLID_2_">
                    <path id="XMLID_4_" d="M51.213,180h173.785c8.284,0,15-6.716,15-15s-6.716-15-15-15H51.213l19.394-19.393
                        c5.858-5.857,5.858-15.355,0-21.213c-5.856-5.858-15.354-5.858-21.213,0L4.397,154.391c-0.348,0.347-0.676,0.71-0.988,1.09
                        c-0.076,0.093-0.141,0.193-0.215,0.288c-0.229,0.291-0.454,0.583-0.66,0.891c-0.06,0.09-0.109,0.185-0.168,0.276
                        c-0.206,0.322-0.408,0.647-0.59,0.986c-0.035,0.067-0.064,0.138-0.099,0.205c-0.189,0.367-0.371,0.739-0.53,1.123
                        c-0.02,0.047-0.034,0.097-0.053,0.145c-0.163,0.404-0.314,0.813-0.442,1.234c-0.017,0.053-0.026,0.108-0.041,0.162
                        c-0.121,0.413-0.232,0.83-0.317,1.257c-0.025,0.127-0.036,0.258-0.059,0.386c-0.062,0.354-0.124,0.708-0.159,1.069
                        C0.025,163.998,0,164.498,0,165s0.025,1.002,0.076,1.498c0.035,0.366,0.099,0.723,0.16,1.08c0.022,0.124,0.033,0.251,0.058,0.374
                        c0.086,0.431,0.196,0.852,0.318,1.269c0.015,0.049,0.024,0.101,0.039,0.15c0.129,0.423,0.28,0.836,0.445,1.244
                        c0.018,0.044,0.031,0.091,0.05,0.135c0.16,0.387,0.343,0.761,0.534,1.13c0.033,0.065,0.061,0.133,0.095,0.198
                        c0.184,0.341,0.387,0.669,0.596,0.994c0.056,0.088,0.104,0.181,0.162,0.267c0.207,0.309,0.434,0.603,0.662,0.895
                        c0.073,0.094,0.138,0.193,0.213,0.285c0.313,0.379,0.641,0.743,0.988,1.09l44.997,44.997C52.322,223.536,56.161,225,60,225
                        s7.678-1.464,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L51.213,180z"/>
                    <path id="XMLID_5_" d="M207.299,42.299c-40.944,0-79.038,20.312-101.903,54.333c-4.62,6.875-2.792,16.195,4.083,20.816
                    c6.876,4.62,16.195,2.794,20.817-4.083c17.281-25.715,46.067-41.067,77.003-41.067C258.414,72.299,300,113.884,300,165
                    s-41.586,92.701-92.701,92.701c-30.845,0-59.584-15.283-76.878-40.881c-4.639-6.865-13.961-8.669-20.827-4.032
                    c-6.864,4.638-8.67,13.962-4.032,20.826c22.881,33.868,60.913,54.087,101.737,54.087C274.956,287.701,330,232.658,330,165
                    S274.956,42.299,207.299,42.299z"/>
                    </g>
                </svg>
                    Sign out
                </Link>
            </nav>
        </div>
    </div>
  );
}

export default page;
