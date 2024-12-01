<script>
    import { ChatGroq } from "@langchain/groq";
    let userInput = "";
    let messages = [];
    

    const llm = new ChatGroq({
        apiKey: fetch('../lib/api_key.txt'),
        model: "mixtral-8x7b-32768",
        temperature: 1,
        maxTokens: undefined,
        maxRetries: 2,
    });

    async function sendMessage() {
        if (userInput.trim()) {
            messages = [...messages, { role: "user", content: userInput }];
            userInput = "";
            const aiResponse = await llm.invoke([
                { role: "system", content: "You are Virat Kohli" },
                { role: "user", content: messages[messages.length - 1].content },
            ]);
            messages = [...messages, { role: "AI", content: aiResponse.content }];
        }
    }
</script>

<div class="terminal">
    <div class="output">
        {#each messages as msg}
            <div class="{msg.role}">{msg.role === "user" ? "> " : "AI: "}{msg.content}</div>
        {/each}
    </div>
    <div class="input">
        <input
            type="text"
            bind:value={userInput}
            on:keydown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
        />
    </div>
</div>

<style>
    .terminal {
        width: 80%;
        max-width: 600px;
        height: 70%;
        background-color: #121212;
        color: white;
        font-family: monospace;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border: 1px solid white;
        border-radius: 5px;
        box-shadow: 0 0 10px white;
    }

    .output {
        flex: 1;
        overflow-y: auto;
        margin-bottom: 1rem;
    }

    .input {
        display: flex;
    }

    .input input {
        flex: 1;
        background-color: black;
        color: white;
        border: 1px solid white;
        padding: 0.5rem;
        border-radius: 3px;
    }

    .input input:focus {
        outline: none;
        box-shadow: 0 0 5px white;
    }

    .user {
        color: white;
    }

    .AI {
        color: lightgreen;
    }
</style>
