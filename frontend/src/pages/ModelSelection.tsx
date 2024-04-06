import Template from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/consts";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const Model = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/api/task/type`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setModels(data[0].result);
      });
  }, []);
  return (
    <Template>
      <section className="flex flex-col gap-6 justify-center items-start py-4 px-12 w-full">
        <Button className="bg-foreground rounded">
          <ArrowLeft size={18} />
        </Button>
        <p>step 3/7</p>
        <h1 className="text-3xl font-bold">Model Selection</h1>
      </section>
      <section className="flex justify-start px-12 items-center w-full">
        <div className="flex flex-col gap-4">
          <p className="text-sm text-opacity-20">
            Select the model you want to use for your machine learning task.
          </p>
          <div className="flex flex-row gap-12">
            {models.map((model) => (
              <div
                id={model}
                className={`flex items-center justify-center gap-2 px-28 py-16 border-2 rounded-[0.4rem] ${
                  selectedModel == model
                    ? " bg-foreground text-background"
                    : "border-foreground hover:bg-foreground hover:text-background "
                } `}
                onClick={() => {
                  fetch(`${BASE_URL}/api/task/type/categories/${model}`, {
                    method: "GET",
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setCategories(data[0].result);
                      setSelectedModel(model);
                      console.log(categories);
                    });
                }}
              >
                <h3 className="text-lg font-bold">{model}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedModel != "" && (
        <section className="flex justify-start items-center px-12 pt-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                return Object.keys(category).map((key) => {
                  return (
                    <div
                      className={`flex items-center justify-center gap-2 px-28 py-4 ${
                        category[key] === "not-available"
                          ? "border-2 border-red-600 border-dotted"
                          : "border-2 border-muted border-dotted"
                      } border-2 border-muted border-dotted  rounded-[0.4rem] hover:bg-accent`}
                      onClick={() => {
                        if (category[key] != "not-available") {
                          fetch(`${BASE_URL}/api/model/params`, {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              taskName: selectedModel,
                              taskType: key,
                            }),
                          })
                            .then((res) => res.json())
                            .then((data) => {
                              console.log(data);
                            });
                        }
                      }}
                    >
                      <h3 className="text-normal ">{key}</h3>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </section>
      )}
    </Template>
  );
};

export default Model;
