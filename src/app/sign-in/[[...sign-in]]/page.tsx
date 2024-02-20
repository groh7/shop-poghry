import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className="mx-auto mt-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <SignIn />
    </div>
  );
};
export default SignInPage;
