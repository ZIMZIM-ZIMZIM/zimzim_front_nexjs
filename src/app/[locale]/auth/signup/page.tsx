'use client';

import React from 'react';

import ContentBox from '#/components/common/ContentBox';
import SignupForm from '#/components/signup/SignupForm';

const SignUpPage = () => (
  <div className="flex justify-center">
    <ContentBox className="rounded-2xl" contentTitle="signup">
      <SignupForm />
    </ContentBox>
  </div>
);

export default SignUpPage;
