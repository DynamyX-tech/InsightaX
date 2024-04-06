import { Button } from "@/components/ui/button";
import { ArrowLeft, Circle, CircleCheckBig, Key } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = {
  result: "Dataset uploaded successfully",
  is_null: '{"Name":0,"Power":1,"Data":3,"Energy":0,"Word":0}',
};
const table = {
  Name: { "0": "Hi", "1": "Bye", "2": "See", "3": "Name", "4": "Yoyo" },
  Power: { "0": 12.0, "1": null, "2": 22.0, "3": 22.0, "4": 12.0 },
  Data: { "0": "we", "1": "ee", "2": null, "3": null, "4": null },
  Energy: { "0": "qwas", "1": "weeee", "2": "ee", "3": "ee", "4": "ee" },
  Word: { "0": "eeee", "1": "ar", "2": "ak", "3": "aj", "4": "su" },
};
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
const Temp = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex">
      <aside className="min-w-72">
        <img src="/Logo.webp" className="h-10 m-6"></img>
        <section className="m-6 mt-12 flex flex-col gap-4">
          <NavComponent text="Upload your dataset" checked />
          <NavComponent text="Preprocessing data" current />
          <NavComponent text="Select model" />
          <NavComponent text="Choose Hyper" />
          <NavComponent text="Train model" />
          <NavComponent text="Test model" />
          <NavComponent text="Export" />
        </section>
      </aside>
      <main className="w-full mt-12 bg-blue-900 bg-opacity-20 mr-10 h-[90vh] rounded-xl">
        <section className="flex flex-col gap-6 justify-center items-start py-4 px-12 w-full">
          <Button className="bg-foreground rounded">
            <ArrowLeft size={18} />
          </Button>
          <p>step 2/6</p>
          <h1 className="text-3xl font-bold">Preprocessing data</h1>
        </section>
        {/* <section className="px-12">
          <nav className="flex flex-row gap-8 w-max items-center">
            <div
              className={`${
                selected === 0 ? " py-2 px-4 bg-accent rounded-[0.5rem]" : ""
              }`}
              onClick={() => setSelected(0)}
            >
              Uploaded Table
            </div>
            <div
              className={`${
                selected === 1 ? " py-2 px-4 bg-accent rounded-[0.5rem]" : ""
              }`}
              onClick={() => setSelected(1)}
            >
              Null Value Table
            </div>
          </nav>
        </section> */}
        <section className="px-12 pt-6 flex gap-4">
          <section className="w-[50vw]">
            <Table>
              <TableCaption>The dataset uploaded by you</TableCaption>
              <TableHeader>
                <TableRow>
                  {Object.keys(table).map((key) => {
                    return <TableHead>{key}</TableHead>;
                  })}
                </TableRow>
              </TableHeader>
              {/* <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody> */}
            </Table>
          </section>
          <section className=" px-4 py-4 bg-background rounded-[0.5rem] w-[23vw] flex flex-col gap-4 items-center">
            <h2 className="text-lg font-bold">Null Data Table</h2>
            <div className="flex items-center gap-28">
              <h2>Hello</h2>
              <p>05</p>
            </div>
            {/* {data.is_null} */}
          </section>
        </section>
      </main>
    </div>
  );
};

export default Temp;
