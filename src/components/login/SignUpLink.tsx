'use client';

import ROUTE from '#/constants/route';
import Link from 'next/link';
import React from 'react';

const SignUpLink = () => (
  <p className="flex space-x-2 justify-center">
    <span className="text-[#757575] text-sm self-end">Are you new user?</span>
    <Link href={ROUTE.SIGN_UP} className="font-semibold underline">
      SIGN UP HERE
    </Link>
  </p>
);

export default SignUpLink;
