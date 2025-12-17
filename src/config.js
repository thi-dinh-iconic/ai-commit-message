import Conf from "conf";

const config = new Conf({
  projectName: "ai-commit-message",
});

const CONFIG_KEY = "gemini_api_key";
const MODEL_KEY = "gemini_model";
const DEFAULT_MODEL = "gemini-1.5-flash";

export const setApiKey = async (key) => {
  config.set(CONFIG_KEY, key);
};

export const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY || config.get(CONFIG_KEY);
  if (!key) {
    throw new Error(
      "Gemini API key not found. Set it using:\n" +
        "┌─────────────────────────────────────────┐\n" +
        "│ ai-commit-message config <your-api-key> │\n" +
        "└─────────────────────────────────────────┘"
    );
  }
  return key;
};

export const setModel = async (model) => {
  config.set(MODEL_KEY, model);
};

export const getModel = () => {
  return config.get(MODEL_KEY) || DEFAULT_MODEL;
};

export const listAvailableModels = async (apiKey) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Filter models that support generateContent
    const models = (data.models || [])
      .filter(model => 
        model.supportedGenerationMethods && 
        model.supportedGenerationMethods.includes("generateContent")
      )
      .map(model => ({
        name: model.name.replace("models/", ""),
        displayName: model.displayName,
        description: model.description
      }));
    
    return models;
  } catch (error) {
    throw new Error(`Error fetching models: ${error.message}`);
  }
};
