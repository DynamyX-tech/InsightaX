# InsightaX

InsightaX is an intuitive platform for data pre-processing, visualization and model training build on FastAPI and
Vite+React. InsightaX is a powerful and user-friendly platform designed to make data analysis and model creation accessible to everyone. ***InSIghTaX*** stands for ***"Intuitive Solution for Insightful Data Processing, Visualization, and Model Training with Advanced eXperience"***.

## Streamlined Data Analysis Process 📈

InsightaX streamlines the data analysis process by reducing complex code into a simple and intuitive GUI-guided solution. This approach empowers users of all skill levels to analyze data and create models with ease, without the need for specialized coding skills.

## Installation and Usage

1. Create environment : `python -m venv .env`
2. Install backend dependencies : `pip install -r requirements.txt`
3. Install front end dependencies:

```bash
cd frontend
pnpm i
pnpm run build
cd ..
```

4. Run server: `uvicorn main:app --reload`

## API stats

### Backend

- [x] API task and sub task data
- [x] API for csv submission and loading the class
- [x] API for pre processing steps
- [x] API for choosing the task type and model
- [x] API for choosing hyper parameters
- [ ] API for setting the features and target
- [ ] API for training the model
- [ ] API for evaluation and test
- [ ] API for Neural Network config
- [ ] API for Ollama integration for hyper-params tuning

### Frontend

- [x] Home screen
- [x] Dataset selection screen
- [x] Dataset preprocessing screen
- [x] Dataset model selection screen
- [x] Dataset hyper params selection screen
- [ ] Model feature and target selection screen
- [ ] Model training | Eval | Test screen
- [ ] Neural network screen
