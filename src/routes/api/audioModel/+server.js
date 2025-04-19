import { Client } from "@gradio/client";

const response_0 = await fetch("https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav");
const exampleAudio = await response_0.blob();
                        
const client = await Client.connect("https://audio.ifsvivek.in/");
const result = await client.predict("/predict", { 
        prompt_wav: exampleAudio,         
        target_text: "Hello!!",         
        target_len: -1,         
        n_timesteps: 15, 
});

console.log(result.data);