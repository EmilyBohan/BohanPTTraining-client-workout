import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className="flex w-screen flex-wrap text-slate-800 mt-[106px] md:mt-0 pb-20 md:pb-0">
        <div className="relative hidden h-screen select-none flex-col justify-center bg-primary text-center md:flex md:w-1/2">
          <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]"></div>
        </div>
        <div className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12">
            <a href="#" className="text-2xl font-bold text-primary text-center mb-5">
              Bohan PT Training & Platform
            </a>
          </div>
          <div className="my-auto mx-auto flex flex-col justify-center px-6 md:justify-start lg:w-[28rem]">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
