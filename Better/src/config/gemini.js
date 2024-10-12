const apikey = "AIzaSyAXiPZ5enT3o1VF_YeN2qnFgR2AtmVvtnI";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const API_KEY = "AIzaSyAXiPZ5enT3o1VF_YeN2qnFgR2AtmVvtnI";
const apiKey = "AIzaSyAXiPZ5enT3o1VF_YeN2qnFgR2AtmVvtnI";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response;
  console.log(result.response.text());
  return response.text();
}

export default run;