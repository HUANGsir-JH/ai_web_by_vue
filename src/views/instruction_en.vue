<template>
    <h1>Instructions</h1>
    <p>This is a small webpage built with Vue3, with the main function being AI conversation using API (API request
        format refers to Alibaba Cloud, different service providers may have different requirements). Below are some
        features:</p>
    <hr><br>
    <h2>Chat Area</h2>
    <p>In the chat area, you can input content in the text box below and send it when finished. The send button will
        then change to a loading animation. The AI response is non-streaming, so there's no response interruption
        feature. Multi-turn dialogue is supported, and each send will include previous messages to the model (except for
        error messages and messages that failed to respond due to errors).<br><br>
        In the upper right corner of the chat area, you can choose to export chat history, and the content will be
        exported as an HTML file in a specific format. It's recommended to enable download prompts in browser settings
        (Browser Settings->Downloads) and save all exported files to the same folder for easy access.<br><br>
        Additionally, you can choose to start a new conversation, but this operation won't automatically export the
        current content, and there will be a warning message that needs confirmation.<br><br>
        <span style="color: red;">If you encounter error messages, try saving once in settings before continuing the
            conversation. This can solve many return errors, such as when the page refreshes, your API will be cleared
            and needs to be saved again.</span>
    </p>
    <hr><br>
    <h2>History Conversation Area</h2>
    <p>In the history conversation area, you can view previous chat records and click on corresponding records to view
        detailed content. You need to manually select previously exported HTML files, and multiple files can be selected
        at once, which is why saving to the same location is recommended. The content displayed on the right only
        includes HTML and CSS content, and JavaScript functionality has been removed.
    </p>
    <hr><br>
    <h2>Settings</h2>
    <p>In settings, you can configure the model's port (the webpage uses a pure frontend approach for access), API key,
        and model name, such as Alibaba Cloud's Qianwen series models. The information filled here will be used in
        asynchronous requests after saving, so please ensure the content is accurate.</p>
    <hr><br>
    <h2>Finally</h2>
    <p>This entire Vue project was created on November 12, 2024, at 23:03:59, and the instructions were written on
        November 16, 2024, at 16:40 as finishing work. Thanks to the great support from GPT4o, Claude 3.5, and o1
        preview, which allowed me to complete this small project in just over three days while having classes and
        homework. The entire project was conceived by myself, and there are actually some bugs and functional
        limitations, such as code blocks not being directly copyable and the color scheme not being very sophisticated,
        which I'll improve when I have the chance. As a side note, AI can be quite rigid within frameworks - it performs
        well with local features, but when it comes to the overall picture, especially relationships between different
        files, it's prone to breaking down. CSS still needs to be written manually. Looking forward to future models
        specifically designed for code framework thinking.<br><br>

    </p>
</template>

<style scoped>
h1 {
    font-size: 2em;
    color: #333;
    text-align: center;
}

h2 {
    text-align: left;
    padding: 5px 10px;
    font-size: 1.5em;
    color: #333;
}

p {
    font-size: 1em;
    color: #333;
    padding: 5px 10px;
    text-align: left;
}

hr {
    width: 100%;
    border: 1px solid #333;
}

br {
    margin: 10px 0;
}
</style>