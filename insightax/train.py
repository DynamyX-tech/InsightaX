class InsightaX_KNearestNeighbour:
    def __init__(self):
        self.params = {
            "n_neighbors" : 5,
            "metric" : "minkowski", 
            "weights" : "uniform",
            "algorithm" : "auto",
            "leaf_size" : 30,
            "metric_params" : None,
            "n_jobs" : None,
            "p": 2
        }