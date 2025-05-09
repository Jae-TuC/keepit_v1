import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex h-screen">
      <div className="w-2/5 hidden relative flex-col justify-center items-start p-16 lg:flex lg:w-2/5 xl:w-2/5 h-full ">
        <div className="absolute left-0 -z-10 top-0 w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-15" />
        <div className="relative">
          <div className="absolute -top-4 -left-6 shadow-[0_10px_10px_rgba(0,0,0,0.1)_inset,0_10px_10px_rgba(0,0,0,0.1)_inset] after:content-[''] after:absolute after:size-6 after:bg-purple-500 after:shadow-[0_0_10px_rgba(107,33,168,0.5)] after:top-1/2 after:-translate-y-1/2 after:translate-x-1/2 after:rounded-full border border-blue-500 w-12 h-12 rounded-full -z-10" />
          <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Keep <span>It</span>
          </h1>
        </div>
        <p className="text-lg tracking-wide mt-2 text-neutral-800">
          Where your files feel safe
        </p>
      </div>
      <div className="relative w-full lg:w-3/5 xl:w-3/5 h-full flex items-center justify-center">
        <div className="absolute left-0 -z-10 top-0 w-full h-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-10" />
        <SignUp />
      </div>
    </main>
  );
}
