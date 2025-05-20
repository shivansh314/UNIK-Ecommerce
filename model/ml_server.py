# type: ignore
from fastapi import FastAPI 
from pydantic import BaseModel
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = FastAPI()

class ReviewRequest(BaseModel):
    text: str

# Summarization using Sumy (TextRank)
def summarize_text(text, sentences_count=2):
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = TextRankSummarizer()
    summary = summarizer(parser.document, sentences_count)
    return " ".join(str(sentence) for sentence in summary)

# Sentiment Analysis using VADER
def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    score = analyzer.polarity_scores(text)["compound"]  
    return score

@app.post("/summarize")
async def summarize(request: ReviewRequest):
    summary = summarize_text(request.text)
    return {"summary": summary}

@app.post("/sentiment")
async def sentiment(request: ReviewRequest):
    score = analyze_sentiment(request.text)
    return {"sentiment_score": score}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)
