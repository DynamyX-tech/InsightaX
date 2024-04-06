
import { Circle, CircleCheckBig } from "lucide-react";
import React from "react";

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


const Dashboard = ({children}:{children:React.ReactNode}) => {
  
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
      <main className="w-full mt-12 bg-blue-900 bg-opacity-20 mr-10 h-[90vh] rounded-xl">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
