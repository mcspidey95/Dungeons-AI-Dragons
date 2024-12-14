<script>
    import { onMount } from 'svelte';
    import { toPng } from 'html-to-image';
 
    let avatar = ''; // Base64 or URL of the avatar image
    let characterSummary = 'This is the summary of your character’s story. Replace with actual content.';
    let exportableElement;
 
    async function saveImage() {
       if (exportableElement) {
          try {
             const dataUrl = await toPng(exportableElement);
             const link = document.createElement('a');
             
             link.href = dataUrl;
             link.download = 'character-summary.png';
             link.click();
          } catch (error) {
             console.error('Failed to export as image:', error);
          }
       }
    }
 </script>
 
 <style>
    .page-container {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       height: 100vh;
       background-color: black;
       color: white;
       font-family: 'VT323', monospace;
       text-align: center;
    }
 
    .avatar {
       width: 150px;
       height: 150px;
       border-radius: 50%;
       border: 3px solid white;
       margin-bottom: 20px;
    }
 
    .summary {
       font-size: 18px;
       margin: 20px 0;
       padding: 10px;
       max-width: 600px;
       border: 2px solid white;
       border-radius: 8px;
       background-color: rgba(255, 255, 255, 0.1);
       box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
 
    .save-button {
       margin-top: 20px;
       padding: 10px 20px;
       font-size: 16px;
       font-family: monospace;
       border: 2px solid white;
       background-color: white;
       color: black;
       border-radius: 5px;
       cursor: pointer;
       transition: transform 0.2s, box-shadow 0.2s;
    }
 
    .save-button:hover {
       transform: scale(1.1);
       box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    }
 </style>
 
 <div class="page-container" bind:this={exportableElement}>
    <img src={avatar} alt="Avatar" class="avatar" />
    <div class="summary">
       {characterSummary}
    </div>
    <button class="save-button" on:click={saveImage}>
       Save
    </button>
 </div>
 