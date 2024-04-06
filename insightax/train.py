class InsightaX_KNearestNeighbour:
    def __init__(self):
        self.params = {
            "n_neighbors" : 5,
            "metric" : ["minkowski"], 
            "weights" : ["uniform", "distance"],
            "algorithm" : ["auto", "ball_tree", "kd_tree", "brute"],
            "leaf_size" : 30,
            "n_jobs" : 1,
            "p": 2
        }
        
    def set_params(self, data):
        self.params = data