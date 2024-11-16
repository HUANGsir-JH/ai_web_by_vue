<template>
    <h1>Description</h1>
    <p>This is a small webpage built with Vue3, with the main function being AI conversation using API (API request
        format follows Alibaba Cloud standards, different service providers may have different requirements). Below are
        some features:</p>
    <hr><br>
    <h2>ChatSpace</h2>
    <p>In the chat area, you can input content in the text box below and send it. The send button will then change to a
        loading animation. The AI responds in non-streaming mode, so there's no response interruption feature.
        Multi-turn dialogue is supported, with each send including previous messages to the model (excluding error
        messages and messages that failed to receive responses).<br><br>
        In the top right corner of the chat area, you can choose to export chat history, which will be exported as an
        HTML file in a specific format. It's recommended to enable download prompts in your browser settings (Browser
        Settings->Downloads) to save all export files in the same folder for easy reference.<br><br>
        Additionally, you can choose to start a new conversation, but this operation won't automatically export the
        current content, and there will be a warning message requiring confirmation.<br><br>
        If you encounter error messages, try saving once in settings before continuing the conversation.</p>
    <hr><br>
    <h2>Chat History Area</h2>
    <p>In the chat history area, you can view previous conversation records and click on corresponding records to view
        detailed content. You need to manually select previously exported HTML files, and multiple files can be selected
        at once, which is why saving to the same location is recommended. The content displayed on the right only
        includes HTML and CSS content, with JavaScript functionality removed.
    </p>
    <hr><br>
    <h2>Settings</h2>
    <p>In settings, you can configure the model's endpoint (the webpage uses a pure frontend approach), API key, and
        model name, such as Alibaba Cloud's Qianwen series models. The information filled here will be used in
        asynchronous requests after saving, so please ensure the content is accurate.</p>
    <hr><br>
    <h2>Finally</h2>
    <p>This Vue project was created on November 12, 2024, at 23:03:59, and the documentation was written as final work
        on November 16, 2024, at 16:40. Thanks to the great support from GPT4o, Claude 3.5, and o1 preview, which helped
        me complete this small project in just over three days while managing classes and homework. The entire project
        was conceived by myself, and there are admittedly some bugs and functional limitations, such as code blocks not
        being directly copyable and the color scheme not being very sophisticated, which I'll improve when I have the
        chance. As a side note, AI can be quite rigid within frameworks - it's good at implementing specific features,
        but when it comes to the overall picture, especially relationships between different files, it can easily get
        stuck. CSS still needs to be written manually, and I look forward to future models specifically designed for
        code framework consideration.</p>
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