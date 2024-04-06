import { Button } from "@/components/ui/button";
import { ArrowLeft} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Template from "@/components/Dashboard";
import { BASE_URL } from "@/consts";
import { toast } from "sonner";


const is_null = { Name: 0, Power: 1, Data: 3, Energy: 0, Word: 0 };


const getCsv = async ()=>{
  let data = await fetch(`${BASE_URL}/api/dataset/view?`+new URLSearchParams({rows:'5'}),{
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(d=>d.json());
  return data
}
const preProcess = async (step:string,setTableData:any,setNullData:any)=>{
  let data = await fetch(`${BASE_URL}/api/dataset/preprocess?`+new URLSearchParams({step:step}),{
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(d=>d.json());
  console.log(data)
  toast(data[0].result);
  setTableData(JSON.parse(data[0].table))
  setNullData(JSON.parse(data[0].is_null))
}

function Preprocessing() {
  let [tableData,setTableData] = useState<any>();
  let [nullData,setNullData] = useState<any>();
  let [steps,setSteps] = useState<string[]>([]);
  useEffect(()=>{
    (async()=>{
      let data = await getCsv();
      console.log(data);
      setTableData(JSON.parse(data[0].result));
      setNullData(JSON.parse(data[0].is_null))
      let steps = await fetch(`${BASE_URL}/api/preprocess/steps`).then(d=>d.json());
      setSteps(steps[0].result);
      console.log(steps[0].result)
    })()
  },[])
  return (
    <Template>
      <section className="flex flex-col gap-6 justify-center items-start py-4 px-12 w-full">
        <Button className="bg-foreground rounded">
          <ArrowLeft size={18} />
        </Button>
        <p>step 2/6</p>
        <h1 className="text-3xl font-bold">Preprocessing data</h1>
      </section>

      <section className="px-12 pt-6 flex gap-4">
        <section className="w-[50vw]">
          <Table>
            <TableCaption>The dataset uploaded by you</TableCaption>
            <TableHeader>
              <TableRow>
                {tableData&&(tableData.columns).map((key:any) => {
                  return <TableHead key={key}>{key}</TableHead>;
                })}
              </TableRow>
            </TableHeader>
            
              <TableBody>
                {tableData&&(tableData.data).map((row:any,idx:any) => {
                  return (
                    <TableRow key={idx}>
                      {row.map((cell: any,id:any) => {
                        return <TableCell key={id}>{cell}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            
          </Table>
        </section>
        <section className="h-min px-4 py-4 border border-foreground rounded-[0.5rem] w-[23vw] flex flex-col gap-4 items-center justify-center">
          <h2 className="text-lg font-bold">Null Data Table</h2>
          {Object.keys(nullData).map((key) => {
            return (
              <>
                <div className="flex items-center justify-between w-[18vw]" key={key}>
                  <h2>{key}</h2>
                  <p>{nullData[key as keyof typeof is_null]}</p>
                </div>
              </>
            );
          })}
          <div className="flex gap-2 flex-wrap">
            {steps.map(step=>(
              <Button className="bg-foreground hover:bg-accent rounded" name={step} onClick={()=>preProcess(step,setTableData,setNullData)}>
              {step}
            </Button>
            ))}
            
            
          </div>
        </section>
      </section>
    </Template>
  );
};

export default Preprocessing;
