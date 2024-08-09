import React, { useState } from 'react';

import MailIcon from '#assets/icon/mail_outline.svg?react';
import LockIcon from '#assets/icon/lock.svg?react';

const LoginForm = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    if (id === '') {
      alert('아이디를 입력해주세요');
    } else if (password === '') {
      alert('패스워드를 입력해주세요');
    } else {
      //server reqeust 요청
      alert('submit!!');
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleLogin}>
      <div className="relative w-full">
        <input
          type="id"
          className="border-[1px] border-[#9E9E9E] rounded-lg h-[48px] w-full pl-11"
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter your ID"
          autoComplete="username"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MailIcon className="text-[#9E9E9E]" />
        </div>
      </div>
      <div className="relative w-full">
        <input
          type="password"
          className="border-[1px] border-[#9E9E9E] rounded-lg h-[48px] w-full pl-11 "
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <LockIcon className="text-[#9E9E9E]" />
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#4B81FF] h-[52px] w-full rounded-lg text-white font-bold text-[24px]"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
