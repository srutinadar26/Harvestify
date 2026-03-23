from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Test server is running!"}

if __name__ == "__main__":
    print("Starting test server on port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)