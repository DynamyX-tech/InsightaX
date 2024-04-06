import { Circle, CircleCheckBig } from "lucide-react";

const NavComponent = (props: {
  text: string;
  checked?: boolean;
  current?: boolean;
}) => {
  if (props.current) {
    return (
      <div className="flex gap-3 items-center font-bold">
        <Circle size={18} />
        <p>{props.text}</p>
      </div>
    );
  }
  if (props.checked) {
    return (
      <div className="flex gap-3 items-center text-primary ">
        <CircleCheckBig size={18} />
        <p>{props.text}</p>
      </div>
    );
  }
  return (
    <div className="flex gap-3 items-center">
      <Circle size={18} />
      <p>{props.text}</p>
    </div>
  );
};
const Dashboard = () => {
  return (
    <div className="flex">
      <aside className="min-w-72">
        <img src="/Logo.webp" className="h-10 m-6"></img>
        <section className="m-6 mt-12 flex flex-col gap-4">
          <NavComponent text="Upload your dataset" current />
          <NavComponent text="Preprocessing data" />
          <NavComponent text="Select model" />
          <NavComponent text="Choose Hyper" />
          <NavComponent text="Train model" />
          <NavComponent text="Test model" />
          <NavComponent text="Export" />
        </section>
      </aside>
      <main className="w-full mt-12 bg-blue-900 bg-opacity-20 mr-10 h-[90vh]">
        <section className="flex flex-col justify-center items-start py-4 px-12 w-full">
          <p>step 1/6</p>
          <h1 className="text-3xl font-bold">Upload your dataset</h1>
        </section>
        <section className="pt-24">
          <div className="flex justify-center items-center">
            <div className="flex flex-col gap-4">
              <p className="text-center text-sm text-opacity-50">
                Upload your dataset to get started. We support CSV, Excel, and
                JSON files.
              </p>
              <div className="flex justify-center items-center pt-12">
                <button className="bg-primary text-white px-4 py-2 rounded-lg">
                  Upload Dataset
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
