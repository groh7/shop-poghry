import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="">
      SUCCESS :D
      <Link href="/" className="">
          <div className="w-80 ">Home page</div>
      </Link>
    </div>
  );
};
export default SuccessPage;
