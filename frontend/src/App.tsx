import { Link } from "wouter";
import { buttonVariants } from "./components/ui/button";

function App() {
  return (
    <main>
      <section className="flex justify-center items-center py-4 w-full border-b border-slate-200 border-opacity-50">
        <img src="/Logo.webp" className="h-12"></img>
      </section>
      <section className="pt-24">
        <h3 className="text-center font-bold text-4xl ">
          Empower Your Machine Learning Journey <br />
          <span className=" text-primary">Without Code!</span>
        </h3>
        <p className="text-center text-sm pt-8 text-opacity-50">
          The Easiest Way to Build Machine Learning Models! Unlock the power of
          <br />
          machine learning without writing a single line of code.
        </p>
        <div className="flex justify-center items-center pt-12">
          <Link className={buttonVariants()} href="/dashboard">
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}

export default App;
