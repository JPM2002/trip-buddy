from openai import OpenAI
import json
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(api_key= os.getenv("api_key"))

tool = {
    "type": "function",
    "function": {
        "name": "generate_handbook_content",
        "description": "Generates the content for a desert survival handbook.",
        "parameters": {
            "type": "object",
            "properties": {
                "equipment_list": {"type": "array", "items": {"type": "string"}},
                "overview_text": {"type": "string"},
                "expected_conditions": {"type": "string"},
                "dangers_list": {"type": "array", "items": {"type": "string"}},
                "safety_tips": {"type": "array", "items": {"type": "string"}},
                "map_image_url": {"type": "string"},
                "map_caption": {"type": "string"}
            },
            "required": ["equipment_list", "overview_text", "expected_conditions", "dangers_list", "safety_tips", "map_image_url", "map_caption"]
        }
    }
}

def generate_handbook_content(season, location, days, people):
    messages = [
        {"role": "system", "content": "You are a professional survival handbook generator."},
        {"role": "user", "content": f"Create content for a {season} expedition to {location} lasting {days} days for {people} people."}
    ]

    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        messages=messages,
        tools=[tool],
        tool_choice="auto"
    )

    choice = response.choices[0]
    tool_calls = choice.message.tool_calls

    if not tool_calls:
        raise RuntimeError("AI did not call the expected tool. Check your prompt or tool definition.")

    tool_call = tool_calls[0]
    arguments = json.loads(tool_call.function.arguments)

    def format_list(items):
        return "<ul>" + "".join([f"<li>{item}</li>" for item in items]) + "</ul>"

    arguments["equipment_list"] = format_list(arguments["equipment_list"])
    arguments["dangers_list"] = format_list(arguments["dangers_list"])
    arguments["safety_tips"] = format_list(arguments["safety_tips"])

    return arguments
