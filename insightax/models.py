from pydantic import BaseModel

class LocationItem(BaseModel):
    csv_location:str
    
class ModelParams(BaseModel):
    taskName: str
    taskType: str
    
class CustomTrainModel:
    def __init__(self):
        self.dataset = None
        self.dataset_copy = None
        self.operation = None
        self.operation_class = None

    def show_dataset(self, columns: int = 5):
        return self.dataset_copy.head(columns).to_json()
        
    def delete_empty_rows(self):
        self.dataset_copy.dropna(inplace=True)
        
    def fill_empty_rows(self):
        self.dataset_copy.fillna(self.dataset_copy.mean(), inplace=True)
        
    def delete_duplicate_rows(self):
        self.dataset_copy.drop_duplicates(inplace=True)
    def show_mode_params(self):
        return self.operation_class.params