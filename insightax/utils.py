from .train import InsightaX_KNearestNeighbour

task_types = ["classification", "regression", "clustering",]

task_subtypes = {
    "classification": [{"binary":"not-available"}, {"logistic":"not-available"}, {"decision-tree":"not-available"}, {"random-forest":"not-available"}, {"support-vector-machines":"not-available"}, {"k-nearest-neighbors":"available"}, {"neural-networks":"not-available"},],
    "regression": [{"linear":"not-available"}, {"logistic":"not-available"}, {"support-vector":"not-available"}, {"decision-tree":"not-available"}, {"random-forest":"not-available"},{"gradient-boosting":"not-available"}, {"neural-networks":"not-available"},],
    "clustering": [{"k-means":"not-available"}, {"neural-networks":"not-available"},],
}

preprocess_steps =["Delete empty rows", "Fill empty rows", "Delete duplicate rows"]

task_operation_class = {
    "k-nearest-neighbors": InsightaX_KNearestNeighbour(),
}