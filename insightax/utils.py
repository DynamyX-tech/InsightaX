task_types = ["classification", "regression", "clustering",]

task_subtypes = {
    "classification": [{"binary":"not-available"}, {"logistic":"not-available"}, {"decision-tree":"not-available"}, {"random-forest":"available"}, {"support-vector-machines":"not-available"}, {"k-nearest-neighbors":"available"}, {"neural-networks":"not-available"},],
    "regression": [{"linear":"not-available"}, {"logistic":"not-available"}, {"support-vector":"not-available"}, {"decision-tree":"not-available"}, {"random-forest":"not-available"},{"gradient-boosting":"not-available"}, {"neural-networks":"not-available"},],
    "clustering": [{"k-means":"not-available"}, {"neural-networks":"not-available"},],
}