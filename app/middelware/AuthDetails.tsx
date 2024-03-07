'use client';

export const getAuthDetails = (): any => {
    const userDataString = localStorage.getItem('userData');
    return userDataString;
}
