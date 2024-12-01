import os
import time
import base64
import aiohttp
from PIL import Image
from io import BytesIO
from typing import Optional

async def generate_image(prompt: str) -> Optional[str]:
    output_dir = "img"
    os.makedirs(output_dir, exist_ok=True)

    url = "https://sd.ifsvivek.tech/sdapi/v1/txt2img"

    params = {"prompt": prompt, "steps": 50, "sampler_index": "DPM++ 2M"}

    async with aiohttp.ClientSession() as session:

        async with session.post(url, json=params) as response:
            if response.status == 200:

                data = await response.json()
                image_data = data.get("images", [])[0]

                image_bytes = base64.b64decode(image_data)
                image = Image.open(BytesIO(image_bytes))
                timestamp = int(time.time())
                image_path = os.path.join(output_dir, f"img_{timestamp}.png")
                try:
                    image.save(image_path)
                    return image_path
                except Exception as e:
                    print(f"Error saving image: {e}")
                    return None
            else:
                print(f"Error: Received status code {response.status}")
                return None
            
generate_image("a pixel art of a cat")