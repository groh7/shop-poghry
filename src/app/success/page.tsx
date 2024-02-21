import { FaCheckCircle } from 'react-icons/fa';
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="success flex flex-col items-center text-white w-full">
      <FaCheckCircle className="successIcon mb-4" />
      <h1 className="text-6xl font-bold mb-10">Payment Successful! 😊</h1>
      <Link href="/" className="successLink mt-8">Go to Home Page</Link>
    </div>
  );
};

export default SuccessPage;