
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

const navs = ["Upload your dataset","Preprocessing data","Select model","Choose Hyper","Train model","Test model","Export"];
const Dashboard = ({children,current}:{children:React.ReactNode,current:number}) => {
  
  return (
    <div className="flex">
      <aside className="min-w-72">
        <img src="/Logo.webp" className="h-10 m-6"></img>
        <section className="m-6 mt-12 flex flex-col gap-4">
          {
            navs.map((nav,id)=><NavComponent text={nav} current={(id+1==current)} checked={id<current} />)
          }
        </section>
      </aside>
      <main className="w-full mt-12 bg-blue-900 bg-opacity-20 mr-10 h-[90vh] rounded-xl">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
