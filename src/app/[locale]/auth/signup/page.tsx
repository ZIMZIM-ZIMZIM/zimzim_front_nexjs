'use client';

import React from 'react';

import SignupForm from '#/components/signup/SignupForm';

import ContentBox from '#components/common/ContentBox';

const SignUpPage = () => (
  <div className="flex justify-center pb-16">
    <ContentBox className="rounded-2xl" contentTitle="signup">
      <SignupForm />
    </ContentBox>
  </div>
);

export default SignUpPage;
