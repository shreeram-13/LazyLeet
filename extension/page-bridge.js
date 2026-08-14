window.addEventListener("message", (event) => {

    if (event.source !== window) {
        return;
    }

    if (event.data?.type !== "LAZYLEET_GET_CODE") {
        return;
    }

    console.log("🔵 LazyLeet bridge: code request received");

    if (!window.monaco) {
        console.log("❌ LazyLeet bridge: Monaco not found");

        window.postMessage({
            type: "LAZYLEET_CODE_RESULT",
            code: null,
            language: null
        }, "*");

        return;
    }

    const models = monaco.editor.getModels();

    const codeModel = models
        .filter(model => model.getValue().length > 0)
        .sort((a, b) => b.getValue().length - a.getValue().length)[0];

    if (!codeModel) {
        console.log("❌ LazyLeet bridge: No code model found");

        return;
    }

    console.log("✅ LazyLeet bridge: Code extracted!");

    window.postMessage({
        type: "LAZYLEET_CODE_RESULT",
        code: codeModel.getValue(),
        language: codeModel.getLanguageId()
    }, "*");
});