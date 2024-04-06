import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/consts";
import { ArrowLeft } from "lucide-react";
import Dropzone from "react-dropzone";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import Template from "@/components/Dashboard";
import {useLocation} from "wouter";

type Response = [any, number];
const UploadData = () => {
  const [_,setLocation] = useLocation();
  const [fileData, setFileData] = useState<File | null>(null);

  const postTodo = async (formData: FormData) => {
    let data = (await fetch(`${BASE_URL}/api/dataset/csv`, {
      method: "POST",
      body: formData,
    }).then((d) => d.json())) as Response;
    if (data[1] != 200) {
      throw new Error("Error! Check the file or application status!");
    }
  };
  const mutation = useMutation({
    mutationFn: postTodo,
  });
  return (
    <Template>
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
                      setLocation("/dashboard/preprocessing ");
                    },
                    onError: (e) => {
                      toast.error(e.message);
                    },
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
    </Template>
  );
};

export default UploadData;
