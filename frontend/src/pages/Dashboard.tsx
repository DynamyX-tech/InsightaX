import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/consts";
import { ArrowLeft, Circle, CircleCheckBig } from "lucide-react";
import Dropzone from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

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

type Response = [any,number];
const Dashboard = () => {
  const [fileData, setFileData] = useState<File | null>(null);

  const postTodo = async (formData: FormData) => {
    let data = await fetch(`${BASE_URL}/api/dataset/csv`, {
      method: "POST",
      body: formData,
    }).then((d) => d.json()) as Response;
    if(data[1]!=200){
      throw new Error("Error! Check the file or application status!")
    }
  };
  const mutation = useMutation({
    mutationFn: postTodo,
  });
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
        <section className="flex flex-col gap-4 justify-center items-start py-4 px-12 w-full">
          <Button className="bg-foreground rounded">
            <ArrowLeft size={18} />
          </Button>
          <p>step 1/6</p>
          <h1 className="text-3xl font-bold">Upload your dataset</h1>
        </section>
        <section>
          <div className="flex justify-start px-12 items-center">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-opacity-20">
                Upload your dataset to get started. We support CSV, Excel, and
                JSON files.
              </p>
              <Dropzone
                onDrop={async (files) => {
                  setFileData(files[0]);
                }}
                multiple={false}
                accept={{
                  "text/csv": [".csv"],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section
                    className="w-[70vw] h-[40vh] border-2 border-foreground flex items-center justify-center border-dotted "
                    {...getRootProps()}
                  >
                    <div>
                      <input {...getInputProps()} />
                      <p>
                        {fileData
                          ? `File selected: ${fileData.name}`
                          : `Drag 'n' drop some files here, or click to select files`}
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <Button
                className="text-foreground"
                onClick={async () => {
                  if (fileData) {
                    let formData = new FormData();
                    formData.append("file", fileData);
                    let data = await mutation.mutateAsync(formData, {
                      onSuccess: () => {
                        toast.success("Uploaded!");
                      },
                      onError: (e)=>{
                        toast.error(e.message)
                      }
                    });
                    console.log(data);
                  } else {
                    toast.error("No file added yet!");
                  }
                }}
              >
                Upload File
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
