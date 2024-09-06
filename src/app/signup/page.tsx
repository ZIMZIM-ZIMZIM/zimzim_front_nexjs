import React from 'react';

import ContentBox from '#components/common/ContentBox';
import SignupForm from '#components/signup/SignupForm';

const SignUpPage = () => (
  <div className="flex justify-center pb-16">
    <ContentBox className="rounded-2xl">
      <SignupForm />
    </ContentBox>
  </div>
);

export default SignUpPage;
